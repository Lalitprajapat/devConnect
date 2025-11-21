const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middleware/auth');
const {validateEditProfileData} = require('../utils/validation');

profileRouter.get("/profile/view",userAuth, async(req,res)=>{ //passing userAuth middleware for authentication
    try{
        const user = req.user; //getting the user from req object set in middleware
        res.send(user);
    }catch(err){
        res.status(500).send("Error in fetching user"+err.message);
    }    
});

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{
       if(!validateEditProfileData(req)){
            throw new Error("Invalid updates!");
       }
       const user = req.user;
       Object.keys(req.body).forEach((key)=>(user[key] = req.body[key]));
         await user.save();
         res.send("Profile updated successfully");

    }catch(err){
        res.status(500).send("Error in updating profile"+err.message);
    }
});
module.exports = {profileRouter};