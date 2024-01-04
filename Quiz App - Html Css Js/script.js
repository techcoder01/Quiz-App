const startButton = document.querySelector('.start-btn');
const nextButton = document.querySelector('.next-btn');

const questionBox = document.querySelector('#question-box')
const theQuestion = document.querySelector('#question')
const answerBox = document.querySelector('#answer-box')

startButton.addEventListener('click' , startGame)

nextButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

let shuffledQuestion , currentQuestionIndex;

function startGame(){
    console.log("Started")
    startButton.classList.add('hide');
    shuffledQuestion = questions.sort(() => Math.random - .5)
    currentQuestionIndex = 0;
    questionBox.classList.remove('hide');
    setNextQuestion();
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while(answerBox.firstChild){ 
        answerBox.removeChild(answerBox.firstChild);
     }
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestion[currentQuestionIndex]);
}

function showQuestion(question){
    theQuestion.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerBox.appendChild(button)
        });
}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerBox.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    });
    if (shuffledQuestion.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide');
    }else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct) element.classList.add('correct');
    else element.classList.add('wrong')
}

function clearStatusClass(element){
     element.classList.remove('correct')
     element.classList.remove('wrong')
}

const questions = [
    {
        question: "What is 2 + 2",
        answers: [
            { text : '4', correct: true},
            { text : '22', correct: false}
        ]
    },
    {
        question: "What is 2 + 2 Beta",
        answers: [
            { text : '4', correct: true},
            { text : '22', correct: false}
        ]
    }
]