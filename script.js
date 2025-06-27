
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const latest = data[data.length - 1];
    document.getElementById('latest').innerText = latest.numbers.join(', ');
  })
  .catch(() => {
    document.getElementById('latest').innerText = '載入資料失敗';
  });
