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
    window.location.href = 'index';
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

  // 動態設定 og meta
  const ogMetaData = [
    {
      url: window.location.origin + '/result#result1',
      type: 'website',
      title: '辦公室佛系擺渡人｜這不是劇，是你每天演的戲',
      description: '你不是在上班，是在修行，別人內鬥你念經，升官不重要，渡化同事才是KPI。',
    },
    {
      url: window.location.origin + '/result#result2',
      type: 'website',
      title: '表面無害型笑面虎｜這不是劇，是你每天演的戲',
      description: '外表人畜無害，死亡筆記本一頁不漏，笑著笑著，就把人送進地獄開會了。',
    },
    {
      url: window.location.origin + '/result#result3',
      type: 'website',
      title: '八面玲瓏交際花｜這不是劇，是你每天演的戲',
      description: '你是辦公室裡最亮的星，專業的社交工程師，氣氛組擔當。',
    },
    {
      url: window.location.origin + '/result#result4',
      type: 'website',
      title: '職場心機老狐狸｜這不是劇，是你每天演的戲',
      description: '你總能在風暴來臨前悄悄閃身，看似低調，實則精明，江湖在走心機要有。',
    },
    {
      url: window.location.origin + '/result#result5',
      type: 'website',
      title: '職場攻鬥大Boss｜這不是劇，是你每天演的戲',
      description: '職場不是競賽，是你一手導演的生存法則，沒有人能威脅到你。',
    },
  ];
  const og = ogMetaData[resultIdx];
  function setOgMeta(property, content) {
    let tag = document.querySelector(`meta[property='${property}']`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }
  setOgMeta('og:url', og.url);
  setOgMeta('og:type', og.type);
  setOgMeta('og:title', og.title);
  setOgMeta('og:description', og.description);
});

// 離開 result.html 時清除分數
window.addEventListener('beforeunload', function () {
  localStorage.removeItem('quizScores');
  localStorage.removeItem('quizAnswers');
});
