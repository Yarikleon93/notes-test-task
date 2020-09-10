const faker = require('faker')
const puppeteer = require('puppeteer')
const APP = "http://localhost:3000/create"
const lead = {
  title: faker.lorem.word(),
  description: faker.lorem.sentence()
};
let page;
let browser;
const width = 1920;
const height = 1080;
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});
describe("Contact form", () => {
  test("lead can submit a contact request", async () => {
    await page.waitForSelector("[data-test=contact-form]");
    await page.click("input[name=title]");
    await page.type("input[name=title]", lead.title);
    await page.click("input[name=description]");
    await page.type("input[name=description]", lead.description);
    await page.click("button[type=button]");
    await page.waitForSelector(".modal");
  }, 16000);
});