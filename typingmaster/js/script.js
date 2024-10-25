import { fetchRandomParagraph } from './paragraphs.js'; // Import the fetch function

const typingText = document.querySelector(".typing-text p"), 
  inpField = document.querySelector(".input-field"),
  mistakeTag = document.querySelector(".mistake span"),
  timeTag = document.querySelector(".time b"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  tryAgainBtn = document.querySelector("button");

let timer,
  maxTime = 15, // Set the time to 15 seconds
  timeLeft = maxTime,
  charIndex = 0,
  mistakes = 0,
  isTyping = false;

// Fetch and display a random paragraph
async function randomParagraph() {
    try {
        const paragraph = await fetchRandomParagraph(); // Fetch random paragraph
        typingText.innerHTML = ""; // Clear previous text
        
        // Splitting paragraph into array of characters and adding span to each
        paragraph.split("").forEach(char => {
            let span = `<span>${char}</span>`;
            typingText.innerHTML += span; // Add each character span to typingText
        });

        typingText.querySelectorAll("span")[0].classList.add("active"); // Activate the first character

        // Set focus to input field on keydown or clicking the paragraph
        document.addEventListener("keydown", () => inpField.focus());
        typingText.addEventListener("click", () => inpField.focus());
    } catch (error) {
        console.error('Error fetching paragraph:', error); // Handle errors
    }
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex]; // Get the current character typed

    if (!isTyping) {
        timer = setInterval(startTimer, 1000); // Start timer when typing starts
        isTyping = true; // Update typing state
    }

    if (typedChar == null) {
        // Handle backspace
        charIndex--;
        if (characters[charIndex].classList.contains("incorrect")) {
            mistakes--; // Decrease mistakes if correcting
        }
        characters[charIndex].classList.remove("correct", "incorrect");
    } else {
        if (characters[charIndex].innerText === typedChar) {
            characters[charIndex].classList.add("correct"); // Mark as correct
        } else {
            mistakes++; // Increment mistakes count
            characters[charIndex].classList.add("incorrect"); // Mark as incorrect
        }
        charIndex++;
    }

    // Update the active character
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex]?.classList.add("active");

    // Update UI for mistakes, WPM, and CPM
    mistakeTag.innerText = mistakes;

    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60); // WPM calculation
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm; // Handle invalid values
    wpmTag.innerText = wpm;

    let cpm = Math.round((charIndex - mistakes) / (maxTime - timeLeft) * 60); // CPM calculation
    cpmTag.innerText = cpm;
}

function startTimer() {
    if (timeLeft > 0) {
        timeLeft--; // Decrease time left
        timeTag.innerText = timeLeft; // Update timer display
    } else {
        clearInterval(timer);
        inpField.disabled = true; // Disable input after time is up
        inpField.value = ""; // Clear the input field
    }
}

function resetGame() {
    randomParagraph(); // Get a new random paragraph
    inpField.value = ""; // Clear input field
    clearInterval(timer); // Stop the timer
    timeLeft = maxTime; // Reset time left
    charIndex = mistakes = isTyping = 0; // Reset variables
    inpField.disabled = false; // Enable input for a new test
    timeTag.innerText = timeLeft; // Reset timer display
    mistakeTag.innerText = mistakes; // Reset mistakes display
    wpmTag.innerText = 0; // Reset WPM display
    cpmTag.innerText = 0; // Reset CPM display
}

// Initial call to set a random paragraph
randomParagraph();
inpField.addEventListener("input", initTyping); // Input event for typing
tryAgainBtn.addEventListener("click", resetGame); // Button event to reset game
