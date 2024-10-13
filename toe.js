"use strict";

let isVsComputer = true;
let gameOver = false;
let moves = 0;
let x = 1, o = -1, empty = 0;
let whoseTurn = x;
let xText = 'X', oText = 'O';

let myGrid = {
    cells: [empty, empty, empty, empty, empty, empty, empty, empty, empty]
};

let xWins = 0;
let oWins = 0;
let draws = 0;

// Show options modal at the start of the game
window.onload = function() {
    showOptions();
}

function showOptions() {
    document.getElementById("gameOptions").style.display = "flex";
    document.getElementById("vsComputer").addEventListener("click", setVsComputer);
    document.getElementById("vsPlayer").addEventListener("click", setVsPlayer);
}

function setVsComputer() {
    isVsComputer = true;
    document.getElementById("gameOptions").style.display = "none";
    initialize();
}

function setVsPlayer() {
    isVsComputer = false;
    document.getElementById("gameOptions").style.display = "none";
    initialize();
}

function initialize() {
    gameOver = false;
    moves = 0;
    whoseTurn = x;
    myGrid.cells = [empty, empty, empty, empty, empty, empty, empty, empty, empty];

    for (let i = 0; i < 9; i++) {
        document.getElementById("cell" + i).innerHTML = "";
        document.getElementById("cell" + i).style.cursor = "pointer";
    }
    document.getElementById("status").innerHTML = "Player X's turn!";
}

function cellClicked(id) {
    let cell = parseInt(id[id.length - 1]);

    if (myGrid.cells[cell] !== empty || gameOver) {
        return;
    }

    moves += 1;
    document.getElementById(id).innerHTML = whoseTurn === x ? xText : oText;
    myGrid.cells[cell] = whoseTurn;

    if (checkWinner()) {
        updateScore(whoseTurn);
        showVictoryModal(whoseTurn === x ? "Player X wins!" : "Player O wins!");
        gameOver = true;
        return;
    } else if (moves === 9) {
        updateScore(null);
        showVictoryModal("It's a draw!");
        gameOver = true;
        return;
    }

    if (isVsComputer && whoseTurn === x) {
        whoseTurn = o;
        computerMove();
    } else {
        whoseTurn = (whoseTurn === x) ? o : x;
        document.getElementById("status").innerHTML = "Player " + (whoseTurn === x ? "X" : "O") + "'s turn!";
    }
}

function computerMove() {
    let cell = findBestMove();
    if (cell !== -1) {
        document.getElementById("cell" + cell).innerHTML = oText;
        myGrid.cells[cell] = o;
        moves++;

        if (checkWinner()) {
            updateScore(o);
            showVictoryModal("Player O wins!");
            gameOver = true;
        } else if (moves === 9) {
            updateScore(null);
            showVictoryModal("It's a draw!");
            gameOver = true;
        } else {
            whoseTurn = x;
            document.getElementById("status").innerHTML = "Player X's turn!";
        }
    }
}

function findBestMove() {
    for (let i = 0; i < 9; i++) {
        if (myGrid.cells[i] === empty) {
            return i;
        }
    }
    return -1;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (myGrid.cells[a] !== empty && myGrid.cells[a] === myGrid.cells[b] && myGrid.cells[a] === myGrid.cells[c]) {
            return true;
        }
    }
    return false;
}

function updateScore(winner) {
    if (winner === x) {
        xWins++;
        document.getElementById("xWins").textContent = xWins;
    } else if (winner === o) {
        oWins++;
        document.getElementById("oWins").textContent = oWins;
    } else {
        draws++;
        document.getElementById("draws").textContent = draws;
    }
}

function showVictoryModal(message) {
    document.getElementById("winnerText").innerHTML = message;
    document.getElementById("victoryModal").style.display = "flex";
}

function closeVictoryModal() {
    document.getElementById("victoryModal").style.display = "none";
}

function reset() {
    initialize();
    closeVictoryModal();
}
const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });
