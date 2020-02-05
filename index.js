const express = require("express");
const app = express();
const port = 3000;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
sockets = new Set();
let dealerSocket;

app.use(express.static("public"));

cards = ["10C.svg", "10D.svg", "10H.svg", "10S.svg", "2C.svg", "2D.svg", "2H.svg", "2S.svg", "3C.svg", "3D.svg", "3H.svg", "3S.svg",
  "4C.svg", "4D.svg", "4H.svg", "4S.svg", "5C.svg", "5D.svg", "5H.svg", "5S.svg", "6C.svg", "6D.svg", "6H.svg", "6S.svg",
  "7C.svg", "7D.svg", "7H.svg", "7S.svg", "8C.svg", "8D.svg", "8H.svg", "8S.svg", "9C.svg", "9D.svg", "9H.svg", "9S.svg",
  "AC.svg", "AD.svg", "AH.svg", "AS.svg", "JC.svg", "JD.svg", "JH.svg", "JS.svg", "KC.svg", "KD.svg",
  "KH.svg", "KS.svg", "QC.svg", "QD.svg", "QH.svg", "QS.svg"];

let currentGameCardsArray;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/player.html", function(req, res) {
  res.sendFile(__dirname + "/public/player.html");
});

app.get("/dealer.html", function(req, res) {
  res.sendFile(__dirname + "/public/dealer.html");
});

io.on('connection', function (socket) {
  console.log('new connection');
  sockets.add(socket);
  console.log(`Socket ${socket.id} added`);

  socket.on('disconnect', () => {
    console.log(`Deleting socket: ${socket.id}`);
    sockets.delete(socket);
    console.log(`Remaining sockets: ${sockets.size}`);
  });

  socket.on('new-game', function () {
    currentGameCards = new Set();
    console.log("new game is starting");
    let totalCards = ((sockets.size - 1) * 2) + 5;

    do {
      currentGameCards.add(Math.floor(Math.random() * 52));
    } while (currentGameCards.size < totalCards);

    console.log(currentGameCards);
    currentGameCardsArray = Array.from(currentGameCards);
    console.log();
    for (const s of sockets) {
      if (s.username !== "dealer") {
        s.emit('cards', [cards[currentGameCardsArray.shift()],
                         cards[currentGameCardsArray.shift()]]);
      }
    }
  });

  socket.on('flop', () => {
    dealerSocket.emit('cards-flop', [cards[currentGameCardsArray.shift()],
                                     cards[currentGameCardsArray.shift()],
                                     cards[currentGameCardsArray.shift()]]);
  });

  socket.on('turn', () => {
    dealerSocket.emit('cards-turn', cards[currentGameCardsArray.shift()]);
  });

  socket.on('river', () => {
    dealerSocket.emit('cards-river', cards[currentGameCardsArray.shift()]);
  });

  socket.on('new-user', function (e) {
    console.log(`adding new user ${e}`);
    socket.username = e;

    if (e === "dealer") {
      dealerSocket = socket;
    }

    for (const s of sockets) {
      console.log(s.username);
    }
  });
});

laptop = '10.144.43.207';
desktop = '10.144.43.145';
gcp = '35.246.253.99';
// server.listen(port, () => console.log(`app listening on port ${port}!`));
server.listen(port, () => console.log(`app listening on port ${port}!`));
