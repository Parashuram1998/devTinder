const mongoose = require("mongoose");
const validator = require("validator");

//Creating the userSchema
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required : true,
        minLength : 3,
        maxLength : 20
    },
    lastName : {
        type: String
    },
    email : {
        type: String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address : "+ value);
            }
        }
    },
    age : {
        type : Number,
        min : 18
    },
    gender : {
        type : String,
        validate(value){
            if(!["Male","Female","Other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    password : {
        type : String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please Enter a strong password");
            }
        }
    },
    photoUrl : {
       type : String,
       default : "https://cdn-icons-png.flaticon.com/512/9187/9187604.png",
       validate(value){
        if(!validator.isURL(value)){
            throw new Error("URL is not valid : "+ value);
        }
       } 
    },
    about : {
        type : String,
        default : "I am a developer!!"
    },
    skills : {
        type : [String]
    }
},{
    timestamps : true
})

//Creating & Exporting the user model.
module.exports = mongoose.model("User", userSchema);