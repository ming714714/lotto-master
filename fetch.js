
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

async function main() {
  const res = await fetch('https://bet.hkjc.com/marksix/marksix.aspx?lang=ZH');
  const html = await res.text();
  const $ = cheerio.load(html);

  const draws = [];
  $('.draw-period').each((i, el) => {
    const period = parseInt($(el).find('.period').text());
    const date = $(el).find('.date').text();
    const nums = [];
    $(el).find('.ball').each((j, b) => nums.push(parseInt($(b).text())));
    draws.push({ period, date, numbers: nums });
  });

  const data = draws.slice(0, 200);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

main().catch(console.error);
