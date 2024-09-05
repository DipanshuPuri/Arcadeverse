const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.getElementById('start-button'), // Ensure correct ID
    win: document.querySelector('.win'),
    popupOverlay: document.getElementById('popup-overlay'),
    retryButton: document.getElementById('retry-button') // Ensure correct ID
};

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 60, // Start with 60 seconds
    remainingTime: 60,
    loop: null,
    countdown: null,
    firstCard: null,
    secondCard: null
};

const shuffle = array => {
    const clonedArray = [...array];
    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [clonedArray[i], clonedArray[randomIndex]] = [clonedArray[randomIndex], clonedArray[i]];
    }
    return clonedArray;
};

const pickRandom = (array, items) => {
    const clonedArray = [...array];
    const randomPicks = [];
    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);
        randomPicks.push(clonedArray[randomIndex]);
        clonedArray.splice(randomIndex, 1);
    }
    return randomPicks;
};

const generateGame = () => {
    const dimensions = parseInt(selectors.board.getAttribute('data-dimension'), 10);
    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.");
    }
    const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍'];
    const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
    const items = shuffle([...picks, ...picks]);
    selectors.board.innerHTML = items.map(item => `
        <div class="card">
            <div class="card-front"></div>
            <div class="card-back">${item}</div>
        </div>
    `).join('');
    selectors.board.style.gridTemplateColumns = `repeat(${dimensions}, auto)`;
};

const startGame = () => {
    state.gameStarted = true;
    selectors.start.classList.add('disabled');
    state.totalTime = 60;
    state.remainingTime = 60;

    // Start the countdown timer
    state.countdown = setInterval(() => {
        state.remainingTime--;
        selectors.timer.innerText = `Time: ${state.remainingTime} sec`;

        if (state.remainingTime <= 0) {
            clearInterval(state.countdown);
            endGame(false); // Time ran out
        }
    }, 1000);
};

const endGame = (won) => {
    clearInterval(state.countdown);
    const message = won
        ? `You won!<br />with <span class="highlight">${state.totalFlips}</span> moves<br />under <span class="highlight">${state.totalTime - state.remainingTime}</span> seconds`
        : `Time's up!<br />Try again!`;

    selectors.boardContainer.classList.add('flipped');
    selectors.win.innerHTML = `
        <span class="win-text">${message}</span>
    `;
    showPopup();
};

// Function to reset the game
const resetGame = () => {
    state.gameStarted = false;
    state.totalFlips = 0;
    state.totalTime = 60;
    state.remainingTime = 60;
    clearInterval(state.countdown);
    selectors.boardContainer.classList.remove('flipped');
    generateGame();
    hidePopup();
};

// Function to flip back all cards
const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => card.classList.remove('flipped'));
    state.flippedCards = 0;
    state.firstCard = null;
    state.secondCard = null;
};

// Function to flip a card
const flipCard = card => {
    if (!state.gameStarted) startGame();

    if (state.flippedCards < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        state.flippedCards++;

        // Increment moves count only when two cards are flipped
        if (state.flippedCards === 1) {
            state.firstCard = card;
        } else if (state.flippedCards === 2) {
            state.secondCard = card;

            const firstCardValue = state.firstCard.querySelector('.card-back').innerText;
            const secondCardValue = state.secondCard.querySelector('.card-back').innerText;

            // Increment total flips/moves
            state.totalFlips++;

            if (firstCardValue === secondCardValue) {
                state.firstCard.classList.add('matched');
                state.secondCard.classList.add('matched');
                state.flippedCards = 0;
                state.firstCard = null;
                state.secondCard = null;

                if (!document.querySelectorAll('.card:not(.matched)').length) {
                    setTimeout(() => endGame(true), 1000);
                }
            } else {
                setTimeout(flipBackCards, 1000);
            }
            
            selectors.moves.innerText = `${state.totalFlips} moves`;
        }
    }
};

// Function to show the popup
const showPopup = () => selectors.popupOverlay.style.display = 'flex';

// Function to hide the popup
const hidePopup = () => selectors.popupOverlay.style.display = 'none';

// Function to attach event listeners
const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const card = event.target.closest('.card');
        if (card && !card.classList.contains('matched') && !card.classList.contains('flipped')) {
            flipCard(card);
        } else if (event.target.id === 'start-button' && !event.target.classList.contains('disabled')) {
            startGame();
        } else if (event.target.id === 'retry-button') {
            resetGame();
        }
    });
};

// Initialize game
generateGame();
attachEventListeners();



