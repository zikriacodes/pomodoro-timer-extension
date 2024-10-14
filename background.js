let timer;
let isPomodoro = true;
let timeLeft = 25 * 60;

// Function to start the timer
const startTimer = () => {
    if (timer) return;
    timer = setInterval(() => {
        timeLeft--;

        chrome.storage.local.set({ timeLeft, isPomodoro });

        chrome.runtime.sendMessage({ action: "timeUpdate", timeLeft });

        if (timeLeft <= 0) {
            clearInterval(timer);
            timer = null;
            sendNotification();

            isPomodoro ? timeLeft = 5 * 60 : timeLeft = 25 * 60;
            isPomodoro = !isPomodoro;
            chrome.runtime.sendMessage({ action: "resetUpdate", isPomodoro });
        }
    }, 1000);
};

// Function to send notifications
const sendNotification = () => {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Pomodoro Timer',
        message: isPomodoro ? 'Time to take a break!' : 'Get back to work!',
        priority: 2,
        buttons: [
            { title: 'Start Timer' },
        ]
    }, (notificationId) => {
        console.log("Notification created with ID:", notificationId);
    });
};

// Function to reset the timer
const resetTimer = () => {
    clearInterval(timer);
    timer = null;
    timeLeft = 25 * 60;
    isPomodoro = true;
    chrome.runtime.sendMessage({ action: "resetUpdate", isPomodoro });
    chrome.storage.local.set({ timeLeft, isPomodoro });
};

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "start") {
        startTimer();
        sendResponse({ status: "started" });
    } else if (request.action === "reset") {
        resetTimer();
        sendResponse({ status: "reset" });
    }
});

// Listen for notification button clicks
chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    if (buttonIndex === 0) {
        startTimer();
    }
});

// Retrieve saved timer status when the extension starts
chrome.storage.local.get(['timeLeft', 'isPomodoro'], (result) => {
    if (result.timeLeft !== undefined) {
        timeLeft = result.timeLeft;
        isPomodoro = result.isPomodoro;
    }
});
