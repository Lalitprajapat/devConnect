const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middleware/auth');
const { ConnectionRequestModel } = require('../models/connectionRequest');
const User = require('../models/user');

requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId =  req.params.toUserId;
        const status = req.params.status;

        const allowedStatuses = ["ignore", "interested"];
        if(!allowedStatuses.includes(status)){
            throw new Error("Invalid status value");
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            throw new Error("Recipient user not found");
        }
        // console.log("toUser found:", toUser);

        //to check if a request already exists
        
        const existingRequest = await ConnectionRequestModel.findOne({
            $or:[{fromUserId, toUserId},
                    {fromUserId: toUserId, toUserId: fromUserId}
            ]
        });

        if(existingRequest){
            return  res.status(400).send("Connection request already sent");
        }
        // console.log("Creating new connection request...");
        const connectionRequestModel = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequestModel.save();
        res.send("Connection request sent successfully");

    }catch(err){
        res.status(500).send("Error in sending connection request"+err.message);
    }

});

requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res)=>{
    try{
        const loggedInUser= req.user;
        const allowed = ["accepted", "rejected"];
        if(!allowed.includes(req.params.status)){
            throw new Error("Invalid status value");
        }
        const requestId = req.params.requestId;
        const connectionRequest = await ConnectionRequestModel.findOne({
            // id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",        
        });
        if(!connectionRequest){
            throw new Error("Connection request not found");
        }
        connectionRequest.status = req.params.status;
        const data = await connectionRequest.save();
        res.send("Connection request reviewed successfully");
    }catch(err){
        res.status(500).send("Error in reviewing connection request"+err.message);
    }
});

module.exports = {requestRouter};