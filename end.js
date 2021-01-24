const username = document.getElementById('username');
const saveBtn = document.getElementById('save-score');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const difficulty = localStorage.getItem('difficulty');
const finalScore = document.getElementById('final-score');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGH_SCORES = 5;
finalScore.innerHTML = mostRecentScore;

const saveScore = (e) => {
	e.preventDefault();
	const score = {
		score: mostRecentScore,
		name: username.value,
		difficulty: difficulty,
	};
	console.log(score);
	highScores.push(score);
	highScores.sort((a, b) => b.score - a.score);
	highScores.splice(5);
	localStorage.setItem('highScores', JSON.stringify(highScores));
};

username.addEventListener('keyup', () => {
	console.log(username.value);
	saveBtn.disabled = !username.value;
});

saveBtn.addEventListener('click', (e) => {
	console.log(e.target.value);
	saveScore(e);
});
