
const fs = require("fs");
const axios = require("axios");

(async () => {
  try {
    const response = await axios.get("https://raw.githubusercontent.com/ming714714/lotto-master/main/data.json");
    const latestData = response.data;
    fs.writeFileSync("data.json", JSON.stringify(latestData, null, 2), "utf-8");
    console.log("✅ 成功更新 data.json");
  } catch (err) {
    console.error("❌ 資料抓取失敗：", err);
    process.exit(1);
  }
})();
