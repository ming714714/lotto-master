const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://bet.hkjc.com/marksix/", { waitUntil: "networkidle2" });

  const data = await page.evaluate(() => {
    const result = [];
    const draws = document.querySelectorAll(".drawResults li");
    draws.forEach((draw, index) => {
      const numbers = Array.from(draw.querySelectorAll("span.num")).map(span => parseInt(span.innerText));
      const period = Date.now() - index * 86400000;
      if (numbers.length >= 6) {
        result.push({ period, numbers });
      }
    });
    return result.slice(0, 200);
  });

  await browser.close();
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2), "utf8");
})();
