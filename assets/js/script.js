// Note: need to modify below code appropriately

// HTML element variables
var timerEl = document.getElementById("timer");
var secondsEl = document.getElementById("seconds");
var introEl = document.getElementById("intro");
var mainQuizEl = document.getElementById("main-quiz");
var questionEl = document.getElementById("question");
var solution1El = document.getElementById("solution1");
var solution2El = document.getElementById("solution2");
var solution3El = document.getElementById("solution3");
var solution4El = document.getElementById("solution4");
var correctIncorrectEl = document.getElementById("correct-incorrect");
var userScoreEl = document.getElementById("user-score");
var userInitialsEl = document.getElementById("user-initials");
var submissionEl = document.getElementById("submission");
var highscoresEl = document.getElementById("highscores");
var listScoresEl = document.getElementById("list-scores");
var buttonStart = document.getElementById("button-start");
var buttonHighscores = document.getElementById("button-highscores");
var buttonSubmit = document.getElementById("button-submit");
var buttonHome = document.getElementById("button-home");
var buttonHome2 = document.getElementById("button-home-2");
var buttonClear = document.getElementById("button-clear");

// Section out questions and associated variables
var questionIndex = 0;
var questions = [
    {
        question: "Which of the below is NOT a commonly used data type?",
        choices: {
            a: "Strings",
            b: "Booleans",
            c: "Alerts",
            d: "Numbers"
        },
        correctSolution: "Alerts"
    },

    {
        question: "What is the condition in an if/else statement enclosed within?",
        choices: {
            a: "Quotes",
            b: "Curly brackets",
            c: "Parentheses",
            d: "Square brackets"
        },
        correctSolution: "Parentheses"
    },

    {
        question: "What do arrays store in Javascript?",
        choices: {
            a: "Numbers and strings",
            b: "Other arrays",
            c: "Booleans",
            d: "All of the above"
        },
        correctSolution: "All of the above"
    },

    {
        question: "What is a string enclosed with when being assigned to a variable?",
        choices: {
            a: "Commas",
            b: "Curly brackets",
            c: "Quotes",
            d: "Parentheses"
        },
        correctSolution: "Quotes"
    },
    
    {
        question: "Which of the following is a useful debugging tool used during development?",
        choices: {
            a: "Javascript",
            b: "Terminal/Bash",
            c: "For loops",
            d: "Console.log"
        },
        correctSolution: "Console.log"
    }
];
// Section out user choice and solution variables
var userChoice;
var correctSolution;

// Section out timer variables
var time;
var secondsRemaining;

// Section out variables in relation to user score + highscores
var userScore;
var userInitials;
var userScoreInitials;
var highscores = [];
var sortedHighscores = [];



// Event trigger to begin quiz when start button is clicked by user
buttonStart.addEventListener('click', beginQuiz)

// Trigger timer to start when quiz starts and have questions asked to user
function beginQuiz() {
    timerEl.setAttribute("style", "display:block");
    mainQuizEl.setAttribute("style", "display:block");
    introEl.setAttribute("style", "display:none");
    beginTimer();
    askQuestion();
    awaitResponse();
}



// Start timer and end quiz if timer runs out 
// Function for timer countdown and stopping quiz if timer runs out. Don't go to negative seconds
function beginTimer() {
    secondsRemaining = 90;
    time = setInterval(function() {
        secondsRemaining--;
        secondsEl.textContent = secondsRemaining;

        if (secondsRemaining === 0) {
            clearInterval(time);
            displayScore();
        }
    }, 1000);
  }

// Runs through quiz questions
function askQuestion() {
    questionEl.textContent = questions[questionIndex].question;
    solution1El.textContent = questions[questionIndex].choices.a;
    solution2El.textContent = questions[questionIndex].choices.b;
    solution3El.textContent = questions[questionIndex].choices.c;
    solution4El.textContent = questions[questionIndex].choices.d;
    correctSolution = questions[questionIndex].correctSolution;
}

// When user selects an answer, check if their answer is correct
function awaitResponse() {
    var choices = [solution1El, solution2El, solution3El, solution4El];
    choices.forEach(answer => answer.addEventListener('click',checkAnswer));
}

// Check if user's answer is correct
function checkAnswer(event) {
    correctIncorrectEl.textContent = "";

    userChoice = event.target.innerHTML;

    if (userChoice === correctSolution) {
        correctIncorrectEl.textContent = "Correct!";
    } else {
        correctIncorrectEl.textContent = "Wrong!";
        secondsRemaining = secondsRemaining - 10;
    }

    questionIndex++;
    endQuiz();
}

// Function for exiting out of quiz
function endQuiz() {
    if (questionIndex < questions.length) {
        askQuestion();
    } else {
        correctIncorrectEl.textContent = "";
        clearInterval(time);
        displayScore();
    }
}



// Displays user's score
function displayScore() {
    submissionEl.setAttribute("style", "display:block");
    mainQuizEl.setAttribute("style", "display:none");
    timerEl.setAttribute("style", "display:none");

    userScore = secondsRemaining;
    userScoreEl.textContent = userScore;
}

// Allow for user to save score to highscores
buttonSubmit.addEventListener('click', function(event) {
    event.preventDefault();
    nameScore();
    displaySortedHighscores();
})

// Take user initials for label on highscore
function nameScore() {
    userInitials = userInitialsEl.value;

    if (userInitials === "") {
        return;
    } else {
        userScoreInitials = userScore + " - " + userInitials;
        sortScore();
        saveSortedScores();
    };

}

// Add user's score to sorted list of high scores
function sortScore() {
    var storedScores = JSON.parse(localStorage.getItem("sortedHighscores"));

    if (storedScores === null) {
        sortedHighscores = [userScoreInitials];
    } else {
        highscores = storedScores;
        highscores.push(userScoreInitials);
        sortedHighscores = highscores.sort().reverse();
    }

    userInitialsEl.value = "";
}

// Function for storing high scores to local storage
function saveSortedScores() {
    localStorage.setItem("sortedHighscores", JSON.stringify(sortedHighscores));
}

// Function for showing list of high scores
function displaySortedHighscores() {
    highscoresEl.setAttribute("style", "display:block");
    introEl.setAttribute("style", "display:none");
    timerEl.setAttribute("style", "display:none");
    submissionEl.setAttribute("style", "display:none");

    var storedScores = JSON.parse(localStorage.getItem("sortedHighscores"));

    listScoresEl.innerHTML = "";

    if (storedScores !== null) {
        sortedHighscores = storedScores;
      }
      else {
        listScoresEl.innerHTML = "No scores yet. Be the first!";
      }

    for (var i = 0; i < sortedHighscores.length; i++) {
        var score = sortedHighscores[i];
        var li = document.createElement("li");
        li.textContent = score;
        listScoresEl.appendChild(li);
    }
}

// Display scores when check highscores button is clicked
buttonHighscores.addEventListener('click', displaySortedHighscores);

// Clear list of highscores
buttonClear.addEventListener('click', function() {
    listScoresEl.innerHTML = "No scores yet. Be the first!";
    highscores = "";
    sortedHighscores = "";
    localStorage.clear();
})

// Restarting quiz
buttonHome.addEventListener('click', restartQuiz)

buttonHome2.addEventListener('click', restartQuiz)

function restartQuiz() {
    introEl.setAttribute("style", "display:block");
    submissionEl.setAttribute("style", "display:none");
    highscoresEl.setAttribute("style", "display:none");
    questionIndex = 0;
}