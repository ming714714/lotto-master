
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto('https://bet.hkjc.com/marksix/', { waitUntil: 'networkidle2' });

  const result = await page.evaluate(() => {
    const balls = Array.from(document.querySelectorAll('.tdBall .ballnumber'));
    const numbers = balls.map(el => parseInt(el.textContent)).filter(n => !isNaN(n));
    const dateText = document.querySelector('.drawDate span')?.textContent || '';
    return {
      date: dateText,
      numbers: numbers
    };
  });

  await browser.close();

  if (result.numbers.length === 6) {
    const record = {
      period: Date.now(),
      numbers: result.numbers
    };

    let data = [];
    if (fs.existsSync('data.json')) {
      data = JSON.parse(fs.readFileSync('data.json'));
    }
    data.unshift(record);
    data = data.slice(0, 200);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2), 'utf8');
    console.log('✅ 更新成功:', record);
  } else {
    console.log('❌ 抓取開獎號碼失敗');
    process.exit(1);
  }
})();
