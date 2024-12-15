const express = require("express");

const app = express();

app.get('/',(req,res) => {
    res.send("Namaste from home page");
});

app.get('/test', (req, res) => {
    res.send("Namaste from test page");
});

app.get('/hello', (req, res) => {
    res.send("Namaste from Hello page");
});

app.listen(7777, () => {
    console.log("Server is successfully running on port 7777");
});