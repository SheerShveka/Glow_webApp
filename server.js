const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const app = express();

app.use("/js", express.static(__dirname + "/views/js"));
app.use("/css", express.static(__dirname + "/views/css"));
app.use("/fonts", express.static(__dirname + "/views/fonts"));
app.use("/images", express.static(__dirname + "/views/images"));
app.use("/videos", express.static(__dirname + "/views/videos"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/login.html"));
})

app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
})

app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "/views/login.html"));
})

app.get("/register", function (req, res) {
	res.sendFile(path.join(__dirname, "/views/signUp.html"));
})

app.get("/profile", function (req, res) {
	res.sendFile(path.join(__dirname, "/views/profile.html"));
});

app.get("/logout", function (req, res) {
	res.redirect("/login");
});



const logger = require('./middlewares/logger');
const router = require('./routes/user');

app.use(logger);
app.use(router);

const connectDB = require('./config/db');
connectDB();