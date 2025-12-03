const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");



const authRouter = express.Router();

authRouter.post("/signup", async (req,res)=>{
    //validation of data
    try{
        validateSignUpData(req);

    //encrypt the password
        const {password} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

    // console.log(req.body);
    // const userObj = {
    //     firstName: "akii",
    //     lastName: "sharma",
    //     emailId: "akki@gmail.com",
    //     age: 22,
    //     password: "Akki@123",
    // }
    // //creating a new instance of user model
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName?req.body.lastName:"",
            emailId: req.body.emailId,
            age: req.body.age?req.body.age:"",
            gender:req.body.gender?req.body.gender:"",
            password: passwordHash
        });
    
        const savedUser = await user.save();

        const token = await savedUser.getJWT();
        res.cookie("token", token, {
            expires: new Date(Date.now()+8*3600000),
        });


        res.json({message:"User added successfully", data:savedUser});
    }catch(err){
        res.status(400).send("Error in saving user info "+err.message);
    }
});

authRouter.post("/login", async (req,res)=>{
    try{
        const {emailId, password} = req.body;
        if(!validator.isEmail(emailId)){
            return res.status(404).send("User not found");
        }
        const user = await User.findOne({emailId: emailId});
        if(!user){ 
            res.status(404).send("User not found");
        }    
        const isPasswordValid = await user.validatePassword(password);


        if(isPasswordValid){
            //create a JWT token 
            const token = await user.getJWT();

            //add the token to cookie and send the response back to user 
            res.cookie("token", token);
            res.send(user);
        }else{
            return res.status(401).send("Invalid password");
        }
    }catch(err){
        res.status(500).send("Error in user login"+err.message);
    }
});

authRouter.post("/logout", async(req,res)=>{
    try{
       res.clearCookie("token");
        res.send("User logged out successfully");
    }catch(err){
        res.status(500).send("Error in user logout"+err.message);
    }
});

module.exports = {authRouter};