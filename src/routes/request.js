const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middleware/auth');

requestRouter.post("/sendConnectionRequest", userAuth, async(req,res)=>{
    try{
        console.log("sending connection request");
        res.send("Connectio Request sent!!");
    }catch(err){
        res.status(500).send("Error in sending connection request"+err.message);
    }

});

module.exports = {requestRouter};