// 讀取 localStorage 的答案，根據答案顯示對應結果

document.addEventListener('DOMContentLoaded', function () {
  // 分數顯示邏輯
  const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
  let total = 0;
  if (scores.length > 0) {
    total = scores.reduce((a, b) => a + b, 0);
  }
  // 如果沒有測驗分數，直接導回首頁
  if (!scores || scores.length === 0) {
    window.location.href = 'index.html';
    return;
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

  const hashArr = ['#result1', '#result2', '#result3', '#result4', '#result5'];
  if (window.location.hash !== hashArr[resultIdx]) {
    history.replaceState(null, '', hashArr[resultIdx]);
  }
});

// 離開 result.html 時清除分數
window.addEventListener('beforeunload', function () {
  localStorage.removeItem('quizScores');
  localStorage.removeItem('quizAnswers');
});
