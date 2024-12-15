const express = require("express");

const app = express();

app.get('/user',(req,res) => {
    res.send({firstname : 'Parasharam', lastname : 'Pujari'});
});

app.post("/user", (req, res) => {
    res.send("User added successfully");
})

app.delete('/user', (req,res) => {
    res.send("User deleted successfully");
})

app.listen(7777, () => {
    console.log("Server is successfully running on port 7777");
});