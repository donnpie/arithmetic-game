//console.log("JavaScript is connected...")

//State can have one of three possible values: "setup", "game", "postGame"
let state = "setup"
let results = [] //Stores the results after each submission by the user
//console.log("state is " + state)

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

//Make the game form disappear
arg1Display.className = 'invisible'
arg2Display.className = 'invisible'
operatorDisplay.className = 'invisible'
operatorDisplay.className = 'invisible'
equalSign.className = 'invisible'
answerInput.className = 'invisible'
calculationSubmitButton.className = 'invisible'

//Set intial game state
setupForm.addEventListener('submit', clickBtn1)
calculationForm.addEventListener('submit', clickBtn2)
let operators = []

function clickBtn1(e){
    //When user submits setup form
    e.preventDefault()
    state = "setup"
    //console.log("state is " + state)
    
    let elements = e.target.elements
    //console.log(elements)
    let timeLimit = elements.namedItem('time').value
    //console.log(timeLimit)
    if (!validateField(timeLimit, "Please enter a value for the time limit")) {
        return
    }

    const allowAdd = elements.namedItem('addition').checked
    //console.log(allowAdd)
    let addLimit = elements.namedItem('addition-limit').value
    if (allowAdd) {
        //console.log(addLimit)
        if (!validateField(addLimit, "Please enter a value for the addition limit")) {
            return
        }
        operators.push("add")
    }

    const allowSubtract = elements.namedItem('subtraction').checked
    //console.log(allowSubtract)
    let subtractLimit = elements.namedItem('subtraction-limit').value
    if (allowSubtract) {
        //console.log(subtractLimit)
        if (!validateField(subtractLimit, "Please enter a value for the subtraction limit")) {
            return
        }
        operators.push("subtract")
    }

    const allowMultiply = elements.namedItem('multiplication').checked
    //console.log(allowMultiply)
    let multiplyLimit = elements.namedItem('multiplication-limit').value
    if (allowMultiply) {
        //console.log(multiplyLimit)
        if (!validateField(multiplyLimit, "Please enter a value for the multiplication limit")) {
            return
        }
        operators.push("multiply")
    }
    //console.log(operators)

    //Select at least one type of operation
    if (!(allowAdd || allowSubtract || allowMultiply)) {
        alert("select at least one operator")
        return
    }

    //At this point all validations are complete and the game can begin

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
    
    //Show the timer and let it count down
    timeLimit = parseInt(timeLimit)
    //console.log(timeLimit)
    let timer = document.getElementById('timer')
    let interval
    interval = setInterval(() => {
        timer.innerText = "Time remaining: " + timeLimit
        timeLimit--
        if (timeLimit < 0) {
            //console.log("Timer has reached 0")
            clearInterval(interval);
            //clearTimeout();
        }
    }, 1000)

    //Make the game form appear
    arg1Display.className = 'visible'
    arg2Display.className = 'visible'
    operatorDisplay.className = 'visible'
    operatorDisplay.className = 'visible'
    equalSign.className = 'visible'
    answerInput.className = 'visible'
    calculationSubmitButton.className = 'visible'

    //Show the first calculation and allow the user to enter answer - repeat until time is up
    //Pick the operation
    let index = Math.floor(Math.random()*operators.length)
    let operator = operators[index]
    let symbol
    let limit
    symbol = getOperatorAndLimit(operator, addLimit, subtractLimit, multiplyLimit)[0]
    limit = getOperatorAndLimit(operator, addLimit, subtractLimit, multiplyLimit)[1]
    
    //Pick the arguments based on operation's upper limit
    let arg1 = Math.floor(Math.random()*limit)
    let arg2 = Math.floor(Math.random()*limit)
    
    //Calculate the answer
    let answer = calculateAnswer(operator, arg1, arg2)
    //alert(arg1 + " " + symbol + " " + arg2 + " " + "=" + " " + answer)

    //Display the calculation
    arg1Display.innerText = arg1
    arg2Display.innerText = arg2
    operatorDisplay.innerText = symbol
    
    //When time is up, show the postGame screen

}

function clickBtn2(e){
    //When user submits answer
    e.preventDefault()
    
    //Get the user's answer
    //console.log(e.target.elements)
    let elements = e.target.elements
    let userAnswer = elements.namedItem('answer-input').value
    //console.log(userAnswer)
    //answerInput
    //add to solution arrray
    recordResult(results, arg1, arg2, symbol, correctAnswer, userAnswer) //Continue here
    //Generate new calculation

}

function clickBtn3(){
    //e.preventDefault()
    state = "postGame"
    console.log("state is " + state)
    btn1.className = "btn-visible"
    btn2.className = "btn-invisible"
    btn3.className = "btn-invisible"
}

//Helper functions
function validateField(field, message) {
    if (field === "" || field === NaN || field === undefined || field === null) {
        alert(message)
        return false
    }
    return true
}

function getOperatorAndLimit(operator, addLimit, subtractLimit, multiplyLimit){
    switch (operator) {
        case "add":
            //alert("add")
            // symbol = "+"
            // limit = addLimit
            return ["+", addLimit]
        case "subtract":
            //alert("subtract")
            // symbol = "-"
            // limit = subtractLimit
            return ["-", subtractLimit]
        case "multiply":
            //alert("multiply")
            // symbol = "*"
            // limit = multiplyLimit
            return ["*", multiplyLimit]
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
    //console.log("record result")
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