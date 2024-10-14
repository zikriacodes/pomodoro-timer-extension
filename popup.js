let timer;
let isPomodoro = true;
let timeLeft = 25 * 60;

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusDisplay = document.getElementById('status');

// Function to display the timer status
const updateDisplay = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    statusDisplay.textContent = isPomodoro ? 'Focus Mode' : 'Break Mode';
};

// Start the timer via message to the background script
const startTimer = () => {
    chrome.runtime.sendMessage({ action: "start" }, (response) => {
        console.log(response.status);
    });
};

// Reset the timer via message to the background script
const resetTimer = () => {
    chrome.runtime.sendMessage({ action: "reset" }, (response) => {
        console.log(response.status);
        timeLeft = 25 * 60;
        updateDisplay();
    });
};

// Load the timer state when the popup opens
const loadTimerState = () => {
    chrome.storage.local.get(['timeLeft', 'isPomodoro'], (result) => {
        if (result.timeLeft !== undefined) {
            timeLeft = result.timeLeft;
            isPomodoro = result.isPomodoro;
        }
        updateDisplay();
    });
};

// Listen for time updates from the background script
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "timeUpdate") {
        timeLeft = request.timeLeft;
        updateDisplay();
    }
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "resetUpdate") {
        isPomodoro = request.isPomodoro;
        updateDisplay();
    }
});

// Event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

loadTimerState();
updateDisplay();
