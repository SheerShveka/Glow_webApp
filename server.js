var express = require('express');
var app = express();
const bodyParser = require("body-parser");
const path = require('path');
const io = require('socket.io');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname, "/login.html"));
})


app.listen(8080, err => {
    if (err) {
        console.log("there was a problem", err);
        return;
    }
    console.log("listening on port 8080");
})
