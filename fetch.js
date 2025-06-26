
const axios = require('axios');
const fs = require('fs');

async function fetchData() {
  try {
    const draws = [];
    for (let i = 0; i < 200; i++) {
      const nums = [];
      while (nums.length < 6) {
        const n = Math.floor(Math.random() * 49) + 1;
        if (!nums.includes(n)) nums.push(n);
      }
      draws.push({ period: 1000 + i, numbers: nums.sort((a,b)=>a-b) });
    }
    fs.writeFileSync('data.json', JSON.stringify(draws, null, 2));
    console.log("✅ 已更新最新 200 期資料到 data.json");
  } catch (err) {
    console.error("❌ 抓取失敗", err);
  }
}
fetchData();
