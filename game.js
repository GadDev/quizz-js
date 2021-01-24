const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('text'));
const questionCounterText = document.getElementById('counter');
const progressBar = document.getElementById('progressbar-full');
const scoreText = document.getElementById('score');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const difficultyGame = urlParams.get('difficulty') || 'easy';

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 20;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
fetch(
	`https://opentdb.com/api.php?amount=${MAX_QUESTIONS}&category=9&difficulty=${difficultyGame}&type=multiple`
)
	.then(async (res) => {
		const response = await res.json();
		questions = response.results.map((loadedQuestion) => {
			const formattedQuestion = {
				question: loadedQuestion.question,
			};
			const answerChoices = [...loadedQuestion.incorrect_answers];
			formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
			answerChoices.splice(
				formattedQuestion.answer - 1,
				0,
				loadedQuestion.correct_answer
			);
			answerChoices.forEach((choice, index) => {
				formattedQuestion['choice' + (index + 1)] = choice;
			});
			return formattedQuestion;
		});
		loader.classList.add('hidden');
		game.classList.remove('hidden');
		startGame();
	})
	.catch((err) => {
		console.log(err);
	});

const startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
};

const getNewQuestion = () => {
	// get a random question based on the max question available
	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
		localStorage.setItem('mostRecentScore', score);
		localStorage.setItem('difficulty', difficultyGame);
		return window.location.assign('./end-game.html');
	}
	questionCounter++;
	questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
	progressBar.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
	currentQuestion = availableQuestions[questionIndex];
	// fill question in element
	question.innerHTML = currentQuestion.question;
	// fill choices in elements
	choices.forEach((choice) => {
		const number = choice.dataset['number'];
		choice.innerHTML = currentQuestion[`choice${number}`];
	});
	//remove questions from the available ones
	availableQuestions.splice(questionIndex, 1);
	acceptingAnswers = true;
};

//adding click event on choices
choices.forEach((choice) => {
	choice.addEventListener('click', (e) => {
		if (!acceptingAnswers) return;
		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];
		const classAnswer =
			selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
		if (classAnswer === 'correct') {
			incrementScore(CORRECT_BONUS);
		}
		selectedChoice.parentElement.classList.add(classAnswer);
		// adding a delay for removing the class and move to the new question
		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classAnswer);
			getNewQuestion();
		}, 1000);
	});
});

const incrementScore = (numPoints) => {
	score += numPoints;
	scoreText.innerText = score;
};

// startGame();
