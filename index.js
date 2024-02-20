import puppeteer from 'puppeteer';

(async () => {

  const browser = await puppeteer.launch({headless:true}); //make headless false to see the browser GUI (and also comment the browser.close() line at the end otherwise it will auto close)
  const page = await browser.newPage();

 
  let searchTerm = 'mouse' //The product search string
  await page.goto(`https://mdcomputers.in/index.php?search=${searchTerm}&submit_search=&route=product%2Fsearch`,); //Change this link to scrape a different page


  await page.setViewport({width: 1920, height: 1080});
  
  // await page.screenshot({path: "screenshot.png",fullPage:true})  //Uncomment to get a screenshot of the page in root directory

  const result = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('div.right-block.right-b'));

    return items.map(item => {
      const title = item.querySelector('h4 a').textContent.trim();
      const link = item.querySelector('h4 a').getAttribute('href');
      const priceNew = item.querySelector('.price-new').textContent.trim();
      const description = item.querySelector('.description p').textContent.trim();

      return {
        title,
        link,
        priceNew,
        description,
      };
    });
  });


  console.log(result)

  browser.close()
})();