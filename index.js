const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/player.html', function(req, res){
    res.sendFile(__dirname + '/player.html');
});

app.get('/dealer.html', function(req, res){
    res.sendFile(__dirname + '/dealer.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
