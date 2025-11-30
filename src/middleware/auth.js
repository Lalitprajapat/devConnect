
const jwt =  require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async (req, res, next)=> {
    try{
        //read the req from token cookies 
        const cookies = req.cookies;
        const {token} = cookies; 
        if(!token){
            return res.status(401).send("please login");
        }

        //validate the token
        const decodedMsg = await jwt.verify(token, "DEV@Tinder$$$");
        const {_id} = decodedMsg;
        

        //find the user if it exist or not 
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        req.user = user; //setting the user to req object
        next();//to move to the req handler
    }catch(err){
        res.status(500).send("Error in user authentication"+err.message);
    }
};
module.exports = {userAuth};