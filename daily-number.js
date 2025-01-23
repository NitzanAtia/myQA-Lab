// Function to generate a unique daily number
function getUniqueDailyNumber() {
    const min = 1;
    const max = 10000;
    const daysSinceEpoch = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return (daysSinceEpoch % (max - min + 1)) + min;
}

// Function to handle daily number with storage
function getDailyNumberWithStorage() {
    const today = new Date().toDateString(); // Get today's date as a string
    const storedDate = localStorage.getItem("dailyDate");
    const storedNumber = localStorage.getItem("dailyNumber");

    if (storedDate === today && storedNumber) {
        return parseInt(storedNumber);
    }

    const newNumber = getUniqueDailyNumber();
    localStorage.setItem("dailyDate", today);
    localStorage.setItem("dailyNumber", newNumber);

    return newNumber;
}

// The unique daily number
const dailyNumber = getDailyNumberWithStorage();
console.log("Daily Number:", dailyNumber);

// Initialize guess count
let guessCount = 0;

// DOM elements
const feedbackDiv = document.getElementById("feedback");
const guessHistory = document.getElementById("guess-history");
const fireworksContainer = document.getElementById("fireworks-container");

// Handle guess submission
document.getElementById("submit-guess").addEventListener("click", () => {
    const guessInput = document.getElementById("guess-input");
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10000) {
        feedbackDiv.textContent = "Please enter a number between 1 and 10,000.";
        feedbackDiv.style.color = "black";
        return;
    }

    guessCount++;
    giveFeedback(userGuess);
    updateGuessHistory(userGuess);
    guessInput.value = ""; // Clear input
});

// Provide feedback
function giveFeedback(guess) {
    const diff = Math.abs(dailyNumber - guess);
    let feedback = "";

    if (guess < dailyNumber) {
        feedback = `The number is bigger than ${guess}.`;
    } else if (guess > dailyNumber) {
        feedback = `The number is lower than ${guess}.`;
    } else {
        feedback = "Congratulations!<br> You guessed the number of today correctly! 🎉<br>";
        showFireworks();
    }

    // Determine feedback color
    const shade = Math.min(255, Math.floor((10000 - diff) / 10000 * 255));
    const color = `rgb(${255 - shade}, ${shade}, 0)`; // Red to green gradient

    feedbackDiv.innerHTML = feedback;
    feedbackDiv.style.color = guess === dailyNumber ? "#003366" : color;
}

// Update guess history
function updateGuessHistory(guess) {
    const li = document.createElement("li");
    li.textContent = `${guessCount}. ${guess}`;
    guessHistory.appendChild(li);
}

// Fireworks animation
function showFireworks() {
    fireworksContainer.innerHTML = `
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>
    `;
    setTimeout(() => (fireworksContainer.innerHTML = ""), 5000); // Remove fireworks after 5 seconds
}
