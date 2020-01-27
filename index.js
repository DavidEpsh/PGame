const express = require("express");
const app = express();
const port = 3000;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
sockets = new Set();
// server.listen(3000);

app.use(express.static("public"));

cards = ["10C.svg", "10D.svg", "10H.svg", "10S.svg", "2C.svg", "2D.svg", "2H.svg", "2S.svg", "3C.svg", "3D.svg", "3H.svg", "3S.svg",
  "4C.svg", "4D.svg", "4H.svg", "4S.svg", "5C.svg", "5D.svg", "5H.svg", "5S.svg", "6C.svg", "6D.svg", "6H.svg", "6S.svg",
  "7C.svg", "7D.svg", "7H.svg", "7S.svg", "8C.svg", "8D.svg", "8H.svg", "8S.svg", "9C.svg", "9D.svg", "9H.svg", "9S.svg",
  "AC.svg", "AD.svg", "AH.svg", "AS.svg", "JC.svg", "JD.svg", "JH.svg", "JS.svg", "KC.svg", "KD.svg",
  "KH.svg", "KS.svg", "QC.svg", "QD.svg", "QH.svg", "QS.svg", "TC.svg", "TD.svg", "TH.svg", "TS.svg"];

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/player.html", function(req, res) {
  res.sendFile(__dirname + "/public/player.html");
});

app.get("/dealer.html", function(req, res) {
  res.sendFile(__dirname + "/public/dealer.html");
});

app.get("/new-game", function(req, res) {
  res.sendFile(__dirname + "/public/dealer.html");
});

io.on('connection', socket => {
  console.log('new connection');
  sockets.add(socket);
  console.log(`Socket ${socket.id} added`);
});

io.on('disconnect', () => {
  console.log(`Deleting socket: ${socket.id}`);
  sockets.delete(socket);
  console.log(`Remaining sockets: ${sockets.size}`);
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
