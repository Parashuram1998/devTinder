const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRoter = express.Router();

//sendConnectionRequest
requestRoter.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    const user = req.user;
    console.log("Connection request is sent!!");
    res.send("Connection request is sent by " + user.firstName);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = requestRoter;
