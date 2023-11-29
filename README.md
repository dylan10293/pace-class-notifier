
# Automated Class Registration with Puppeteer

## Overview
This Node.js script utilizes Puppeteer, a headless browser automation library, to automate the process of class registration on the Pace University portal. The script performs the following tasks:

1. **Login to the Portal**: The script logs in to the Pace University portal using provided credentials retrieved from environment variables.

2. **Automated Class Searches**: It searches for specific classes by course number on the class registration page, checking for availability.

3. **Duo Authorization Notification**: If the portal prompts for Duo authorization, the user must manually add it. The script plays a sound notification to alert the user.

4. **Audio Notifications**: The script plays audio notifications based on the status of the class registration. For example, it plays a notification if the user is not successfully logged in or if a class is available.

5. **Randomized Delays**: After each iteration of the main process, the script introduces a random delay between 10 to 15 minutes to avoid detection by automated systems.

## Prerequisites
- Before running the script, ensure the following:

- Node.js is installed on your machine.
Puppeteer, Audic, and dotenv npm packages are installed (**'npm install puppeteer audic dotenv**).

## Usage
1. Clone the repository:
`git clone https://github.com/your-username/automated-class-registration.git`

2. Navigate to the project directory:
`cd automated-class-registration`

3. Create a **'.env'** file in the root directory and add the following:
```
USERNAME=your_username
PASSWORD=your_password
```
Replace **'your_username'** and **'your_password'** with your Pace University portal credentials.

4. Run the script:
`node index.js`

## Duo Authorization
Manual Addition Required: If the portal prompts for Duo authorization, the user must manually add it. The script will play a notification sound to alert the user.

## Configuration
**Executable Path**: The script is configured to launch the Microsoft Edge browser. Modify the **'executablePath'** in the Puppeteer launch options if using a different browser.

**Audio Files**: Audio files for notifications are located in the project directory. Replace these with your own audio files if desired.

## Notes
This script is provided as-is. Use it responsibly and adhere to the terms of service of the Pace University portal.

Customize the script according to your specific class search criteria and requirements.
