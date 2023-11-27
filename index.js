import puppeteer from 'puppeteer';
import { playAudioFile } from 'audic';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Function to introduce a delay
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Function to log in to the portal
const login = async (page) => {
	// Retrieve login credentials from environment variables
	const username = process.env.USERNAME;
	const password = process.env.PASSWORD;
	// Enter login credentials
	await page.type('#username', username);
	await page.type('#password', password);
	await page.click("input[value='LOGIN']");
	await page.waitForNavigation();

	// Check if the user is successfully logged in
	while (page.url() !== 'https://portal.pace.edu/home') {
		// If not logged in, play an audio notification and wait for 5 seconds
		await playAudioFile('mixkit-epic-orchestra-transition-2290.wav');
		await sleep(5000);
	}
};

// Main function to automate the process
const main = async () => {
	try {
		await playAudioFile('mixkit-retro-game-notification-212.wav');

		// Launch Puppeteer
		const browser = await puppeteer.launch({
			executablePath:
				'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
			headless: false,
			defaultViewport: null,
			userDataDir: './user_data',
		});
		const page = await browser.newPage();
		await page.goto('https://portal.pace.edu/');

		const desiredURL = 'https://portal.pace.edu/home';
		// Check if already on the desired page; if not, perform login
		if (page.url() !== desiredURL) await login(page, '12312312', '123123123');

		// Perform class searches
		await searchClass(page, '617');
		await searchClass(page, '650');

		// Close the browser
		await browser.close();
	} catch (error) {
		console.error('Error:', error);
	}

	// Introduce a random delay between 10 to 15 minutes
	const minDelay = 10 * 60000;
	const maxDelay = 15 * 60000;
	const randomDelay =
		Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
	console.log(`Delay: ${randomDelay / 60000} minutes`);
	await sleep(randomDelay);

	// Recursively call the main function
	return main();
};

// Function to search for a class
const searchClass = async (page, courseNum) => {
	const searchURL =
		'https://ban9prodss.pace.edu/StudentRegistrationSsb/ssb/classRegistration/classRegistration';
	await page.goto(searchURL);

	// Check if already on the class search page
	if (!(await page.content()).includes('Enter Your Search Criteria')) {
		// If not, navigate to the search page
		await page.click('#registerLink');
		await page.waitForSelector('#s2id_txt_term');
		const divHandle = await page.$('#s2id_txt_term');
		const box = await divHandle.boundingBox();
		await sleep(2000);
		await page.mouse.click(box.x + 50, box.y + 10);
		await page.waitForSelector('#\\32 02420');
		await page.click('#\\32 02420');
		await page.click('#term-go');
	}

	// Search for the class
	await page.waitForSelector('.select2-search-field > input');
	await page.type('.select2-search-field > input', 'Computer Science');
	await page.waitForSelector('#CS');
	await page.click('#CS');
	await page.type('#txt_courseNumber', courseNum);
	await page.click('#search-go');

	// Check if the class is available
	await page.waitForSelector('#table1');
	const hasClassAvailable = await page.evaluate(() => {
		const classStatuses = document.querySelectorAll(
			"#table1 td[data-property='status']",
		);
		const hasClass = Array.from(classStatuses).find(
			(data) => !data.innerText.includes('FULL'),
		);
		if (!hasClass) return false;
		// Highlight the available class
		hasClass.firstChild.style.background = '#0FF';
		return hasClass;
	});

	// If the class is available, play an audio notification continuously
	if (hasClassAvailable) {
		while (true)
			await playAudioFile('mixkit-small-group-cheer-and-applause-518.wav');
	}
	await playAudioFile('mixkit-sad-game-over-trombone-471.wav');

	// Introduce a delay after the class search to view results
	await sleep(3000);
};

// Start the automation process
main();
