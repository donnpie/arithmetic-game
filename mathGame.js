console.log("JavaScript is connected...")


//State can have one of three possible values: "setup", "game", "postGame"
let state = "setup"

//Get the elements
const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')

//Set intial game state
btn2.style.display = "none"
btn3.style.display = "none"

function clickBtn1(){
    //e.preventDefault()
    state = "setup"
    console.log("state is " + state)
    btn1.style.display = "none"
    btn2.style.display = "block"
    btn3.style.display = "none"
}

function clickBtn2(){
    //e.preventDefault()
    state = "game"
    console.log("state is " + state)
    btn1.style.display = "none"
    btn2.style.display = "none"
    btn3.style.display = "block"
}

function clickBtn3(){
    //e.preventDefault()
    state = "postGame"
    console.log("state is " + state)
    btn1.style.display = "block"
    btn2.style.display = "none"
    btn3.style.display = "none"
}







































//References
//
//