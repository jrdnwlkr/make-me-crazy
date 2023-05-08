var instructions = document.querySelector("#instructions");
var questionIndex = 0;
var secondsLeft = 30;
var questionEl = document.querySelector("#question-container");
var startBtn = document.querySelector("#start");
var saveBtn = document.querySelector("#saveBtn");
var timerEl = document.querySelector("#timer");
var initialsForm = document.querySelector("#initials-container");
var score = '';
var timerInterval;
var userInitials;
var table = document.getElementById("resultsTable");
var questions = [
    {
        "question": "What does HTML stand for?",
        "options": ["A. Hyper Test Marker Language", 
        "B. Honor Test Markup Lingo", 
        "C. Hyper Text Markup Language", 
        "D. Hyper Text Minor List"],
        "answer":  2,
    },
    {
        "question": "What file extension is used for a javascript file?",
        "options": ["A. .js", 
        "B. .html", 
        "C.file", 
        "D..css"],
        "answer":  0,
    },
    {
        "question": "What git command used to move from one file to another?",
        "options": ["A. git file", 
        "B. cd", 
        "C. ls", 
        "D.git move"],
        "answer":  1,
    },
    
]

// WHEN I click the start button
// THEN a timer starts and I am presented with a question

startBtn.addEventListener("click", startGame)

function startGame() {
    instructions.classList.add("hide")
    questionEl.classList.remove("hide")
    timerEl.classList.remove("hide")
    showCurrentQuestion()
    setTime();
}

function showCurrentQuestion() {
    var currentQuestion = questions[questionIndex];
    console.log("currentQuestion", currentQuestion)
    var optionsHTML = ``;

    for (var i = 0; i< currentQuestion.options.length; i++) {
        var answer = currentQuestion.options[i];
        optionsHTML += `<a class="btn btn-primary w-100 mb-2 text-start" data-index="${i}">${answer}</a>`
    }

    optionsHTML = `
    <div class="card shadow">
    <div class="card-body">
    <p class="card-text">${currentQuestion.question}?</p>
    ${optionsHTML}
    </div>
    </div>   
    `
    console.log(optionsHTML, questionEl)
        
    questionEl.innerHTML = optionsHTML
}

// WHEN I answer a question
// THEN I am presented with another question

function checkAnswer(answer) {
    var currentQuestion = questions[questionIndex];
    console.log(currentQuestion.answer,answer);
    if(currentQuestion.answer == answer) {
        console.log("Correct!");
        // score = score + 1
        score ++;
        console.log(score)
    } else {
        console.log("Wrong!")

        // WHEN I answer a question incorrectly
        // THEN time is subtracted from the clock

        secondsLeft -= 5;
    }

    if(questionIndex + 1 < questions.length) {
        showNextQuestion();
    } else {
        endGame();
    }

    return score
}

questionEl.addEventListener("click", function(event) {
    console.log("answerClick")
    if (event.target.matches("a")) {
        var answerIndex = event.target.getAttribute("data-index")
        console.log(event.target,answerIndex)

        checkAnswer(answerIndex)
    }
})

function showNextQuestion() {
    questionIndex++;

    showCurrentQuestion();
}



function setTime() {
    // Sets interval in variable
    timerInterval = setInterval(function() {
      secondsLeft--;
  
      if(secondsLeft <= 0) {
        // Stops execution of action at set interval
        endGame()
        return;
      }
  
      timerEl.textContent = secondsLeft;
  
    }, 1000);
  }

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over

function endGame() {
    clearInterval(timerInterval);
    timerEl.classList.add("hide");
    instructions.classList.remove("hide")
    initialsForm.classList.remove("hide")
    questionEl.classList.add('hide')

    instructions.innerHTML = `<p>Your score is ${score}!</p>`;
}

// WHEN the game is over
// THEN I can save my initials and my score*/

function saveScore(event) {
    // event.preventDefault();
    userInitials = document.getElementById("userInitials").value;
    if (userInitials) {

    newWinner = {
        "User": userInitials,
        "Score": score
    }

    console.log(newWinner)

    var storedScores = JSON.parse(localStorage.getItem("storedScores"))
    if  (storedScores) {
        storedScores.push(newWinner)
        localStorage.setItem("storedScores", JSON.stringify(storedScores))
    } else {
        storedScores = []
        storedScores.push(newWinner)
        console.log("line186", storedScores)
        localStorage.setItem("storedScores", JSON.stringify(storedScores))
    }
    renderScores()
}
}

var storedScores = []

function renderScores() {
    storedScores = JSON.parse(localStorage.getItem("storedScores"))
    
    var scoreHTML = "";

    for (let i = 0; i < storedScores.length; i++) {
        const {User, Score} = storedScores[i];
        scoreHTML += `  
        <tr>
        <td>${User}</td>
        <td>${Score}</td>
        </tr>`
    }

    table.innerHTML = scoreHTML;
} 



saveBtn.addEventListener("click", saveScore()) 

