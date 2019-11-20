var express = require("express");
var app = express();
var serv = require("http").Server(app);

app.get("/",function(req, res) {
	res.sendFile(__dirname + "/client/index.html");
});
app.get("/new",function(req, res) {
	res.sendFile(__dirname + "/client/signup.html");
});
app.use("/client",express.static(__dirname + "/client"));

serv.listen(2000);
console.log("server started");

var io = require("socket.io")(serv,{});

//--------------------------------------------------------------

var socketList = {}; //List of active sockets
var playerList = {}; //Permenant list of players and their data

var referenceDeck = [];
generateReferenceDeck();


function generateReferenceDeck() {
	colors = ["red","yellow","green","blue"];
	for (color = 0; color < colors.length; color++) {
		referenceDeck.push(colors[color]+"-0");
		for (rep = 0; rep < 2; rep++) {
			for (num = 1; num <= 9; num++) {
				referenceDeck.push(colors[color]+"-"+num);
			}
			referenceDeck.push(colors[color]+"-"+"pick2");
			referenceDeck.push(colors[color]+"-"+"skip");
			referenceDeck.push(colors[color]+"-"+"reverse");
		}
	}
	for (rep = 0; rep < 4; rep++) {
		referenceDeck.push("wild");
		referenceDeck.push("wildpick4");
	}
}

generateReferenceDeck();