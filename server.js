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
	app.use(express.static(path.join(__dirname)));
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
		console.log("Success to acsses to mongoDb");
		var collection = dbo.collection('Users');
		if (collection == null)
			console.log("not Success to acsses to mongoDb");
			// get reference to the collection
		collection.find(request.body).toArray(function (err, docs) //find if documents that satisfy the criteria exist
		{
			if (err) throw err;
			if (docs.length > 0) //if exists
			{
				console.log("i hate u");
				response.sendFile(path.join(__dirname, "/index.html"));
			}
			else // if it does not 
			{
				
				app.use(express.static(path.join(__dirname)));
				console.log("i not hate u");
				//$("#page").load("index.html");
				//response.sendFile(path.join(__dirname, "/index.html"));
				response.sendFile(path.join(__dirname, "/index.html"));
				//response.sendStatus(404);
			}
		});
	});
});
