const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required :true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid mail address"+value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,        
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value.toLowerCase())){
                throw new Error("Gender data is not valid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not string min length should be 8"+value);
            }
        }
    },
    photoUrl:{
        type: String,
        default: "https://avatars.githubusercontent.com/u/40992581?v=4",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL"+value);
            }
        }
    },
    about:{
        type: String,
        default: "Hey there! I am using DevConnect."
    },
    skills:{
        type: [String]
    }
},{timestamps: true});

const User = mongoose.model("user", userSchema);

module.exports = User;