var express = require('express');
var app = express();
const bodyParser = require("body-parser");
const path = require('path');
const io = require('socket.io');
var url = "mongodb://localhost:27017/";
var MongoClient = require('mongodb').MongoClient;
const usernames = new Map();

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

app.post("/login", bodyParser.urlencoded({ extended: false }), function (request, response) {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db("Glow");
		var collection = dbo.collection('Users');  // get reference to the collection
		collection.find(request.body, { $exists: true }).toArray(function (err, docs) //find if documents that satisfy the criteria exist
		{
			if (err) throw err;
			if (docs.length > 0) //if exists
			{
				response.sendStatus(200);
			}
			else // if it does not 
			{
				response.sendStatus(404);
			}
		});
	});
