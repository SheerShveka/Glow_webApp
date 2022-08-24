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
	res.redirect('/html/main.html');
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

/*io.sockets.on('connection', function (socket) {
console.log("connect1");
//socket.emit('connect',function(){
  // when the client emits 'sendchat', this listens and executes
  socket.on('sendchat', function (data) {
	  console.log("sendCHAT1");
	// we tell the client to execute 'updatechat' with 2 parameters
	io.sockets.emit('updatechat', socket.username, data);
  //});
});
  // when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username){
	  console.log("adduser1");
	// we store the username in the socket session for this client
	socket.username = username;
	// add the client's username to the global list
	usernames[username] = username;
	// echo to client they've connected
	socket.emit('updatechat', 'SERVER', 'you have connected');
	// echo globally (all clients) that a person has connected
	socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
	// update the list of users in chat, client-side
	io.sockets.emit('updateusers', usernames);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
	  console.log("disconnect");
	// remove the username from global usernames list
	delete usernames[socket.username];
	// update list of users in chat, client-side
	io.sockets.emit('updateusers', usernames);
	// echo globally that this client has left
	socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  });
});*/

