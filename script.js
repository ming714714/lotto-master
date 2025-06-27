function $(id) { return document.getElementById(id); }

function showLatest() {
  const latest = data.draws[data.draws.length - 1];
  const now = new Date();
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' };
  $("latest-date").textContent = now.toLocaleDateString('zh-TW', options);

  $("latest-numbers").innerHTML = latest.numbers.map(n => `<span>${n}</span>`).join("");
}

function analyzeStats() {
  const counts = Array(50).fill(0);
  data.draws.forEach(d => d.numbers.forEach(n => counts[n]++));
  const ranked = counts.map((count, num) => ({ num, count })).slice(1);
  ranked.sort((a, b) => b.count - a.count);
  $("hot-numbers").innerHTML = ranked.slice(0, 6).map(n => `<span>${n.num}</span>`).join("");
  $("cold-numbers").innerHTML = ranked.slice(-6).map(n => `<span>${n.num}</span>`).join("");
}

function showRecommend() {
  const rec = Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1);
  $("natural-recommend").innerHTML = rec.map(n => `<span>${n}</span>`).join("");
  const smart = [10, 13, 24, 28, 35, 40];
  $("smart-recommend").innerHTML = smart.map(n => `<span>${n}</span>`).join("");
}

function simulate() {
  const inputs = document.querySelectorAll('#input-boxes input');
  const nums = Array.from(inputs).map(i => parseInt(i.value)).filter(n => !isNaN(n));
  if (nums.length !== 6) return alert("請輸入 6 個號碼");
  const drawn = Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1);
  const hits = nums.filter(n => drawn.includes(n)).length;
  const result = [`開獎號碼：${drawn.join(", ")}`, `你中了 ${hits} 碼`];
  $("result").innerText = result.join("\n");
}

window.onload = () => {
  $("input-boxes").innerHTML = "<input type='number' min='1' max='49' />".repeat(6);
  showLatest();
  analyzeStats();
  showRecommend();
};