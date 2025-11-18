const express = require('express');
const connectDB = require('./config/database');
const app = express();
const User = require('./models/user');

app.use(express.json()); 
app.post("/signup", async (req,res)=>{
    // console.log(req.body);
    // const userObj = {
    //     firstName: "akii",
    //     lastName: "sharma",
    //     emailId: "akki@gmail.com",
    //     age: 22,
    //     password: "Akki@123",
    // }
    // //creating a new instance of user model
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Error in saving user info"+err.message);
    }
});

//get user by mail
app.get("/user",async (req,res)=>{
    const email = req.body.emailId;
    try{
        const user = await User.find({emailId: email});
        if(user.length ===0){
            res.status(404).send("User not found");
        }
        else {
            res.send("User fetched successfully"+user);
        }
    }catch(err){
        res.status(500).send("Error in fetching user"+err.message);
    }
})

//get api to get all the users from the db
app.get("/feed",(req,res)=>{
    try{
        const users = User.find({});
        res.send(users);
    }catch(err){
        res.status(404).send("Error in fetching users"+err.message);
    }
});

//delete api
app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try{
        await User.findByIdAndDelete({_id: userId});
        res.send("User deleted successfully");
    }catch(err){
        res.status(500).send("Error in deleting user"+err.message);
    }
});

//update api
app.patch("/user", async(req,res)=>{
    const data = req.body;
    
    try{
        const ALLOWED_UPDATES = ["photoUrl", "about", "skills","password","age","firstName","lastName","gender"];
        const isUpdateAllowed = Object.keys(data).every((k)=>{
            ALLOWED_UPDATES.includes(k);
        });
        if(!isUpdateAllowed){
            throw new Error("Update not allowed"+err.message);
            // res.status(400).send("Update not allowed");
        }
        await User.findByIdAndUpdate({_id:data.userId}, data, {runValidators: true});
        res.send("User updated successfully");
        }catch(err){
        res.status(400).send("Error in updating user"+err.message);
    }
})

connectDB()
    .then(()=>{
        console.log("database connected");
        app.listen(3000, ()=>{
            console.log("server is running on port 3000");
        });
    })
    .catch(err=>{
        console.error("database connection failed", err);
    })




 