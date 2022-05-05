const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
        question: "What companion was known as the 'impossible girl?",
        choice1: "Amy Pond",
        choice2: "Clara Oswald",
        choice3: "Rose Tyler",
        choice4: "Donna Noble",
        answer: 2
    },
    {
        question: "What is River Song's cell number at the Stormcage 1 facility?",
        choice1: "426",
        choice2: "352",
        choice3: "",
        choice4: "",
        answer: 1
    },
    {
        question: "Which century was the second Doctor's commpanion Jamie McCrimmon from?",
        choice1: "17th",
        choice2: "18th",
        choice3: "19th",
        choice4: "21st",
        answer: 2
    },
    {
        question: "Which companion travelled with the Doctor for the most individual episodes?",
        choice1: "Tegan",
        choice2: "Jo",
        choice3: "Sarah-Jane",
        choice4: "Jamie",
        answer: 4
    },
    {
        question: "Who was the first companion to be 'expelled' from the TARDIS for bad behaviour?",
        choice1: "Tegan",
        choice2: "Adam",
        choice3: "Zoe",
        choice4: "Turlough",
        answer: 2
    },
    {
        question: "Which companion worked as an air hostess?",
        choice1: "Adric",
        choice2: "Ace",
        choice3: "Tegan",
        choice4: "Leela",
        answer: 3
    },
    {
        question: "What is the name of the council estate that Rose Tyler lived on?",
        choice1: "Archer estate",
        choice2: "Greene estate",
        choice3: "Powell estate",
        choice4: "Southwark estate",
        answer: 3
    },
    {
        question: "Which classic story features the first death of a companion in the show's history?",
        choice1: "The Daleks' Masterplan",
        choice2: "The Revenge of the Cybermen",
        choice3: "Earthshock",
        choice4: "The power of the Daleks",
        answer: 1
    },
    {
        question: "Which companion first joined the TARDIS crew as part of a plot to assassinate the Doctor?",
        choice1: "Leela",
        choice2: "Vislor Turlough",
        choice3: "Captain Jack Harkness",
        choice4: "Romana",
        answer: 2
    },
    {
        question: "How many siblings does Martha Jones have?",
        choice1: "0",
        choice2: "1",
        choice3: "2",
        choice4: "3",
        answer: 3
    },
    {
        question: "Which episode showed the first departure of a companion from the TARDIS",
        choice1: "The Web of Fear",
        choice2: "The Chase",
        choice3: "The Daleks' Masterplan",
        choice4: "The Dalek Invasion of Earth",
        answer: 4
    },
    {
        question: "Which companion was forced to have their memories of the Doctor erased forever?",
        choice1: "Donna Noble",
        choice2: "Claara Oswald",
        choice3: "Amy Pond",
        choice4: "Captain Jack Harkness",
        answer: 2
    },
    {
        question: "What was the first story to feature the doctor without a companion?",
        choice1: "The Next Doctor",
        choice2: "Heaven Sent",
        choice3: "City of Death",
        choice4: "The Deadly Assassin",
        answer: 4
    },
    {
        question: "What were the first companions to witness the Doctor regenerating?",
        choice1: "Benn Jackson and Polly Wright",
        choice2: "Jamie McCrimmon and Zoe Heriot",
        choice3: "Ian Chesserton",
        choice4: "Sarah-Jane Smith and Harry Sullivan",
        answer: 1
    },
    {
        question: "Which companion was converted into a Cyberman?",
        choice1: "Clara Oswald",
        choice2: "Martha Jones",
        choice3: "Bill Potts",
        choice4: "Rory Williams",
        answer: 3
    }

]

//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (questionCounter == MAX_QUESTIONS || availableQuestions.length == 0) {
        localStorage.setItem('mostRecentScore', score);
        //go to end page
        return window.location.assign('end.html')
    };


    questionCounter++;
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTIONS;
    //update progress bar
    progressBarFull.style.width = (questionCounter / MAX_QUESTIONS) * 100 + "%";
    console.log(progressBarFull.style.width);

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);

            getNewQuestion();
        }, 1000)


    });
});
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();