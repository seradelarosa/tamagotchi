//KNOWN BUGS
//lowerHunger() generates one randomInteger at the start, and uses that same value every 4 seconds. It needs to generate a new randomInteger every 4 seconds.
//when hunger = 0, need to disable button that adds to hunger value...

// ============================================================================================================================

import { state } from './data.js';

//cached elements
const actionBtnOne = document.querySelector("#actionBtnOne");
const timerDisplay = document.querySelector('#timerDisplay');
const hungerDisplay = document.querySelector('#hungerDisplay');

//establish meters
let hunger = state.hunger;
let happiness = state.happiness;
let fun = state.fun;

// ===============================================================================================================================

//1000 milliseconds = 1 second
const dayTimer = () => {
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

//need to be able to stop the timer from other functions...

// =======================================================================================================

//function to add one to hunger meter
//TO DO: grab value from food object and add that value instead of one
const addHunger = () => {
    hunger += 1;
    hungerDisplay.innerHTML = `Hunger: ${hunger}`;
    console.log(hunger);
};

//how to increment hunger down... on a 4 second timer.. using a random integer between 1-3?
const lowerHunger = () => {

    const countdown = setInterval(() => {
        //grab random integer first
        let randomInteger = Math.floor(Math.random() * 3) + 1;
        console.log(randomInteger);
        hunger = hunger - randomInteger;
        hungerDisplay.innerHTML = `Hunger: ${hunger}`;

        if (hunger <= 0) {
            clearInterval(countdown);
            hungerDisplay.innerHTML = "Starving! You lose! Retry?";
        }
    }, 6000);
};

// ========================================================================================================

actionBtnOne.addEventListener("click", addHunger);

//=========================================================================================================

//stuff to do on page load
//from MDN web docs window.onload
window.onload = () => {
    //binding timer to start onload
    dayTimer();
    hungerDisplay.innerHTML = `Hunger: ${hunger}`;
    timerDisplay.innerHTML = `Day 1:`;
    lowerHunger();
    console.log(state.hunger);
};

// restartDay()
// startNextDay()


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