const username = document.getElementById("username");
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');

finalScore.innerText = mostRecentScore;

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

const highScoresList = document.getElementById("highScoresList");


username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("clicked the save button");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score)
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('quiz.html')

}

highScoresList.innerHTML = highScores.map(score => {
    return '<li class="high-score">' + score.name + '-' + score.score + '</li>';
})