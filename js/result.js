// 讀取 localStorage 的答案，根據答案顯示對應結果
// 這裡僅做範例，請根據實際邏輯調整

document.addEventListener('DOMContentLoaded', function () {
  // 分數顯示邏輯
  const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
  let total = 0;
  if (scores.length > 0) {
    total = scores.reduce((a, b) => a + b, 0);
  }
  // 分數區間對應結果
  // 8～11: result-1, 12～17: result-2, 18～23: result-3, 24～28: result-4, 29～32: result-5
  let resultIdx = 0; // 預設 result-1
  if (total >= 8 && total <= 11) resultIdx = 0; // result-1
  else if (total >= 12 && total <= 17) resultIdx = 1; // result-2
  else if (total >= 18 && total <= 23) resultIdx = 2; // result-3
  else if (total >= 24 && total <= 28) resultIdx = 3; // result-4
  else if (total >= 29 && total <= 32) resultIdx = 4; // result-5

  const resultBlocks = document.querySelectorAll('.content > div[class^="result-"]');
  resultBlocks.forEach((block, i) => {
    block.style.display = i === resultIdx ? 'flex' : 'none';
  });

  // Facebook 分享功能
  const fbBtns = document.querySelectorAll('.btn-fb');
  fbBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // 找到最近的 result 區塊
      let resultBlock = btn.closest('[class^="result-"]');
      if (!resultBlock) return;
      // 找到圖片連結
      let img = resultBlock.querySelector('.shareBtn-item.btn-yellow[href$=".png"]');
      let imgUrl = img ? (img.getAttribute('href') || '') : '';
      if (!imgUrl) return;
      // Facebook 分享連結
      let fbShareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.origin + imgUrl);
      window.open(fbShareUrl, '_blank', 'width=600,height=400');
    });
  });
});
