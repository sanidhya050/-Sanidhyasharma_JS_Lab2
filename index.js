//Quiz Application requires ----> questions, score, currQuestIndex
function QuizApplication(questions) {
    this.score = 0;
    this.currQuestIndex = 0;
    this.questions = questions;
}

//QuestionAnswer requires -----> text, options, answer
function QuestionAnswer(text, options, answer) {
    this.text = text;
    this.options = options;
    this.answer = answer;
}

//Array of questions
let questions = [

    new QuestionAnswer(
        "1. JavaScript supports",
        ["Functions", "XHTML", "CSS", "HTML"],
        "Functions"
    ),

    new QuestionAnswer(
        "2. Which language is used for styling web pages?",
        ["HTML", "JQuery", "CSS", "XML"],
        "CSS"
    ),

    new QuestionAnswer(
        "3. Which is not a JavaScript Framework?",
        ["Python Script", "JQuery", "Django", "NodeJS"],
        "Django"
    ),

    new QuestionAnswer(
        "4. Which is used for Connect To Database?",
        ["PHP", "HTML", "JS", "All"],
        "PHP"
    ),

    new QuestionAnswer(
        "5. JavaScript is a ",
        ["Language", "Programming Language", "Development", "All"],
        "Programming Language"
    )

];


//to get current question index
QuizApplication.prototype.getCurrentQuestionIndex = function () {
    return this.questions[this.currQuestIndex];
};


// Create function for checking quiz length
QuizApplication.prototype.isEnded = function () {
    return this.currQuestIndex === this.questions.length;
};


//Function will 3 things
// 1. Validate the answer
// 2. Update the score
// 3. Increment the current index

QuizApplication.prototype.validateAnswerAndUpdateScore = function (btn, choice) {
    let question = this.getCurrentQuestionIndex();
    if (question.answer === choice) {
        this.score++;
        btn.style.background = 'green';
    }
    else {
        btn.style.background = 'red';
    }
    this.currQuestIndex++;

};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let freezeClick = false; // just modify that variable to disable all clicks events

document.addEventListener("click", e => {
    if (freezeClick) {
        e.stopPropagation();
        e.preventDefault();
    }
}, true);


//show progress of quiz
function showProgress() {
    let curQuestNumber = quiz.currQuestIndex + 1;
    let progress = document.getElementById("progress");
    progress.innerHTML = `Question ${curQuestNumber} of ${quiz.questions.length}`;
}

// Handle click event
function handleOptionBtn(btnId, choice) {
    let btn = document.getElementById(btnId);
    btn.style.background = '';
    btn.onclick = async () => {
        freezeClick = true;
        quiz.validateAnswerAndUpdateScore(btn, choice);
        await sleep(1000);
        loadQuestions();
    };
}


// show final score
function showScores() {
    console.log("Scores :-", quiz.score);
    let gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += `<h2 id='score'> Your Scores:- ${quiz.score
        } and mark percentage is :- ${(quiz.score / questions.length).toFixed(2) * 100}% </h1>`;
    document.getElementById("quiz").innerHTML = gameOverHTML;
}

//load the questions on web page
function loadQuestions() {
    if (quiz.isEnded()) {
        showScores();
    }

    else {
        freezeClick = false;
        //Show current question!

        let curQuest = quiz.getCurrentQuestionIndex();

        if (curQuest.text) {
            let questionEle = document.getElementById("question");
            questionEle.innerHTML = curQuest.text;

            //Show current question's options
            let options = curQuest.options;

            for (var i = 0; i < options.length; i++) {
                let currOption = options[i];
                let eachOptElement = document.getElementById("choice" + i);
                eachOptElement.innerHTML = currOption;
                handleOptionBtn("btn" + i, currOption);
            }
        }
        showProgress();
    }
}


let quiz = new QuizApplication(questions);

//Load questions
loadQuestions();