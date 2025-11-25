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

        //to check if a request already exists
        const existingRequest = await ConnectionRequestModel.findOne({
            $or:[{fromUserId: fromUserId, toUserId: toUserId},
                    {fromUserId: toUserId, toUserId: fromUserId}
            ]
        });

        if(existingRequest){
            return  res.status(400).send("Connection request already sent");
        }
        const ConnectionRequestModel = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data = await ConnectionRequestModel.save();
        res.send("Connection request sent successfully");

    }catch(err){
        res.status(500).send("Error in sending connection request"+err.message);
    }

});

module.exports = {requestRouter};