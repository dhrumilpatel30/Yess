const puppeteer = require('puppeteer');
const app = require('express')();

var clicked_times = 0;

(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    page.on('console', (message) => {
        console.log(`Website Console Log: ${message.text()}`);
    });

    await page.goto('https://elvishbhai.com');

    try {
        await page.type('input[placeholder="enter your name"]', 'uske papa');

        for (let i = 0; ; i++) {
            clicked_times++;
            await page.waitForXPath('//button[text()="Yes"]', { timeout: 60000 });
            const button = await page.$x('//button[text()="Yes"]');
            await button[0].click();

            console.log(`Clicked the "Yes" button ${i + 1} times.`);

            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log('Done!');
    } catch (error) {
        console.error('Error interacting with the website:', error);
    }

    await browser.close();
})();

app.get('/api', (req, res) => {
    res.send(`Clicked the "Yes" button ${clicked_times} times.`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});
