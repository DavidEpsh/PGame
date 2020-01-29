document.getElementById("newGame").addEventListener("click", newGame);
document.getElementById("flop").addEventListener("click", dealFlop);
document.getElementById("turn").addEventListener("click", dealTurn);
document.getElementById("river").addEventListener("click", dealRiver);

var socket = io();
socket.emit('new-user', 'dealer');

socket.on('cards', function (cards) {
    console.log(cards);
});

socket.on('cards-flop', function(cards){
    document.getElementById("card1").src = "cards/" + cards[0];
    document.getElementById("card2").src = "cards/" + cards[1];
    document.getElementById("card3").src = "cards/" + cards[2];
});

socket.on('cards-turn', function(card){
    document.getElementById("card4").src = "cards/" + card;
});

socket.on('cards-river', function(card){
    document.getElementById("card5").src = "cards/" + card;
});

function resetCards() {
    for (let i=1; i<6; i++) {
        document.getElementById("card" + i).src = "cards/BLUE_BACK.svg";
    }
}

function newGame() {
    resetCards();
    socket.emit('new-game', {hello: 'world'});
    showButton('flop');
}

function dealFlop() {
    socket.emit('flop');
    showButton('turn');
}

function dealTurn() {
    socket.emit('turn');
    showButton('river');
}

function dealRiver() {
    socket.emit('river');
    showButton('');
}

function showButton(buttonId) {
    ["flop", "turn", "river"].forEach(item => {
        let x = document.getElementById(item);
        if (item !== buttonId) {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    });
}
