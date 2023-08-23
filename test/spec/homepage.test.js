const puppeteer = require('puppeteer')

const timeout = 10000;
let browser, page;
let URL = 'http://localhost:3000/login'

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 70,
  })
  page = await browser.newPage();
  await page.goto(URL);
})

afterAll(async () => {
  await browser.close();
})

function getErrors(errorSelector) {
  const error = document.querySelector(errorSelector)
  return error.textContent
}

describe('Testing user login functionality', () => {
  const username = '#inputUsername'
  const password = '#inputPassword'
  const buttonSelector = '#signIn-btn'
  const errorElements = '#error-msg'

  test('Page should have the correct title', async () => {
    const title = await page.title();

    expect(title).toBe('Dietary Planner')
  })

  test('Should throw an warning message', async () => {
    await page.waitForSelector(username)
    //await page.waitForSelector(password)
    await page.click(buttonSelector)
    const errorsRecieved = await page.evaluate(getErrors, errorElements)
    console.log(errorsRecieved)

    expect(errorsRecieved).toEqual('Wrong credentials')
  })
})
