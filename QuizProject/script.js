const questions = [
    {
        question : "Who won the ICC Cricket World Cup in 2019?",
        answers : [
            {text : "Austrailia", correct:false},
            {text : "India", correct:false},
            {text : "England", correct:true},
            {text : "New Zealand", correct:false},
        ]
    },
    {
        question : "Who has scored most runs in the international Cricket?",
        answers : [
            {text : "Ricky Pointing", correct:false},
            {text : "Daniel Vitori", correct:false},
            {text : "Sachin Tendulkar", correct:true},
            {text : "Virat Kohli", correct:false},
        ]
    },
    {
        
        question : "What is the term used when batsman gets out without scoring any run?",
        answers : [
            {text : "Duck", correct:true},
            {text : "Eagle", correct:false},
            {text : "Goose", correct:false},
            {text : "Parrot", correct:false},
        ]
    },
    {
        
        question : "What is the nickname of AB de Villers?",
        answers : [
            {text : "The Wall", correct:false},
            {text : "Boom Boom", correct:false},
            {text : "Mr.360", correct:true},
            {text : "Hitman", correct:false},
        ]
    },
    {
        question : "What does LBW stands for?",
        answers : [
            {text : "Leg Ball Wide", correct:false},
            {text : "Leg Before Wicket", correct:true},
            {text : "Long Boundary Win", correct:false},
            {text : "Left Batting Way", correct:false},
        ]
    },
    {
        question : "What is the name of the trophy awarded in Ashes Series?",
        answers : [
            {text : "The Urn", correct:true},
            {text : "The Cup", correct:false},
            {text : "The Bat", correct:false},
            {text : "The Globe", correct:false},
        ]
    },
    {
        question : "Which team has won the most ICC Cricket World Cups (ODI)?",
        answers : [
            {text : "Australia", correct:true},
            {text : "West Indies", correct:false},
            {text : "India", correct:false},
            {text : "England", correct:false},
        ]
    },
    {
        question : "Who holds the record for the fastest century in ODIs?",
        answers : [
            {text : "Virat Kohli", correct:false},
            {text : "AB de Villers", correct:true},
            {text : "Corey Anderson", correct:false},
            {text : "Glenn Maxwell", correct:false},
        ]
    },
    {
        question : "What’s the maximum number of runs scored in one legal delivery (without overthrows)?",
        answers : [
            {text : "5", correct:false},
            {text : "6", correct:true},
            {text : "4", correct:false},
            {text : "2", correct:false},
        ]
    },
    {
        question : " Who was the first captain to win all ICC trophies (T20, ODI World Cup, Champions Trophy)?",
        answers : [
            {text : "Virat Kohli", correct:false},
            {text : "MS Dhoni", correct:true},
            {text : "Eoin Moran", correct:false},
            {text : "Jason Holder", correct:false},
        ]
    }
];
const questionElement = document.getElementById("questions");
const answerbutton = document.getElementById("answers-btn");
const nextbtn = document.getElementById("next-btn");

/* after starting the quiz the question number & quiz will be changing*/

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;  //this will hold true or false 
        }
        button.addEventListener("click",selectAnswer);
    });
}

// This function will remove the previous answers 
function resetState(){
    nextbtn.style.display = "none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectAnswer(e){
    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.correct === "true";
    if(isCorrect){
        selectbtn.classList.add("correct");
        score++;
    }else{
        selectbtn.classList.add("Incorrect");
    }
    Array.from(answerbutton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextbtn.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You Score ${score} out of ${questions.length}!`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextbtn.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();