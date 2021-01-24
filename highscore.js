const highScoreList = document.getElementById('highScoresList');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log('highScoreList', highScoreList);

if (highScores.length > 0) {
	highScoreList.innerHTML = highScores
		.map((score) => {
			return `<li class="high-score">${score.name}-${score.score} - ${score.difficulty}</li>`;
		})
		.join('');
} else {
	highScoreList.innerHTML = '<li class="high-score">No highscore</li>';
}
