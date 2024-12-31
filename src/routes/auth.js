const express = require("express");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validations");
const { userAuth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const validator = require("validator");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
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

//Logout
authRouter.post("/logout", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  res.clearCookie("token");
  res.send(loggedInUser.firstName + " Logged out successfully");
});

module.exports = authRouter;
