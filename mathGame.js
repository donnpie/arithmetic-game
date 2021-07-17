//console.log("JavaScript is connected...")

//State can have one of three possible values: "setup", "game", "postGame"
let state = "setup"
//console.log("state is " + state)

//Get the elements
const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const setupForm = document.getElementById('setup-form')

//Set intial game state
setupForm.addEventListener('submit', clickBtn1)
let operators = []

function clickBtn1(e){
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
    if (allowAdd) {
        let addLimit = elements.namedItem('addition-limit').value
        //console.log(addLimit)
        if (!validateField(addLimit, "Please enter a value for the addition limit")) {
            return
        }
        operators.push("add")
    }

    const allowSubtract = elements.namedItem('subtraction').checked
    //console.log(allowSubtract)
    if (allowSubtract) {
        let subtractLimit = elements.namedItem('subtraction-limit').value
        //console.log(subtractLimit)
        if (!validateField(subtractLimit, "Please enter a value for the subtraction limit")) {
            return
        }
        operators.push("subtract")
    }

    const allowMultiply = elements.namedItem('multiplication').checked
    //console.log(allowMultiply)
    if (allowMultiply) {
        let multiplyLimit = elements.namedItem('multiplication-limit').value
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
    document.getElementById('submit-button').style.display = 'none'
    

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
    }, 1000);

    //Show the calculation and allow the user to enter answer - repeat until time is up
    //When time is up, show the postGame screen

}

function clickBtn2(){
    //e.preventDefault()
    state = "game"
    console.log("state is " + state)
    btn1.className = "btn-invisible"
    btn2.className = "btn-invisible"
    btn3.className = "btn-visible"
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