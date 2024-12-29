const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validations");
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

//Get user profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong!! " + err.message);
  }
});

//Edit user profile
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Edit data is not valid");
    }
    const user = req.user;
    const loggedInUser = user.firstName;
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
    await user.save();
    res.send(loggedInUser + " your profile updated successfully!!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//Forgot Password
profileRouter.patch("/profile/forgotPassword", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (validator.isEmail(email)) {
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new Error("User Not Exist!");
      }

      if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const isSamePassword = await bcrypt.compare(password, user.password);

      if (!isSamePassword) {
        await User.findOneAndUpdate(
          { email: email },
          { password: passwordHash }
        );
        res.send("Password Updated successfully!!");
      } else {
        throw new Error(
          "Please enter another password rather than current one"
        );
      }
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
