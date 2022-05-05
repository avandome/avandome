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
        question: "What is the name of the mummy that the Doctor encountered on the Orient Express?",
        choice1: "The Foretold",
        choice2: "The Gorgon",
        choice3: "Tutankhamun",
        choice4: "Hatshepsut",
        answer: 1
    },
    {
        question: "What planet do the Daleks originate from?",
        choice1: "Telos",
        choice2: "Earth",
        choice3: "Skaro",
        choice4: "Clom",
        answer: 3
    },
    {
        question: "What alien race is erased from your memory when you stop looking at them?",
        choice1: "The Family of Blood",
        choice2: "The Silence",
        choice3: "The Daleks",
        choice4: "The Sontarans",
        answer: 2
    },
    {
        question: "What species is the Doctor's friend Madame Vastra?",
        choice1: "Sea Devil",
        choice2: "Cyberman",
        choice3: "Silurian",
        choice4: "Saturnyn",
        answer: 3
    },
    {
        question: "What are the frightening stone angelic creatures known as?",
        choice1: "Cupids",
        choice2: "Weeping Angels",
        choice3: "Hosts",
        choice4: "Saviours",
        answer: 2
    },
    {
        question: "What is the approximate lifespan of the family of blood?",
        choice1: "3 days",
        choice2: "3 weeks",
        choice3: "3 months",
        choice4: "3 years",
        answer: 3
    },
    {
        question: "Which Dalek experimented on its own cells to introduce human elements?",
        choice1: "Dalek Thay",
        choice2: "Dalek Sec",
        choice3: "Dalek Omega",
        choice4: "Dalek Caan",
        answer: 2
    },
    {
        question: "What Earth creatures do the Judoon resemble?",
        choice1: "Rhinoceros",
        choice2: "Cats",
        choice3: "Wasps",
        choice4: "Wolf",
        answer: 1
    },
    {
        question: "Which of these aliens have NOT had at least one emotion removed?",
        choice1: "Cyberman",
        choice2: "Dalek",
        choice3: "Modified Ood",
        choice4: "Jagrafess",
        answer: 4
    },
    {
        question: "Who is the creator of the Daleks?",
        choice1: "Davros",
        choice2: "Kaled",
        choice3: "Voord",
        choice4: "Strax",
        answer: 1
    },
    {
        question: "What species was introduced in 1975 and re-appeared in the show's 50th anniversary special?",
        choice1: "Slitheen",
        choice2: "Jagrafess",
        choice3: "Ood",
        choice4: "Zygons",
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