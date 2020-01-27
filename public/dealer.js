document.getElementById("newGame").addEventListener("click", newGame);
document.getElementById("flop").addEventListener("click", dealFlop);
document.getElementById("turn").addEventListener("click", dealTurn);
document.getElementById("river").addEventListener("click", dealRiver);

function newGame() {
    console.log("Hello World!");
    showButton('flop')
}

function dealFlop() {
    console.log("Flop!");
    showButton('turn')
}

function dealTurn() {
    console.log("Turn!");
    showButton('river')
}

function dealRiver() {
    console.log("River!");
    showButton('')
}

function showButton(buttonId) {
    ["flop", "turn", "river"].forEach(item => {
        let x = document.getElementById(item);
        if (item !== buttonId) {
            x.style.display = "none"
        } else {
            x.style.display = "block"
        }
    })
}
