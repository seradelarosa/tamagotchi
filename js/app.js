//KNOWN BUGS
//

//NEXT STEPS: 2/2
//make stopTimer() if hunger = 0
//define loss()
//change to sleeping via CSS class change
//define reset()
//reset values, timer...

// ============================================================================================================================

import { state } from './data.js';
import { food } from './data.js';
import { toys } from './data.js';
import { exerciseEquipment } from './data.js';

//cached elements
const actionBtnOne = document.querySelector("#actionBtnOne");
const timerDisplay = document.querySelector('#timerDisplay');
const hungerDisplay = document.querySelector('#hungerDisplay');

//establish meters
let hunger = state.hunger;
let happiness = state.happiness;
let fun = state.fun;

//food variables 
let cookie = food.cookie;
let cereal = food.cereal;

//toy variables
let stuffedAnimal = toys.stuffedAnimal;
let coloringBook = toys.coloringBook;

//exercise equipment variables
let trampoline = exerciseEquipment.trampoline;
let baseballSet = exerciseEquipment.baseballSet;

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
    if (hunger < 10) {
        hunger += 1;
        hungerDisplay.innerHTML = `Hunger: ${hunger}`;
    }

    //cannot be above 10
    if (hunger >= 10) {
        disableActionBtnOne();
    }
};

//increments hunger down on a 6 second timer using a random integer between 1-3
const lowerHunger = () => {
    const countdown = setInterval(() => {
        //grab random integer first
        let randomInteger = Math.floor(Math.random() * 3) + 1;
        hunger = hunger - randomInteger;
        hungerDisplay.innerHTML = `Hunger: ${hunger}`;

        if (hunger <= 0) {
            //keep hunger at 0
            hunger = 0;
            clearInterval(countdown);
            disableActionBtnOne();
            hungerDisplay.innerHTML = "Starving! You lose! Retry?";
            //when player loses, don't run anything else below
            return;
            //TO DO: trigger sleeping class
            //TO DO: make function to stop timer
            //TO DO: create button to retry that resets the game and timer
        }

        if (hunger < 10) {
            enableActionBtnOne();
        }
    }, 6000);
};

//button controls

const disableActionBtnOne = () => {
    actionBtnOne.disabled = true;
};

const enableActionBtnOne = () => {
    actionBtnOne.disabled = false;
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
//if hunger/boredom/exercise reach 0, trigger sleeping class

//define days(rounds)
//let day = 5 minute timer
//if 5 minutes is reached, trigger success();
//progress to day 2
//update day


//define loss
//if hunger | boredom = 0;
//trigger loss();
//sleeping png class
//prompt to retry (does state reset and subtracts 1 from day value)
//BUT day cannot be below one
