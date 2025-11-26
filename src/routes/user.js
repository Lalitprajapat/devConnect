const express = require('express');
const { userAuth } = require('../middleware/auth');
const { ConnectionRequestModel } = require('../models/connectionRequest');
const userRouter = express.Router();

const user_safe_data = "firstName lastNAme photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res)=>{
    try{
        const loggedInUser = req.user;
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
            $or:[{fromUserId: loggedInUser._id},
                 {toUserId: loggedInUser._id}
            ]
        }).populate("fromUserId", user_safe_data).populate("toUserId", user_safe_data);
        const data = connections.map((connection)=> {
            if(connection.fromUserId._id.toString() === loggedInUser._id.toString()){
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
        
    }catch(err){
        res.status(404).send("Error in fetching feed data "+err.message);
    }
})

module.exports = userRouters;