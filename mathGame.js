console.log("JavaScript is connected...")


//State can have one of three possible values: "setup", "game", "postGame"
let state = "setup"
console.log("state is " + state)

//Get the elements
const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const div1 = document.getElementById('div1')

//Set intial game state
//btn2.style.display = "none"
//btn3.style.display = "none"

function clickBtn1(){
    //e.preventDefault()
    state = "setup"
    console.log("state is " + state)
    //btn1.style.display = "none"
    //btn2.style.display = "block"
    //btn3.style.display = "none"
    btn1.className = "btn-invisible"
    btn2.className = "btn-visible"
    btn3.className = "btn-invisible"
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