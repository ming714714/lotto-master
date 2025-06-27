const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

(async () => {
  try {
    const response = await axios.get('https://bet.hkjc.com/marksix/');
    const $ = cheerio.load(response.data);

    const latestDrawText = $('.drawNumber').first().text().trim();
    const numberBalls = $('.ball').map((i, el) => parseInt($(el).text())).get().slice(0, 6);

    const latest = {
      period: Date.now(),
      numbers: numberBalls
    };

    let data = [];
    const file = 'data.json';
    if (fs.existsSync(file)) {
      data = JSON.parse(fs.readFileSync(file, 'utf8'));
    }

    data.unshift(latest);
    data = data.slice(0, 200);
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');

    console.log('✅ 成功寫入最新資料:', latest);
  } catch (error) {
    console.error('❌ 爬蟲失敗:', error.message);
    process.exit(1);
  }
})();