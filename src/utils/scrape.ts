import puppeteer from "puppeteer";

async function getVisual() {
  try {
    const URL = 'https://www.reddit.com/r/programming/';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    await page.screenshot({path:'screenshot.png'});
    await page.pdf({path: 'page.pdf'});
  } catch (error) {
    console.error(error);
  }
}
getVisual();