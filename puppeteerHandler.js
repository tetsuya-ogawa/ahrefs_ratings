const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

class PuppeteerHandler {
    constructor() {
    }
    
    async fetch(domain) {
        const url = `https://ahrefs.com/site-explorer/overview/v2/prefix/live?target=${domain}`
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        const ur = await this.page.$eval('#UrlRatingContainer span', item => {
            return item.textContent;
        });
        const dr = await this.page.$eval('#DomainRatingContainer span', item => {
            return item.textContent;
        });
        return { 'domain': domain, 'ur': ur, 'dr': dr }
    }
    
    async launchBrowser() {
        const browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath,
          headless: chromium.headless,
        });
        this.browser = browser
        this.page = await browser.newPage()
        await this._login('https://ahrefs.com/user/login', process.env.EMAIL, process.env.PASS)
    }
    
    async closeBrowser() {
        if(this.browser !== null) {
            await this.browser.close();
        }
    }
    
    async _login(url, id, pass) {
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        await this.page.waitFor('form#formLogin', {timeout: 5000});
        await this.page.type("#email_input", id);
        await this.page.type('input[name="password"]', pass);
        const buttonElement = await this.page.$('#SignInButton');
        await buttonElement.click();
        await this.page.waitFor('body#dashboard', {timeout: 5000});
    }
}

module.exports = PuppeteerHandler;

