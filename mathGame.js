//console.log("JavaScript is connected...")

//State can have one of three possible values: "setup", "game", "postGame"
let state = "setup"
let results = [] //Stores the results after each submission by the user
let limit
let correctAnswer
let addLimit
let subtractLimit
let multiplyLimit

//Get the elements
const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const setupForm = document.getElementById('setup-form')
const calculationForm = document.getElementById('calculation-form')
const arg1Display = document.getElementById('arg1')
const arg2Display = document.getElementById('arg2')
const operatorDisplay = document.getElementById('operator')
const equalSign = document.getElementById('equal-sign')
const answerInput = document.getElementById('answer-input')
const calculationSubmitButton = document.getElementById('calculation-submit-button')

//Set intial game state
setupForm.addEventListener('submit', clickBtn1)
calculationForm.addEventListener('submit', clickBtn2)
let operators = []

function clickBtn1(e){
    //When user submits setup form
    e.preventDefault()
    //console.log("made it to here")
    //Validate inputs
    let elements = e.target.elements
    let timeLimit = elements.namedItem('time').value
    if (!validateField(timeLimit, "Please enter a value for the time limit")) {
        return
    }

    const allowAdd = elements.namedItem('addition').checked
    addLimit = elements.namedItem('addition-limit').value
    if (allowAdd) {
        if (!validateField(addLimit, "Please enter a value for the addition limit")) {
            return
        }
        operators.push("add")
    }

    const allowSubtract = elements.namedItem('subtraction').checked
    subtractLimit = elements.namedItem('subtraction-limit').value
    if (allowSubtract) {
        if (!validateField(subtractLimit, "Please enter a value for the subtraction limit")) {
            return
        }
        operators.push("subtract")
    }

    const allowMultiply = elements.namedItem('multiplication').checked
    multiplyLimit = elements.namedItem('multiplication-limit').value
    if (allowMultiply) {
        if (!validateField(multiplyLimit, "Please enter a value for the multiplication limit")) {
            return
        }
        operators.push("multiply")
    }

    //Select at least one type of operation
    if (!(allowAdd || allowSubtract || allowMultiply)) {
        alert("select at least one operator")
        return
    }

    //At this point all validations are complete and the game can begin
    hideInputform(elements)

    //Show the timer and let it count down
    timeLimit = parseInt(timeLimit)
    let timer = document.getElementById('timer')
    let interval
    interval = setInterval(() => {
        timer.innerText = "Time remaining: " + timeLimit
        timeLimit--
        if (timeLimit < 0) {
            handlePostGameScreen(timer, results)
        }
    }, 1000)

    function handlePostGameScreen(timer, results) {
        //Timer has expired
        clearInterval(interval);

        //Hide the game screen
        hideGameForm()

        //Hide the timer
        timer.innerText = ""

        //Show post game screen
        document.getElementById('post-game-form').className="visible"
        document.getElementById('table').className="visible"
        btn3.className = "visible"

        //print results table
        printResultsTable(results)
    }

    //Make the game form appear
    showGameForm()

    //Show the first calculation and allow the user to enter answer
    showFirstCalculation()


}

function clickBtn2(e){
    //When user submits answer
    e.preventDefault()
    
    //Get the user's answer
    let elements = e.target.elements
    let userAnswer = parseInt(elements.namedItem('answer-input').value)
    elements.namedItem('answer-input').value = ""
    validateField(userAnswer, "Please enter answer")

    //add to solution arrray
    recordResult(results, arg1Display.innerText, arg2Display.innerText, symbol, correctAnswer, userAnswer)

    //Generate new calculation
    let operator = getOperator(operators)
    symbol = getSymbol(operator)
    limit = getLimit(operator, addLimit, subtractLimit, multiplyLimit)
    
    //Pick the arguments based on operation's upper limit
    let arg1 = getArg(limit)
    let arg2 = getArg(limit)
    
    //Calculate the answer
    correctAnswer = calculateAnswer(operator, arg1, arg2)

    //Display new calculation
    displayCalculation(arg1, arg2, symbol)
    console.log(results)
}

function clickBtn3(){
    //User clicks button to move away from post game screen
    location.reload()
}

//Helper functions
function validateField(field, message) {
    if (field === "" || field === NaN || field === undefined || field === null) {
        alert(message)
        return false
    }
    return true
}

function getSymbol(operator){
    switch (operator) {
        case "add":
            return "+"
        case "subtract":
            return "-"
        case "multiply":
            return "*"
    }
}

function getLimit(operator, addLimit, subtractLimit, multiplyLimit){
    switch (operator) {
        case "add":
            return addLimit
        case "subtract":
            return subtractLimit
        case "multiply":
            return multiplyLimit
    }
}

function calculateAnswer(operator, arg1, arg2){
    switch (operator) {
        case "add":
            return arg1 + arg2
        case "subtract":
            return arg1 - arg2
        case "multiply":
            return arg1 * arg2
    }
}

function recordResult(results, arg1, arg2, symbol, correctAnswer, userAnswer) {
    const status = correctAnswer===userAnswer ? "Correct" : "Incorrect"
    results.push({
        arg1, 
        arg2,
        operator: symbol,
        correctAnswer,
        userAnswer,
        status
    })
}

function showFirstCalculation(){
    //Pick the operation and limit
    let operator = getOperator(operators)
    symbol = getSymbol(operator)
    limit = getLimit(operator, addLimit, subtractLimit, multiplyLimit)

    //Pick the arguments based on operation's upper limit
    let arg1 = getArg(limit)
    let arg2 = getArg(limit)

    //Calculate the answer
    correctAnswer = calculateAnswer(operator, arg1, arg2)

    //Display the calculation
    displayCalculation(arg1, arg2, symbol)
}

function getOperator(operators) {
    let index = Math.floor(Math.random()*operators.length)
    return operators[index]

}

function displayCalculation(arg1, arg2, symbol) {
    arg1Display.innerText = arg1 + " "
    arg2Display.innerText = arg2
    operatorDisplay.innerText = symbol
    answerInput.innerText = ""
}  


function showGameForm() {
    const status = 'visible'
    arg1Display.className = status
    arg2Display.className = status
    operatorDisplay.className = status
    operatorDisplay.className = status
    equalSign.className = status
    answerInput.className = status
    calculationSubmitButton.className = status
}

function hideGameForm() {
    const status = 'invisible'
    arg1Display.className = status
    arg2Display.className = status
    operatorDisplay.className = status
    operatorDisplay.className = status
    equalSign.className = status
    answerInput.className = status
    calculationSubmitButton.className = status
}
   
function getArg(limit){
    return 2 + Math.floor(Math.random()*(limit - 2))
}

function hideInputform(elements) {
    //Make the inputs disappear
    elements.namedItem('addition').className = 'invisible'
    elements.namedItem('subtraction').className = 'invisible'
    elements.namedItem('multiplication').className = 'invisible'
    elements.namedItem('addition-limit').className = 'invisible'
    elements.namedItem('subtraction-limit').className = 'invisible'
    elements.namedItem('multiplication-limit').className = 'invisible'
    elements.namedItem('time').className = 'invisible'

    //Make labels disappear
    document.getElementById('time-label').style.display = 'none'
    document.getElementById('addition-label').style.display = 'none'
    document.getElementById('addition-limit-label').style.display = 'none'
    document.getElementById('subtraction-label').style.display = 'none'
    document.getElementById('subtraction-limit-label').style.display = 'none'
    document.getElementById('multiplication-label').style.display = 'none'
    document.getElementById('multiplication-limit-label').style.display = 'none'
    document.getElementById('setup-submit-button').style.display = 'none'
}

function  printResultsTable(results) {   
    let tableBodyHtml = ""
    let score = 0
    const correct = 2
    const incorrect = -1
    for (let result of results) {
        let calc = result.arg1 + " " + result.operator + " " + result.arg2
        let html = `<tr><td>${calc}</td><td>${result.correctAnswer}</td><td>${result.userAnswer}</td><td>${result.status}</td></tr>`
        tableBodyHtml += html
        score += result.status === "Correct" ? correct : incorrect
    }
    document.getElementById('table-body').innerHTML = tableBodyHtml
    document.getElementById('score').innerText = "Your score:" + score
}


//References
//https://stackoverflow.com/questions/1947263/using-an-html-button-to-call-a-javascript-function
//https://www.w3schools.com/jsref/event_onclick.asp
//https://www.w3schools.com/jsref/prop_html_classname.asp
//https://www.w3schools.com/tags/att_input_type_checkbox.asp
//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
//https://www.sitepoint.com/community/t/how-to-set-up-preventdefault-on-form-submit/245580
//https://www.w3schools.com/tags/att_input_value.asp
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
//https://stackoverflow.com/questions/10857393/how-to-make-label-visible-invisible/10857429
//https://stackoverflow.com/questions/6345577/clearinterval-is-not-stopping-setinterval-firefox-extension-development
//https://www.w3schools.com/jsref/met_loc_reload.asp
//https://www.bitdegree.org/learn/css-form#:~:text=CSS%20attribute%20selectors%20select%20specific,form%20fields%20that%20accept%20numbers.
//https://www.w3.org/Style/Examples/007/evenodd.en.html