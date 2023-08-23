const puppeteer = require('puppeteer');

(
  async () => {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 70
    })

    const page = await browser.newPage();

    await page.goto('http://localhost:3000/login')

    const usernameInput = 'input[id="inputUsername"]'
    const passwordInput = 'input[id="inputPassword"]'

    await page.waitForSelector(usernameInput)
    await page.click(usernameInput, { clickCount: 1 })
    await page.type(usernameInput, 'johndoe123')

    await page.keyboard.press('Enter')

    console.log('done')

    await browser.close();
  }
)()
