//grab actionBtnOne
const actionBtnOne = document.querySelector("#actionBtnOne");
//grab timerDisplay
const timerDisplay = document.querySelector('#timerDisplay');
//grab hungerDisplay
const hungerDisplay = document.querySelector('#hungerDisplay');

//establish hunger meter
let hunger = 10;

//Have button add one to hunger meter
const addHunger = () => {
    hunger += 1;
    hungerDisplay.innerHTML = `Hunger: ${hunger}`;
    console.log(hunger);
};

actionBtnOne.addEventListener("click", addHunger);

//each day= 3 minutes (180 seconds)
//1000 milliseconds = 1 second
//bind this to init, or onLoad?
const timer = () => {
    //start timer at 3:00 and have it count down...
    //every 3 minutes... checkState? If values > 0, winMsg(), nextDay(), if ONE or more values === 0, lossMsg(), restartDay()
    let timeLeft = 180;

    //from MDN web docs setInterval
    const countdown = setInterval(() => {
        //from web docs Math.floor()
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        //ensure correct format
        seconds = seconds < 10 ? "0" + seconds : seconds; 

        //update display
        timerDisplay.innerHTML = `Day 1: ${minutes}:${seconds}`;

        //when timer reaches 0; endGame(); and reset();? startTimer() / stopTimer()?
        if (timeLeft === 0) {
            clearInterval(countdown);
            timerDisplay.innerHTML = "Time's up!";
        }

        timeLeft --;

    }, 1000);
    
};

//stuff to do on page load
//from MDN web docs window.onload
window.onload = () => {
    timer();
    hungerDisplay.innerHTML = `Hunger: ${hunger}`;
    timerDisplay.innerHTML = `Day 1:`;
};


//randomly pick a state to decrease every 4 seconds (use setInterval to execute a callback function every 4 seconds?) by a random integer between 1-3


//set hunger limit to 0-10
























// =============================

//define idle state
//PNG motion 
//continuous firing

//define changing idle -> another state
//change class="idle" to class=".eating";

//define eating state
//change to "eating" class which displays eating.png
//controls motion of the PNG by switching to transform class .up and transform class .down
//on a 3 second timer, then reverts to idle state

//define starving state
//change to "starving" class which displays starving.png
//no motion
//triggers game loss, days reset

//define playing state

//define bored state

//define sleeping state

// =================================

//define tamagotchi object
//let hunger; (0-10)
//let boredom; (0-10)
//make a cap at 10
//if either of these reach 0, trigger sleeping class

//define days(rounds)
//let day = 5 minute timer
//if 5 minutes is reached, trigger success();
//progress to day 2
//update day

//define loss
//if hunger | boredom = 0;
//trigger loss();
//sleeping png class

//define food object
//milk: +2
//add 2 to hunger 
//cookie: +3
//adds 3 to hunger

//define toys object
// coloring book: +3
//adds 3 to boredom
// building block: +2
// adds 2 to boredom