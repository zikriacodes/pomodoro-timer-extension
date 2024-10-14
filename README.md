# Pomodoro Timer Chrome Extension

This is a simple Pomodoro Timer Chrome Extension that helps you manage your work sessions and breaks effectively using the Pomodoro Technique.

## Features

- **Pomodoro Timer**: Start a 25-minute work session followed by a 5-minute break.
- **Notification**: Receive notifications when the timer ends, with the option to start your break or continue working.
- **Persistent Timer State**: Timer state is preserved even when the popup is closed.

## Getting Started

### Prerequisites

Make sure you have Google Chrome installed on your machine.

### Installation

1. Clone the repository or download the ZIP file.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" using the toggle in the top right corner.
4. Click on "Load unpacked" and select the directory where the extension files are located.
5. The Pomodoro Timer extension should now appear in your Chrome extensions.

### Usage

1. Click on the Pomodoro Timer icon in your Chrome toolbar.
2. Press "Start" to begin your Pomodoro session.
3. The timer will count down, and you will receive a notification when time is up.
4. Click on "Start Timer" in the notification to begin your break or return to work.

## Development

To modify or extend the functionality of this extension:

- **popup.js**: Contains the logic for the popup interface.
- **background.js**: Manages the timer and notifications.
- **popup.html**: The HTML structure for the popup interface.
- **style.css**: The styling for the popup.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
