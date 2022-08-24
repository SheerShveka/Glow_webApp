const { response } = require('express');
var bodyParser = require('body-parser');
const { randomBytes } = require('crypto');


var express = require('express')
	, app = express()
	, http = require('http')
	, server = http.createServer(app)
	, io = require('socket.io')(server)
	, url = "mongodb://localhost:27017/"
	, router = express.Router()
	, MongoClient = require('mongodb').MongoClient
	, randomstring = require("randomstring");



app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
	var urlpar = req.originalUrl.split("?").pop();
	console.log(urlpar);
	res.redirect('logIn');
});

app.get("/html/data", function (request, response) {
	if (!authenticated(request)) {
		response.sendStatus(404);
	} else {
		var arr;
		MongoClient.connect(url, function (err, db) {
			if (err) throw err;
			var dbo = db.db("Server");
			dbo.collection("Data").find({}).toArray(function (err, res) {
				if (err) throw err;
				arr = res;
				db.close();
				response.json(arr);
			});
		});
	}

});

app.get("/authenticate", function (request, response) {
	if (!authenticated(request)) {
		response.sendStatus(500);
	} else {
		response.sendStatus(200);
	}
});

function authenticated(request) {
	var cookie = request.headers.cookie;
	if (cookie == undefined) {
		return false;
	}
	var key = cookie.substring(0, 7);
	var value = cookie.substring(8);
	if (usernames.get(value) != undefined) {
		return true;
	}
	return false;
}

app.post("/login", bodyParser.urlencoded({ extended: false }), function (request, response) {
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db("Server");
		var collection = dbo.collection('Users');  // get reference to the collection
		collection.find(request.body, { $exists: true }).toArray(function (err, docs) //find if documents that satisfy the criteria exist
		{
			if (err) throw err;
			if (docs.length > 0) //if exists
			{
				var session = randomstring.generate(16);
				usernames.set(session, request.body.mail);
				response.cookie("session", session);
				response.sendStatus(200);
			}
			else // if it does not 
			{
				response.clearCookie("session");
				response.sendStatus(404);
			}
		});
	});

});

app.post("/logout", bodyParser.urlencoded({ extended: false }), function (request, response) {
	var cookie = request.headers.cookie;
	var key = cookie.substring(0, 7);
	var value = cookie.substring(8);
	usernames.delete(value);
	response.clearCookie("session");
	response.sendStatus(200);
});

app.post("/register", bodyParser.urlencoded({ extended: false }), function (request, response) {
	var user = { name: request.body.fname + " " + request.body.lname, mail: request.body.mail, password: request.body.password };
	console.log(user);
	MongoClient.connect(url, function (err, db) {
		if (err) throw err;
		var dbo = db.db("Server");
		var collection = dbo.collection('Users');  // get reference to the collection
		collection.find({ mail: request.body.mail }, { $exists: true }).toArray(function (err, docs) //find if documents that satisfy the criteria exist
		{
			if (err) throw err;
			if (docs.length > 0) //if exists
			{
				response.sendStatus(404);
			}
			else // if it does not 
			{
				var dbo = db.db("Server");
				dbo.collection("Users").insertOne(user, function (err, res) {
					if (err) throw err;
					response.sendStatus(200);
				});
			}
		});
	});

});

app.listen(8080);


const usernames = new Map();


