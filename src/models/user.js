const mongoose = require("mongoose");

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
        unique : true
    },
    age : {
        type : Number,
        min : 18
    },
    gender : {
        type : String,
        validate(value){
            if(!["Male","Female","Other"]){
                throw new error("Gender data is not valid");
            }
        }
    },
    password : {
        type : String
    },
    photoUrl : {
       type : String,
       default : "https://cdn-icons-png.flaticon.com/512/9187/9187604.png" 
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