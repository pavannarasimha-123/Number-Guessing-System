const MIN = 1;
const MAX = 100;

const input = document.getElementById("guessInput");
const submitBtn = document.getElementById("submit");
const restartBtn = document.getElementById("restart");
const result = document.getElementById("result");
const attemptsEl = document.getElementById("attempts");
const bestEl = document.getElementById("best");
const historyEl = document.getElementById("history");

let randomNumber;
let attempts;
let guesses;
let bestScore = Number(localStorage.getItem("bestScore")) || null;

function newGame() {
    // Inclusive range: MIN..MAX
    randomNumber = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
    attempts = 0;
    guesses = [];
    attemptsEl.textContent = 0;
    historyEl.textContent = "";
    setResult("", "");
    input.value = "";
    input.disabled = false;
    submitBtn.disabled = false;
    restartBtn.style.display = "none";
    bestEl.textContent = bestScore ?? "–";
    input.focus();
}

function setResult(text, cls) {
    result.textContent = text;
    result.className = cls;
}

function guessCheck() {
    const userGuess = parseInt(input.value, 10);

    if (Number.isNaN(userGuess) || userGuess < MIN || userGuess > MAX) {
        setResult(`Enter a whole number from ${MIN} to ${MAX}`, "error");
        return;
    }

    attempts++;
    guesses.push(userGuess);
    attemptsEl.textContent = attempts;
    historyEl.textContent = "Your guesses: " + guesses.join(", ");

    if (userGuess < randomNumber) {
        setResult("Too Low, try again", "hint");
    } else if (userGuess > randomNumber) {
        setResult("Too High, try again", "hint");
    } else {
        setResult(`Correct Guess! Bravooo! 🎉 (${attempts} attempt${attempts > 1 ? "s" : ""})`, "success");
        if (bestScore === null || attempts < bestScore) {
            bestScore = attempts;
            localStorage.setItem("bestScore", bestScore);
            bestEl.textContent = bestScore;
        }
        input.disabled = true;
        submitBtn.disabled = true;
        restartBtn.style.display = "block";
        restartBtn.focus();
        return;
    }

    input.value = "";
    input.focus();
}

submitBtn.addEventListener("click", guessCheck);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") guessCheck();
});
restartBtn.addEventListener("click", newGame);

newGame();
