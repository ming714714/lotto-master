
document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("data.json");
    const data = await res.json();

    const latest = data[data.length - 1].numbers;
    const latestDiv = document.getElementById("latestBalls");
    latest.forEach(n => {
        const div = document.createElement("div");
        div.className = "ball";
        div.innerText = n;
        latestDiv.appendChild(div);
    });

    const count = Array(49).fill(0);
    data.forEach(draw => draw.numbers.forEach(num => count[num - 1]++));
    const stats = count.map((c, i) => { return { num: i + 1, count: c } });
    stats.sort((a, b) => b.count - a.count);

    stats.slice(0, 6).forEach(x => {
        const div = document.createElement("div");
        div.className = "ball hot";
        div.innerText = x.num;
        document.getElementById("hotBalls").appendChild(div);
    });
    stats.slice(-6).forEach(x => {
        const div = document.createElement("div");
        div.className = "ball cold";
        div.innerText = x.num;
        document.getElementById("coldBalls").appendChild(div);
    });

    function getRandom(arr, n) {
        const result = [];
        const used = new Set();
        while (result.length < n) {
            const r = arr[Math.floor(Math.random() * arr.length)];
            if (!used.has(r)) {
                result.push(r);
                used.add(r);
            }
        }
        return result;
    }

    for (let i = 0; i < 6; i++) {
        const combo = getRandom([...Array(49).keys()].map(x => x + 1), 6).sort((a,b)=>a-b);
        const row = document.createElement("div");
        row.className = "balls";
        combo.forEach(n => {
            const div = document.createElement("div");
            div.className = "ball";
            div.innerText = n;
            row.appendChild(div);
        });
        document.getElementById("recommendSets").appendChild(row);
    }

    const hotPool = stats.slice(0, 12).map(x => x.num);
    const coldPool = stats.slice(-12).map(x => x.num);
    const midPool = stats.slice(12, 37).map(x => x.num);
    const smart = [...getRandom(hotPool,2),...getRandom(coldPool,2),...getRandom([...Array(49).keys()].map(x=>x+1),1),...getRandom(midPool,1)].sort((a,b)=>a-b);
    smart.forEach(n => {
        const div = document.createElement("div");
        div.className = "ball";
        div.innerText = n;
        document.getElementById("smartBalls").appendChild(div);
    });

    const inputsDiv = document.getElementById("inputs");
    for (let i = 0; i < 6; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 49;
        inputsDiv.appendChild(input);
    }
});

function simulate() {
    const inputs = Array.from(document.querySelectorAll("#inputs input")).map(i => parseInt(i.value)).filter(n => n >=1 && n <= 49);
    if (inputs.length !== 6) {
        alert("請輸入完整 6 個號碼（1~49）");
        return;
    }
    const winNums = [];
    while (winNums.length < 6) {
        const n = Math.floor(Math.random() * 49) + 1;
        if (!winNums.includes(n)) winNums.push(n);
    }
    const matched = inputs.filter(n => winNums.includes(n)).length;
    const checkboxes = Array.from(document.querySelectorAll("input[type=checkbox]")).filter(cb => cb.checked);
    let resultHTML = `<p>開獎號碼：${winNums.sort((a,b)=>a-b).join(', ')}</p>`;
    resultHTML += `<p>你對中：${matched} 個號碼</p>`;
    let totalBet = 0, totalWin = 0;
    checkboxes.forEach(cb => {
        const star = parseInt(cb.value);
        const bet = parseInt(cb.nextSibling.textContent.replace(/[^0-9]/g,'')) || 10;
        totalBet += bet;
        if (matched >= star) {
            const win = bet * (star === 2 ? 80 : star === 3 ? 500 : star === 4 ? 2000 : star === 5 ? 8000 : 100000);
            totalWin += win;
        }
    });
    resultHTML += `<p>下注金額：${totalBet} 元</p><p>模擬獎金：${totalWin} 元</p>`;
    document.getElementById("betResult").innerHTML = resultHTML;
}
