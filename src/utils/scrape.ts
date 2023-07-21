import puppeteer, { ElementHandle } from "puppeteer";

const getData = async (encounter: string) => {
  try {
    const URL = 'https://xivpf.com/listings';
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto(URL);

    // set data center to AETHER then
    // search for specific fight then
    // return DOM elements of the fights

    const selectSelector = '#data-centre-filter';
    const inputSelector = '.search';
    await page.waitForSelector(selectSelector);
    await page.waitForSelector(inputSelector)
    // await page.click('#data-centre-filter');
    // await page.click('#data-centre-filter > Aether')
    await page.select('select#data-centre-filter', 'Aether');
    await page.type(inputSelector, 'dragonsong');
    const listings = await page.waitForSelector('#listings');
    console.log('listings?',listings);
    const items = await listings?.evaluateHandle(() => {
      Array.from(document.querySelectorAll('#listings > .listing'), (el) => (
        {
          duty: el.querySelector('.left .duty')?.textContent
        }))
    })
    const body = await page.evaluateHandle(() => {
      return document.body;
    })
    console.log("body?",body);

    console.log("items?",items);
    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

export default getData;