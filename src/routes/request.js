const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

//send Connection Request
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //validating status is ignored & intersted
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Status is not valid");
      }

      //checking is toUser Exist in the system or not
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("The To User not exist");
      }

      //Checking if connection request already sent or not
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          //In below 2 lines we are checking if any connection request already exist from one user to another or vise versa
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        throw new Error("Connection Request already exist");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      await connectionRequest.save();
      if (status === "interested") {
        res.send("Connection Request Sent Successfully!!");
      } else {
        res.send(req.user.firstName + " ignored " + toUser.firstName);
      }
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

//Review Connection Request
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      //checking connection request has a valid status
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status is not valid" });
      }

      //checking valid connection request is present or not
      const validConnectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!validConnectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found!!" });
      }

      validConnectionRequest.status = status;
      const data = await validConnectionRequest.save();

      res.json({
        message: "Connection request " + status,
        data,
      });
    } catch (err) {
      res.send("ERROR : " + err.message);
    }
  }
);

module.exports = requestRouter;
