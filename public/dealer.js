document.getElementById("newGame").addEventListener("click", function(){ deal(true); });
document.getElementById("deal").addEventListener("click", function(){ deal(false)});

var socket = io();
socket.emit('new-user', 'dealer');

const GameState = {
    NEW_GAME: 1,
    FLOP: 2,
    TURN: 3,
    RIVER: 4
};

let currentState = 1;

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

function deal(isNewGame) {
    if(isNewGame) {
        resetCards();
        currentState = GameState.NEW_GAME;
        socket.emit('new-game');
    } else {
        currentState += 1;
    }

    let button = document.getElementById("deal");

    switch(currentState){
        case GameState.NEW_GAME:
            button.style.display = "block";
            button.innerText = "Flop";
            break;
        case GameState.FLOP:
            button.innerText = "Turn";
            socket.emit('flop');
            break;
        case GameState.TURN:
            button.innerText = "River";
            socket.emit('turn');
            break;
        case GameState.RIVER:
            button.style.display = "none";
            socket.emit('river');
            break;
    }
}

document.addEventListener('keydown', function(event) {
    console.log(event);
    if(event.key === 'ArrowUp') {
        deal(true)
    }
    else if(event.key === 'ArrowDown') {
        deal(false)
    }
});
