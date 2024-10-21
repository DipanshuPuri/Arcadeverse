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

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  // Splitting paragraph into array of characters and adding span to each
  paragraphs[randIndex].split("").forEach(char => {
    let span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  // Reset variables
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];

  if (!isTyping) {
    timer = setInterval(startTimer, 1000);
    isTyping = true;
  }

  if (typedChar == null) {
    // If typed character is backspace
    charIndex--;
    if (characters[charIndex].classList.contains("incorrect")) {
      mistakes--;
    }
    characters[charIndex].classList.remove("correct", "incorrect");
  } else {
    if (characters[charIndex].innerText === typedChar) {
      characters[charIndex].classList.add("correct");
    } else {
      mistakes++;
      characters[charIndex].classList.add("incorrect");
    }
    charIndex++;
  }

  // Remove previous "active" class and add to the current one
  characters.forEach(span => span.classList.remove("active"));
  characters[charIndex]?.classList.add("active");

  // Update mistakes count
  mistakeTag.innerText = mistakes;

  // Calculate WPM and CPM
  let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60); // WPM for 15 sec
  wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
  wpmTag.innerText = wpm;

  let cpm = Math.round((charIndex - mistakes) / (maxTime - timeLeft) * 60); // CPM for 15 sec
  cpmTag.innerText = cpm;
}

function startTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
    inpField.disabled = true; // Disable input after time is up
    inpField.value = ""; // Clear the input field
  }
}

function resetGame() {
  randomParagraph();
  inpField.value = "";
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.disabled = false; // Enable input for a new test
  timeTag.innerText = timeLeft;
  mistakeTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
