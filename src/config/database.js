const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pujarip516:cc8TayAVBWaayDyU@cluster0.mzecj.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
