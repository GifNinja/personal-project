/*jslint devel: true, browser: true*/
/*jslint node: true */
/*jslint plusplus: true */

"use strict";
var score = 0,
    correct = 0,
    currentQuestion = 0; /* CAN DELETE? */

function render() {
    var choiceA = document.getElementById("A"),
        choiceB = document.getElementById("B"),
        choiceC = document.getElementById("C"),
        choiceD = document.getElementById("D"),
        question = document.getElementById("question");
    if (window.questions[currentQuestion].answerEquation === true) {
        choiceA.innerHTML = "<img src='https://latex.codecogs.com/svg.latex?" + window.questions[currentQuestion].choiceA + "' /> <br>";
        choiceB.innerHTML = "<img src='https://latex.codecogs.com/svg.latex?" + window.questions[currentQuestion].choiceB + "' /> <br>";
        choiceC.innerHTML = "<img src='https://latex.codecogs.com/svg.latex?" + window.questions[currentQuestion].choiceC + "' /> <br>";
        choiceD.innerHTML = "<img src='https://latex.codecogs.com/svg.latex?" + window.questions[currentQuestion].choiceD + "' /> <br>";
    } else {
        choiceA.innerHTML = window.questions[currentQuestion].choiceA;
        choiceB.innerHTML = window.questions[currentQuestion].choiceB;
        choiceC.innerHTML = window.questions[currentQuestion].choiceC;
        choiceD.innerHTML = window.questions[currentQuestion].choiceD;
    }

    if (window.questions[currentQuestion].questionEquation === true) {
        question.innerHTML = "<img src='https://latex.codecogs.com/svg.latex?" + window.questions[currentQuestion].question + "' /> <br>";
    } else {
        question.innerHTML = window.questions[currentQuestion].question;
    }
}

function carbonDatingQuiz() {
    window.questions = [
        {
            question: "4arcsin(x)=pi",
            choiceA: "x=22sqrt(2)",
            choiceB: "x=2",
            choiceC: "$x=1/sqrt(2)",
            choiceD: "x=1/2",
            correct: "C",
            difficulty: 2,
            answerEquation: true,
            questionEquation: true
        }, {
            question: "What is the equation for beta decay of carbon-14?",
            choiceA: "FALSE",
            choiceB: "TRUE",
            choiceC: "FALSE",
            choiceD: "FALSE",
            correct: "B",
            difficulty: 1,
            answerEquation: false,
            questionEquation: false
        }, {
            question: "Which of these is a complex number?",
            choiceA: "2-i",
            choiceB: "-30i",
            choiceC: "pi",
            choiceD: "All of them",
            correct: "D",
            difficulty: 2,
            answerEquation: false,
            questionEquation: false
        }
    ];
    alert("Good luck!");
    render();
}

function fraudDetectionQuiz() {
    window.questions = [
        {
            question: "What does the Benford distribution say about the probabilities of the leading digits?",
            choiceA: "All equally likely",
            choiceB: "All random",
            choiceC: "Decrease from 1 to 9",
            choiceD: "Highest near the middle, i.e. 4, 5, 6.",
            correct: "C",
            difficulty: 1,
            answerEquation: false,
            questionEquation: false
        }, {
            question: "True or False: A) Benford's law works in other base systems. B) Benford's law can be extended to a string of digits or any nth digit.",
            choiceA: "Both false",
            choiceB: "Only A is true",
            choiceC: "Only B is true",
            choiceD: "Both true",
            correct: "D",
            difficulty: 2,
            answerEquation: false,
            questionEquation: false
        }, {
            question: "Which of these is NOT expected to follow the Benford distribution?",
            choiceA: "Prices of goods in a supermarket",
            choiceB: "Election results",
            choiceC: "Stock prices",
            choiceD: "Death rates",
            correct: "A",
            answerEquation: false,
            difficulty: 3,
            questionEquation: false
        }
    ];
    alert("Good luck!");
    render(); /* render the first question */
}

function updateScore(difficulty) {
    score += difficulty; /* some questions are worth more points than others depending on their difficulty */
    var scorediv = document.getElementById("score"); /* fetch the score */
    scorediv.innerHTML = score; /* update the current score */
    
    correct += 1; /* this is used to calculate the % of correct answers to decide the finished text */
}

function check(answer) {
    if (answer === window.questions[currentQuestion].correct) {
        alert("Correct!");
        updateScore(window.questions[currentQuestion].difficulty);
    } else {
        alert("Incorrect");
        /* wrong() */
    }
    currentQuestion++; /*move on to the next question */
    
    /* check to see if game is over (currentQuestion reaches the length of questions */
    if (currentQuestion === window.questions.length) {
        var choices = document.getElementsByClassName("choices"),
            htmlQuestions = document.getElementsByClassName("setup"),
            finishedText = document.getElementById("finished"),
            i;
        
        /* ----Remove all the question and choice divs ----- */
        for (i = 0; i < choices.length; i++) {
            choices[i].style.display = "none";
        }
        for (i = 0; i < htmlQuestions.length; i++) {
            htmlQuestions[i].style.display = "none";
        }
        /* --------------------------------------------------*/
        
        /* set the game over text depending on % correct. */
        if (correct / window.questions.length > 0.8) {
            finishedText.innerHTML = "Congratulations, you got over 80%! You seem to know your stuff!";
            finishedText.style.backgroundColor = "#006600";
        } else if (correct / window.questions.length > 0.6) {
            finishedText.innerHTML = "You got over 60%, but perhaps you could review a little? Refresh to try again.";
            finishedText.style.backgroundColor = "#ff9933";
        } else {
            finishedText.innerHTML = "Unlucky, perhaps come back to this on another day...?";
            finishedText.style.backgroundColor = "#cc3300";
        }
        finishedText.style.display = "block"; /* display the game over text */
    } else { /* if game is not over */
        render(currentQuestion); /* render the next question */
    }
}