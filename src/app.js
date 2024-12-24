const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {

    //Creating a new instance of the user model
    const user = new User({
        firstName : 'Parasharam',
        lastName : 'Pujari',
        email : 'parasharampujari@gmail.com',
        age : 25,
        gender : 'Male'
    })

    try{
        await user.save();
        res.send("User Data added Successfully");
    }catch (err) {
        res.status(400).send("Something Gone Wrong.. Please check the error "+ err.message)
    }
    
})

connectDB()
    .then(() => {
        console.log("Database connection established");

        app.listen(7777, () => {
            console.log("Server is successfully running on port 7777");
        });

    })
    .catch((err)=> {
        console.error("Database is not connected");
    });


