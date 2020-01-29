var socket = io();
socket.emit('new-user', 'player');

socket.on('cards', function(cards){
    document.getElementById("card1").src = "cards/" + cards[0];
    document.getElementById("card2").src = "cards/" + cards[1];
    console.log(cards);
});
