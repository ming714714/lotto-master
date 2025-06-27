
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    const latest = data[0];
    document.getElementById("latest").innerHTML =
      `最新一期號碼（${latest.date}）<br>${latest.numbers.join(" ")}`;
  });
