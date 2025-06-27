
fetch("https://ming714714.github.io/lotto-master/data.json")
  .then(response => response.json())
  .then(data => {
    console.log("成功載入資料：", data);
    document.getElementById("latest").innerHTML = "載入成功，共 " + data.length + " 筆資料";
  })
  .catch(error => {
    console.error("載入資料失敗：", error);
    document.getElementById("latest").innerHTML = "載入資料失敗";
});
