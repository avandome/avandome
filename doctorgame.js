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
        question: "What was the strange food combination eaten by the 11th doctor ate after his regeneration?",
        choice1: "Prawns and banana",
        choice2: "Fish fingers and custard",
        choice3: "Tuna and avocado",
        choice4: "Salmon and cream",
        answer: 2
    },

    {
        question: "What drink revived the 10th doctor after regenerating?",
        choice1: "Tea",
        choice2: "Coffee",
        choice3: "Gin",
        choice4: "Hot chocolate",
        answer: 1
    },
    {
        question: "Which doctor's first sentence was 'Half an hour ago I was a white haired scotsman!'",
        choice1: "10",
        choice2: "8",
        choice3: "13",
        choice4: "5",
        answer: 3
    },
    {
        question: "Which doctor loved jelly babies",
        choice1: "4",
        choice2: "12",
        choice3: "7",
        choice4: "6",
        answer: 1
    },
    {
        question: "How many regenerations of the doctor appeared in the 50th anniversary episode 'The Day of The Doctor'?",
        choice1: "13",
        choice2: "12",
        choice3: "3",
        choice4: "8",
        answer: 1
    },
    {
        question: "What doctor encountered the TARDIS as a human",
        choice1: "10",
        choice2: "7",
        choice3: "5",
        choice4: "11",
        answer: 4
    },
    {
        question: "What colour were the sixth doctor's shoes?",
        choice1: "red",
        choice2: "blue",
        choice3: "green",
        choice4: "yellow",
        answer: 3
    },
    {
        question: "Which doctor visited his own tomb?",
        choice1: "11",
        choice2: "3",
        choice3: "7",
        choice4: "10",
        answer: 1
    },
    {
        question: "What alias does the doctor often use on Earth when posing as a human?",
        choice1: "John Smith",
        choice2: "John White",
        choice3: "John Miller",
        choice4: "John Brown",
        answer: 1
    },
    {
        question: "What actor played the Seventh Doctor?",
        choice1: "David Tennant",
        choice2: "Sylvester McCoy",
        choice3: "Paul McGann",
        choice4: "Christopher Eccleston",
        answer: 2
    },
    {
        question: "What Planet does the doctor come from?",
        choice1: "Earth",
        choice2: "Tatooine",
        choice3: "Skaro",
        choice4: "Gallifrey",
        answer: 4
    },
    {
        question: "What is the doctor's most important tool?",
        choice1: "Sonic Screwdriver",
        choice2: "Laser Spanner",
        choice3: "Sonic Pliers",
        choice4: "Laser Hammer",
        answer: 1
    },
    {
        question: "Which actor played the first doctor?",
        choice1: "Jon Pertwee",
        choice2: "Patrick Troughton",
        choice3: "Matt Smith",
        choice4: "William Hartnell",
        answer: 4
    },
    {
        question: "Which doctor carries arround a spare hand in a jar?",
        choice1: "13th",
        choice2: "5th",
        choice3: "10th",
        choice4: "2nd",
        answer: 3
    },
    {
        question: "What is the name of the episode in which the first doctor regenerates?",
        choice1: "The Tenth Moon",
        choice2: "The Tenth Day",
        choice3: "The Tenth Planet",
        choice4: "The Tenth Moment",
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