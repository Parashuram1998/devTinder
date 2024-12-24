const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://pujarip516:wvt8vbgXZJ12GRyt@cluster0.mzecj.mongodb.net/devTinder"
    );
}

module.exports = connectDB;

