const quizData = [
  {
    question: 'What is the capital of Palestine?',
    options: ['Jerusalem', 'Rafah', 'Gaza', 'Ramallah'],
    answer: 'Jerusalem',
    image:'backjerulasem.jpeg',
    flag: 'flagpalestine.png',
  },
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris',
    image:'backfrance.jpg',
    flag: 'flagfrance.jpeg',
  },
  {
    question: 'What is the capital of Morocco?',
    options: ['Casablanca', 'Rabat', 'Tanger', 'Laayoune'],
    answer: 'Rabat',
    image: 'backmorocco.jpg',
    flag: 'flagmorocco.jpeg',
  },
  {
    question: 'What is the capital of USA?',
    options: ['Washington', 'Seattle', 'New York', 'Chicago'],
    answer: 'Washington',
    image: 'backusa.jpg',
    flag: 'flagusa.jpeg',
  },
  {
    question: 'What is the capital of Swiss?',
    options: ['Bern', 'Chur', 'Geneva', 'Lausanne'],
    answer: 'Bern',
    image: 'backswiss.jpg',
    flag: 'flagswiss.jpeg',
  },
  {
    question: 'What is the capital of Jordan?',
    options: [
      'Amman',
      'Zarqa',
      'Russeifa',
      'Aqaba',
    ],
    answer: 'Amman',
    image: 'backjordan.jpg',
    flag: 'flagjordan.jpeg',
  },
];
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(quizData);

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const flagContainer = document.createElement('div');
  flagContainer.className = 'flag';

  const flagImage = document.createElement('img');
  flagImage.src = questionData.flag;
  flagImage.alt = '';
  flagContainer.appendChild(flagImage);

  document.body.style.backgroundImage = `linear-gradient(to left, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url('${questionData.image}')`;

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('div');
    option.className = 'option';

    const button = document.createElement('button');
    button.className = 'option-button';
    button.textContent = shuffledOptions[i];
    button.addEventListener('click', handleOptionClick);
    option.appendChild(button);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
  quizContainer.appendChild(flagContainer);
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const flagContainer = document.createElement('div');
  flagContainer.className = 'flag';

  document.body.style.backgroundImage = `linear-gradient(to left, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),url('${questionData.image}')`;

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('div');
    option.className = 'option';

    const button = document.createElement('button');
    button.className = 'option-button';
    button.textContent = shuffledOptions[i];
    const flagbutton = document.querySelector('.flag-btn');
    flagbutton.style.backgroundImage = `linear-gradient(to left, rgba(0,0,0,0.1), rgba(0,0,0,0.5)),url(${questionData.flag})`; 
    flagbutton.addEventListener('mouseover', () => {
      flagbutton.classList.add('hover');
    });
    flagbutton.addEventListener('mouseout', () => {
      flagbutton.classList.remove('hover');
    });
    button.addEventListener('click', handleOptionClick);
    option.appendChild(button);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
  quizContainer.appendChild(flagContainer);
}

let selectedOption = null; 

function handleOptionClick(event) {
  const clickedButton = event.target;

  if (selectedOption) {
    selectedOption.classList.remove('selected');
  }

  clickedButton.classList.add('selected');

  selectedOption = clickedButton;
}

function checkAnswer() {
  if (selectedOption) {
    const answer = selectedOption.textContent;
    if (answer === quizData[currentQuestion].answer) {
      score++;
      document.body.style.backgroundColor = 'green';
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
      document.body.style.backgroundColor = 'red'; 
    }
    currentQuestion++;
    selectedOption.classList.remove('selected'); 
    selectedOption = null; 

    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}


function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  const picimage = document.createElement('div');
  picimage.className = 'picimage';

  let resultImage;
  if (score >= 4) {
    resultImage = 'congrats.gif';
  } else {
    resultImage = 'unsuccessful.webp';
  }

  picimage.innerHTML = `
    <div class="result-image">
      <img src="${resultImage}" alt="Result Image">
    </div>
    <p>You scored ${score} out of ${quizData.length}!</p>
  `;
  resultContainer.appendChild(picimage);

}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();







