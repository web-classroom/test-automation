const assert = require('assert');
const puppeteer = require('puppeteer');

const url = "http://localhost:3000/";

const server = require('../server');
let app, browser, page;

describe("The subscribe page", () => {

    // Start the server and open the browser before each test
    beforeEach(async () => {
        app = server.listen(3000);
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
    });

    // Stop the server and close the browser after each test
    afterEach (async () => {
        app.close();
        await browser.close();
    });

    it("should display the correct title", async () => {
        await page.goto(url);
        const title = await page.title();
        assert.equal(title, "Subscribe to our mailing list");
    });
});