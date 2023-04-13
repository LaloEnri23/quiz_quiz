    //targeting different elements
    const question = document.querySelector('#question');
    const choices= Array.from (document.querySelectorAll('.choice-text'));
    const progressText= document.querySelector('#progressText');
    const scoreText= document.querySelector('#score');
    const progressBarFull= document.querySelector('#progressBarFull');
    //
    let currentQuestion={}
    let accemptingAnswers = true
    let score = 0
    let questionCounter = 0
    let availableQuestions = []

    let questions = [
        {
            question: 'Array in JavaScript can be used to store ____ .',
            choice1: 'other arrays',
            choice2: 'booleans',
            choice3: 'numbers and strings',
            choice4: 'all of the above',
            answer: 1,
        },
        {
            question: 'String values must be enclosed within ___ when being assigned to variables.',
            choice1: 'commas',
            choice2: 'curly brackets',
            choice3: 'quotes',
            choice4: 'parenthesis',
            answer: 2,
        },
        {
            question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
            choice1: 'JavaScript',
            choice2: 'terminal/bash',
            choice3: 'for loops',
            choice4: 'console log',
            answer: 3,
        },
        {
            question: 'Commonly used data types DO NOT INCLUDE:',
            choice1: 'strings',
            choice2: 'booleans',
            choice3: 'alerts',
            choice4: 'numbers',
            answer: 2,
        }, 
        {
            question: 'The condition in an if / else statement is enclosed within ____ .',
            choice1: 'quotes',
            choice2: 'curly brackets',
            choice3: 'parenthesis',
            choice4: 'square brackets',
            answer: 3,
        },
    ]

var lastQuestion = 0;
var quizQuestions = [
    ['1','2','3','4','5','6']
];

function checkAnswer() {
  // code to check user's answer and move to next question
    if (lastQuestion == quizQuestions.length - 6) {
    // if last question, redirect to another page
        then(href = "./end.js");
    }
}


    var count = 60; // 1 minute
    var wrongAnswers = 0;
    var timer = setInterval(function() {
    count--;
        var minutes = Math.floor(count / 60);
        var seconds = count % 60;
        document.getElementById("timer").innerHTML = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
        if (count == 0) {
        clearInterval(timer);
    // 
    }

}, 1000);

function incorrectAnswer() {
    count -= 10; // deduct 10 seconds
    wrongAnswers++;
    }
    
    

    const SCORE_POINTS = 100
    const EDUARDO_QUESTIONS = 4

    startGame = () => {
        questionCounter = 0
        score =0
        availableQuestions = [...questions]
        getNewQuestion()
    }

    getNewQuestion = () => {
        if(availableQuestions.length === 0 || questionCounter > EDUARDO_QUESTIONS)
            localStorage.setItem('mostRecentScore', score)
            
            //return window.location.assign('/UCLA-VIRT-FSF-FT-02-2023-U-LOLC/04-Web-APIs/02-Challenge/Assets/end.html')

            questionCounter++
            progressText.innerText = `Question ${questionCounter} of ${EDUARDO_QUESTIONS}`
            progressBarFull.style.width = `${(questionCounter/EDUARDO_QUESTIONS) * 100}%`

            const questionsIdex = Math.floor(Math.random() * availableQuestions.length)
            currentQuestion = availableQuestions [questionsIdex]
            question.innerText = currentQuestion.question

            choices.forEach(choice => {
                const number = choice.dataset ['number']
                choice.innerText = currentQuestion ['choice' + number]
            })

            availableQuestions.splice(questionsIdex, 1)

            accemptingAnswers = true
    }

    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if (!accemptingAnswers) return

            accemptingAnswers = false
            const selectedChoice = e.target
            const selectedAnswer = selectedChoice.dataset['number']

            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

            if(classToApply === 'correct'){
                incrementScore(SCORE_POINTS)
            }

            selectedChoice.parentElement.classList.add(classToApply)

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
            }, 1000)
        })
    })

    incrementScore = num => {
        score +=num
        scoreText.innerText = score
    }

    startGame()

