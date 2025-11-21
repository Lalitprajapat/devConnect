const validator = require("validator");
const validateSignUpData = (data) => {
    const{ firstName, lastName, emailId, password} = data.body;

    if(!firstName || typeof firstName !== 'string' || firstName.trim().length ===0){
        throw new Error("Invalid first name");
    }
    else if(firstName.length <2 || firstName.length >30){
        throw new error("First name should be between 2 to 30 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email address");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
};
module.exports = {
    validateSignUpData
}