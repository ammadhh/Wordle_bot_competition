const solution = "APPLE"; // This should come from your Flask app
const maxGuesses = 6;
let currentGuess = "";
let guessCount = 0;

// Submit guess when the enter key is pressed
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        submitGuess();
    } else if (event.key === "Backspace") {
        deleteLastLetter();
    } else {
        const letter = event.key.toUpperCase();
        if (letter.length === 1 && letter >= 'A' && letter <= 'Z') {
            addLetter(letter);
        }
    }
});

function addLetter(letter) {
    if (currentGuess.length < 5) {
        currentGuess += letter;
        const cell = document.getElementById(`${guessCount}${currentGuess.length - 1}`);
        cell.textContent = letter;
    }
}

function deleteLastLetter() {
    if (currentGuess.length > 0) {
        const cell = document.getElementById(`${guessCount}${currentGuess.length - 1}`);
        cell.textContent = "";
        currentGuess = currentGuess.slice(0, -1);
    }
}

function submitGuess() {
    if (currentGuess.length != 5) {
        alert("Guess must be 5 letters!");
        return;
    }

    colorCodeGuess(currentGuess);

    currentGuess = "";
    guessCount++;

    if (guessCount === maxGuesses) {
        alert("Game over! The word was: " + solution);
        // Disable further input or reset the game
    }
}

function colorCodeGuess(guess) {
    for (let i = 0; i < 5; i++) {
        let cell = document.getElementById(`${guessCount}${i}`);
        let letter = guess[i];
        if (letter === solution[i]) {
            cell.classList.add("correct");
        } else if (solution.includes(letter)) {
            cell.classList.add("present");
        } else {
            cell.classList.add("absent");
        }
    }
}
// function resetGame() {
//     // Reloads the current page
//     location.reload();
// }