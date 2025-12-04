const express = require('express');
const { userAuth } = require('../middleware/auth');
const { ConnectionRequestModel } = require('../models/connectionRequest');
const userRouter = express.Router();
const User = require('../models/user'); 

const user_safe_data = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res)=>{
    try{
        const loggedInUser = req.user;
        if (!loggedInUser) return res.status(401).json({ message: "Unauthorized" });
        const requests = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId",["firstName", "lastName" ]);
        res.json({
            message:"data fetched successfully",
            data: requests
        })
    }catch(err){
        res.status(500).send("Error in fetching user requests"+err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res)=>{
    try{
        const loggedInUser = req.user;
        const connections = await ConnectionRequestModel.find({
            status: "accepted",
            $or:[{fromUserId: loggedInUser._id},
                 {toUserId: loggedInUser._id}
            ]
        }).populate("fromUserId", user_safe_data).populate("toUserId", user_safe_data);
        const data = connections.map((connection)=> {
            if(connection.fromUserId?._id?.toString() === loggedInUser._id.toString()){
                return connection.toUserId;
            }
            return connection.fromUserId;
        });

        res.json({
            message: "User connections fetched successfully",
            data: data
        });
    }catch(err){
        res.status(500).send("Error in fetching user connections"+err.message);
    }
});
 
userRouter.get("/feed", userAuth, async (req, res)=>{
    try{
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 5;
        limit = limit>50?50:limit;

        //get all connections
        const connectionRequest = await ConnectionRequestModel.find({
            $or:[{fromUserId: loggedInUser._id},
                    {toUserId: loggedInUser._id}
                ]
        }).select("fromUserId toUserId");

        const connectedUserIds = new Set();
        connectionRequest.forEach(req=>{
            connectedUserIds.add(req.fromUserId.toString());
            connectedUserIds.add(req.toUserId.toString());
        });
        const user = await User.find({
            $and: [{_id: {$nin: Array.from(connectedUserIds)}},
                    {_id: {$ne: loggedInUser._id}}
            ],

        }).select(user_safe_data).skip((page-1)*limit).limit(limit);
        res.json({data:user});

    }catch(err){
        res.status(404).send("Error in fetching feed data "+err.message);
    }
})

module.exports = userRouter;