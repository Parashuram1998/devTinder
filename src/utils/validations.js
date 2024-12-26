const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Firstname or Lastname data is missing.");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid. Please enter a valid email.")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password!!");
    }
}

module.exports = {validateSignUpData};