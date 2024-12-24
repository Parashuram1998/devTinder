const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

//using express.json() we will be able to get all the json data present in request body converted into JS object
app.use(express.json());

app.post("/signup", async (req, res) => {

    //Creating a new instance of the user model
    const user = new User(req.body)

    try{
        await user.save();
        res.send("User Data added Successfully");
    }
    catch (err) {
        res.status(400).send("Something Gone Wrong.. Please check the error "+ err.message)
    }
    
})

//Get user by email
app.get("/userByEmail", async (req, res) => {
    const userEmail = req.body.email;

    try{
        const user = await User.findOne({email : userEmail});
        
        if(!user){
            res.status(404).send("User not found");
        }else{
            res.send(user);
        }
        
    }
    catch(err){
        console.log("Something went wrong!! " + err.message);
    }
})

//Get all the users for Feed page
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});

        if(users.length === 0){
            res.status(404).send("Users not found");
        }else{
            res.send(users);
        }
        
    }
    catch(err){
        console.log("Something went wrong!! " + err.message);
    }
})

//Delete the user
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
        const deletedUser = await User.findByIdAndDelete(userId);
        if(deletedUser != 0){
            res.send("Deleted the user successfully..");
        }else{
            res.send("User not found..");
        }        
    }
    catch(err){
        console.log("Something went wrong!! " + err.message);
    }
})

//Update the user
app.patch("/user", async (req,res) => {
    const userId = req.body.userId;
    const data = req.body;

    console.log(data);

    try{
        await User.findByIdAndUpdate({_id: userId}, data);
        res.send("User updated successfully!!");
    }catch(err){
        console.log("Something went wrong!! " + err.message);
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


