import puppeteer from "puppeteer";

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
    await page.select('select#data-centre-filter', 'Aether');
    await page.type(inputSelector, 'dragonsong');
    await page.waitForSelector('#listings');

    const listings = await page.evaluate(() => {
      const array = Array.from(document.querySelectorAll('.listing'), (el) => ({
        duty: el.querySelector('.left .duty')?.textContent,
        description: el.querySelector('.left .description')?.textContent,
        creator: el.querySelector('.right .creator .text')?.textContent,
        world: el.querySelector('.right .world .text')?.textContent,
        expires_In: el.querySelector('.right .expires .text')?.textContent,
        updated_At: el.querySelector('.right .updated .text')?.textContent
      }))
      return array;
    })
    console.log(listings);
    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

export default getData;