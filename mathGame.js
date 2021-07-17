console.log("JavaScript is connected...")


//State can have one of three possible values: "setup", "game", "postGame"
let state = "setup"
//console.log("state is " + state)

//Get the elements
const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const setupForm = document.getElementById('setup-form')

//Set intial game state
//btn2.style.display = "none"
//btn3.style.display = "none"
setupForm.addEventListener('submit', clickBtn1)
let operators = []

function clickBtn1(e){
    e.preventDefault()
    state = "setup"
    console.log("state is " + state)
    
    const timeLimit = e.target.elements[0].value
    //console.log(typeof(timeLimit))
    if (timeLimit === "" || timeLimit === NaN || timeLimit === undefined || timeLimit === null) {
        alert("Please enter a value for the time limit")
        return
    }

    const allowAdd = e.target.elements[1]
    if (allowAdd) {
        operators.push("add")
    }

    const allowSubtract = e.target.elements[2]
    if (allowSubtract) {
        operators.push("subtract")
    }

    const allowMultiply = e.target.elements[3]
    if (allowMultiply) {
        operators.push("multiply")
    }
    console.log(operators)

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







































//References
//https://stackoverflow.com/questions/1947263/using-an-html-button-to-call-a-javascript-function
//https://www.w3schools.com/jsref/event_onclick.asp
//https://www.w3schools.com/jsref/prop_html_classname.asp
//https://www.w3schools.com/tags/att_input_type_checkbox.asp
//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
//https://www.sitepoint.com/community/t/how-to-set-up-preventdefault-on-form-submit/245580
//https://www.w3schools.com/tags/att_input_value.asp