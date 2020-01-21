const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/player.html", function(req, res) {
  res.sendFile(__dirname + "/public/player.html");
});

app.get("/dealer.html", function(req, res) {
  res.sendFile(__dirname + "/public/dealer.html");
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
