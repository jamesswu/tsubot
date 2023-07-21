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
    const listings = await page.evaluate(() => {
      Array.from(document.querySelectorAll('.listing'), e => {
        
      } )
    })
    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

export default getData;