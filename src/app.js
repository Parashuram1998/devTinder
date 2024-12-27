const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validations");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

//using express.json() we will be able to get all the json data present in request body converted into JS object
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //Validating the data
    validateSignUpData(req);

    //encrypting the password
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    //Creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("User Data added Successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (validator.isEmail(email)) {
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new Error("Invalid Credentials");
      }

      //Comparing the password entered by user and passwordhash present in db
      const isPasswordValid = await user.validatePassword(password);

      if (isPasswordValid) {
        const token = await user.getJWT();
        //the cookie will be expired after 1 day.
        res.cookie("token", token, {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        res.send("Login Successful!!!!");
      } else {
        throw new Error("Invalid Credentials");
      }
    } else {
      throw new Error("Email is not valid");
    }
  } catch (err) {
    res.status(404).send("ERROR : " + err.message);
  }
});

//Get user profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong!! " + err.message);
  }
});

//sendConnectionRequest
app.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    const user = req.user;
    console.log("Connection request is sent!!");
    res.send("Connection request is sent by " + user.firstName);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");

    app.listen(7777, () => {
      console.log("Server is successfully running on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database is not connected");
  });
