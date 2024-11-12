document.addEventListener("DOMContentLoaded", () => {
    const startGameButton = document.getElementById("start-game");
    const gameArea = document.getElementById("game-area");
    const wordLengthInput = document.getElementById("word-length");
    const guessInput = document.getElementById("guess-input");
    const submitGuessButton = document.getElementById("submit-guess");
    const wordGrid = document.getElementById("word-grid");
    const message = document.getElementById("message");
    let targetWord = "";
    let wordLength = 5; // Default word length
    let maxAttempts = 6;
    let currentAttempt = 0;

    // List of words (for simplicity, a basic list, but you can expand it)
    const wordList = {
        3: ["cat", "dog", "pig"],
        4: ["bird", "fish", "frog"],
        5: ["apple", "grape", "peach"],
        6: ["banana", "orange", "tomato"],
        7: ["pumpkin", "caramel", "licorice"],
        8: ["avocado", "blueberry", "strawberry"],
        9: ["pineapple", "blackberry", "raspberry"],
        10: ["watermelon", "pomegranate", "honeydew"]
    };

    // Function to start the game
    const startGame = () => {
        wordLength = parseInt(wordLengthInput.value) || 5;
        if (wordLength < 3 || wordLength > 10) {
            message.textContent = "Please enter a word length between 3 and 10.";
            return;
        }

        targetWord = generateRandomWord(wordLength);
        maxAttempts = wordLength + 1;
        currentAttempt = 0;

        // Clear the previous game data
        wordGrid.innerHTML = "";
        guessInput.value = "";
        message.textContent = "";
        guessInput.setAttribute("maxlength", wordLength);
        gameArea.style.display = "block";

        // Generate empty word grid with rows
        for (let i = 0; i < maxAttempts; i++) {
            const row = document.createElement("div");
            row.classList.add("word-row");
            row.style.display = "flex"; // Flexbox for horizontal arrangement
            row.style.justifyContent = "center"; // Center align rows
            for (let j = 0; j < wordLength; j++) {
                const letterBox = document.createElement("div");
                letterBox.classList.add("letter-box");
                row.appendChild(letterBox);
            }
            wordGrid.appendChild(row);
        }
    };

    // Function to generate a random word from the word list
    const generateRandomWord = (length) => {
        const words = wordList[length];
        return words[Math.floor(Math.random() * words.length)];
    };

    // Function to handle the user's guess
    const handleGuess = () => {
        const guess = guessInput.value.toLowerCase();
        if (guess.length !== wordLength) {
            message.textContent = `Please enter a ${wordLength}-letter word.`;
            return;
        }
        if (currentAttempt >= maxAttempts) {
            message.textContent = "No more attempts left!";
            return;
        }

        // Get the current row and fill in the letters
        const row = wordGrid.children[currentAttempt];
        for (let i = 0; i < wordLength; i++) {
            const letterBox = row.children[i];
            letterBox.textContent = guess[i];
        }

        // Check the guess
        checkGuess(guess, row);
        currentAttempt++;
        guessInput.value = "";
    };

    // Function to check the guess against the target word
    const checkGuess = (guess, row) => {
        const targetWordArray = targetWord.split("");
        const guessArray = guess.split("");

        // Create arrays to track correct and incorrect letters
        const correctPositions = Array(wordLength).fill(false);
        const letterCount = {};

        // First pass: Check for correct letters in the correct position
        for (let i = 0; i < wordLength; i++) {
            if (guessArray[i] === targetWordArray[i]) {
                row.children[i].classList.add("correct");
                correctPositions[i] = true;
            } else {
                letterCount[targetWordArray[i]] = (letterCount[targetWordArray[i]] || 0) + 1;
            }
        }

        // Second pass: Check for correct letters in the wrong position
        for (let i = 0; i < wordLength; i++) {
            if (!correctPositions[i]) {
                if (letterCount[guessArray[i]]) {
                    row.children[i].classList.add("wrong-position");
                    letterCount[guessArray[i]]--;
                } else {
                    row.children[i].classList.add("incorrect");
                }
            }
        }

        // Check if the user has won
        if (guess === targetWord) {
            message.textContent = "Congratulations! You've guessed the word!";
            guessInput.disabled = true; // Disable further input
        } else if (currentAttempt >= maxAttempts - 1) {
            message.textContent = `Game over! The word was "${targetWord}".`;
            guessInput.disabled = true; // Disable further input
        }
    };

    // Event listeners
    startGameButton.addEventListener("click", startGame);
    submitGuessButton.addEventListener("click", handleGuess);
});
