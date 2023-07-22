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
    await page.waitForSelector('#listings');

    const listings = await page.evaluate(() => {
      const array = Array.from(document.querySelectorAll('.listing'), (el) => ({
        duty: el.querySelector('.left .duty')?.textContent,
        creator: el.querySelector('.right .creator .text')?.textContent,
        world: el.querySelector('.right .world .text')?.textContent,
        expires_In: el.querySelector('.right .expires .text')?.textContent,
        updated_At: el.querySelector('.right .updated .text')?.textContent
      }))
      return array;
    })
    console.log(listings);
    // const items = await listings?.evaluate(() => {
    //   Array.from(listings, (el => {

    //   }))


    //   const temp = await listings?.evaluate(el => ({
    //     duty: el.querySelector('.left .duty')?.textContent,
    //     creator: el.querySelector('.right .creator .text')?.textContent,
    //     world: el.querySelector('.right .world .text')?.textContent,
    //     expires: el.querySelector('.right .expires .text')?.textContent
    //   }))
    //   console.log('temp?',temp)

    // })
    // const items = await listings?.evaluate(el => (
    //   {

    //   }
    // ))
    // console.log('items?',items  )

    // const items = await page.evaluate(() => {
    //   const dutys = Array.from(document.querySelectorAll('.duty')).map(el => el.textContent);
    //   const creators = Array.from(document.querySelectorAll('.creator')).map(el => el.textContent);
    //   const worlds = Array.from(document.querySelectorAll('.world')).map(el => el.textContent);
    //   const expires = Array.from(document.querySelectorAll('.expires')).map(el => el.textContent);
    // })

    await browser.close();
  } catch (error) {
    console.error(error);
  }
}

export default getData;