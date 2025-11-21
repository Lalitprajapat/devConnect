const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middleware/auth');

profileRouter.get("/profile",userAuth, async(req,res)=>{ //passing userAuth middleware for authentication
    try{
        const user = req.user; //getting the user from req object set in middleware
        res.send(user);
    }catch(err){
        res.status(500).send("Error in fetching user"+err.message);
    }    
});
module.exports = {profileRouter};