const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

//using express.json() we will be able to get all the json data present in request body converted into JS object
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRoter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRoter);

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
