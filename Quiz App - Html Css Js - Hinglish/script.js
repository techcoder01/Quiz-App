const startKaButton = document.querySelector('#start-btn')
 const nextKaButton = document.querySelector('#next-btn')

const questionBox = document.querySelector('#question-box');
const answerBoxes = document.querySelector('#answer-boxes')
const theQuestion = document.querySelector('#question');


let questionKoMilado , questionKaIndex; // undifined;

// Start ke button per click hone par gameStartKaro
startKaButton.addEventListener('click', gameStartKaro);

function gameStartKaro() {
    console.log("Game Started");

    // StartkaButton ko Gayab kardo
    startKaButton.classList.add('hide');

    // Questions ko Milado - Shuffle Kardo , use Sort Karke Math.random se
    questionKoMilado = questions.sort(() =>  Math.random - 0.5 )

    // Questions ko kahi se start toh karo , us ka index shuru mai zero kardo
    questionKaIndex = 0

    // Question box ko ab show karo
    questionBox.classList.remove('hide')

    // Ab Next Question karo
    nextQuestionKarna()

}

function nextQuestionKarna(){
    // har Next Function se Pehle reset kardo
    resetKardo();

    // nextQuestion ko shuru karne se pehle use shuffle karke show karana
    questionSetKaro(questionKoMilado[questionKaIndex]);
}


function resetKardo(){
    answerKaColorsHatado(document.body)
    // next wala button hide karo sab se pehle
    nextKaButton.classList.add('hide');

    // ab answerBoxes mai pehle waale answer ko remove karo , new Answers ko show karo
    while (answerBoxes.firstChild){
        answerBoxes.removeChild(answerBoxes.firstChild);
    }
}


function questionSetKaro(questions) {
    // Apne Question mai Question ki value dedena;
    theQuestion.innerText = questions.question;

    // Question ke Answer ko sort karo
    const answerKoMilado = questions.answers.sort(() => Math.random() - 0.5);

    answerKoMilado.forEach(answer => {
        // New Answer ke liye Button Banao , unmai values do
        const newAnswer = document.createElement('button');
        newAnswer.innerText = answer.text;
        newAnswer.classList.add('btn'); // styling ke lie new Button ki
        
        // Dataset mai check karo, Konsa Answer Correct hai
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct;
        }

        // newAnswer per click karna per Answer Select Karna
        newAnswer.addEventListener('click', answerSelectKarna);

        // Answer Boxes mai new answer milado ;
        answerBoxes.appendChild(newAnswer);
    });
}


function answerSelectKarna(merekoKaro){
    // Jisko Click kare us ko Target Banayya
    const selectedAnswer = merekoKaro.target;

    // Correct , Target hone waale ko dataset.correct bolo
    const correct = selectedAnswer.dataset.correct;

    // Answer Ka Status mai correct check karne ke liye
    answerKaStatus(document.body, correct);

    // Array mai saare Boxes ke answers ko answer mai search karo konsa correct hai
    Array.from(answerBoxes.children).forEach(answer => {
        answerKaStatus(answer, answer.dataset.correct)
    })

    // Agar question zyada howe toh next ka button dikhana nahi toh Restart dikhana
    if (questionKoMilado.length > questionKaIndex + 1) {
        nextKaButton.classList.remove('hide');
    } else {
        startKaButton.innerText = "Restart";
        startKaButton.classList.remove('hide');
        setTimeout(() => {
        questionBox.classList.add('hide');
        }, 1000);
    }

}

// Next ka button Dekhe toh click karne par naya question kardena aur question ko change karna
nextKaButton.addEventListener('click' , () => {
    questionKaIndex++
    nextQuestionKarna();
})

// Answer ka Status , mai jo newAnswer jo add kiya hai , agar correct ho toh green , wrong ho toh red class add hon

function answerKaStatus(newAnswer, correct){
    answerKaColorsHatado(newAnswer);
    if(correct){
        newAnswer.classList.add('correct');
    }
    else {
        newAnswer.classList.add('wrong');
    }    
}

// Colors ko bhi Hatao ge har New Answer ke status ke Baaf
function answerKaColorsHatado(newAnswer){
    newAnswer.classList.remove('correct')
    newAnswer.classList.remove('wrong')
}


const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Rome", correct: false },
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "Charles Dickens", correct: false },
            { text: "Mark Twain", correct: false },
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false },
            { text: "Venus", correct: false },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "In which year did the Titanic sink?",
        answers: [
            { text: "1912", correct: true },
            { text: "1905", correct: false },
            { text: "1921", correct: false },
            { text: "1933", correct: false },
        ]
    },
];

const obj = { a: 1, b:{ c:2}, d: [3,4,5]};
const cloneObj = {...obj};
cloneObj.b.c = 10;
console.log(obj.b.c)