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
  // 對應每個結果的分享圖片
  const shareImages = [
    'images/share-result1.png',
    'images/share-result2.png',
    'images/share-result3.png',
    'images/share-result4.png',
    'images/share-result5.png',
  ];
  const shareText = encodeURIComponent('趕快來玩心理測驗');
  const shareLink = '';
  fbBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // 直接用 resultIdx 對應圖片
      let imgUrl = window.location.origin + '/' + shareImages[resultIdx];
      // Facebook 分享連結，帶入圖片與文字，連結為空
      let fbShareUrl =
        'https://www.facebook.com/sharer/sharer.php?u=' +
        encodeURIComponent(shareLink) +
        '&quote=' + shareText +
        '&picture=' + encodeURIComponent(imgUrl);
      window.open(fbShareUrl, '_blank', 'width=600,height=400');
    });
  });
});
