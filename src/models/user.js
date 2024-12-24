const mongoose = require("mongoose");

//Creating the userSchema
const userSchema = new mongoose.Schema({
    firstName : {
        type: String
    },
    lastName : {
        type: String
    },
    email : {
        type: String
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    }
})

//Creating & Exporting the user model.
module.exports = mongoose.model("User", userSchema);