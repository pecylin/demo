document.addEventListener('DOMContentLoaded', function () {
	const questionBlocks = document.querySelectorAll('.content > .flex.alignCenter');
	const totalQuestions = questionBlocks.length;
	let current = 0;
	let answers = [];
	let scores = [];

	// 分數對照表，依題目順序，每題四個選項（A~D）
	const scoreTable = [
		// Q1
		[1, 2, 3, 4],
		// Q2
		[4, 3, 2, 1],
		// Q3
		[2, 4, 1, 3],
		// Q4
		[3, 1, 4, 2],
		// Q5
		[1, 4, 3, 2],
		// Q6
		[1, 3, 2, 4],
		// Q7
		[2, 3, 4, 1],
		// Q8
		[2, 1, 3, 4],
	];

	function showQuestion(idx) {
		questionBlocks.forEach((block, i) => {
			block.style.display = i === idx ? 'flex' : 'none';
		});
	}

	function handleAnswer(e) {
		if (!e.target.classList.contains('btn')) return;
		const li = e.target.closest('li');
		if (!li) return;
		// 取得選項索引（A=0, B=1, C=2, D=3）
		const optionIdx = Array.from(li.parentNode.children).indexOf(li);
		// 記錄分數
		scores[current] = scoreTable[current][optionIdx];
		// 也可記錄答案文字
		answers[current] = e.target.textContent.trim();
		if (current < totalQuestions - 1) {
			current++;
			showQuestion(current);
		} else {
			// 測驗結束，將分數與答案存到 localStorage 並跳轉
			localStorage.setItem('quizAnswers', JSON.stringify(answers));
			localStorage.setItem('quizScores', JSON.stringify(scores));
			window.location.href = 'result.html';
		}
	}

	// 綁定所有題目的選項
	questionBlocks.forEach(block => {
		block.addEventListener('click', handleAnswer);
	});

	// 初始化顯示第一題
	showQuestion(0);
});
