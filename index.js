const selectDifficulty = document.getElementById('select-difficulty');
const gameBtn = document.getElementById('game-btn');
let valueDifficulty = selectDifficulty.value;

selectDifficulty.addEventListener('change', (e) => {
	valueDifficulty = e.target.value;
});

gameBtn.addEventListener('click', (e) => {
	let href = e.target.getAttribute('href');
	location.href = `${href}?difficulty=${valueDifficulty}`;
	e.preventDefault();
});
