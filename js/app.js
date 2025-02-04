//KNOWN BUGS
//when continue is selected, hide ontinue btn

//NEXT STEPS: 2/2
//define loss()
//change to sleeping via CSS class change

// ============================================================================================================================

import { state } from './data.js';
import { food } from './data.js';
import { toys } from './data.js';
import { exerciseEquipment } from './data.js';
import { currentDay } from './data.js';

//cached elements
const foodOptionsBtn = document.querySelector("#foodOptionsBtn");

const timerDisplay = document.querySelector('#timerDisplay');
const hungerDisplay = document.querySelector('#hungerDisplay');

const continueBtn = document.querySelector('#continueBtn');
const retryBtn = document.querySelector('#retryBtn');

const cookieBtn = document.querySelector("#cookieBtn");
const cerealBtn = document.querySelector("#cerealBtn");

//bring in currentDay value (1)
let day = currentDay.day;

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

//need to be able to stop the timer from other functions...
//so countdown must be stored globally so it can be accessed....
//so each countdown needs to be uniquely named?
let dayTimerInterval;
let hungerTimerInterval;

const successMsg = () => {
    timerDisplay.innerHTML = "Congrats! You survived the day. Continue?";
};

const lossMsg = () => {
    timerDisplay.innerHTML = "Your Tamagotchi fell asleep! Try again?";
};

// ===============================================================================================================================

//need to be able to stop the timer from other functions...
const stopDayTimer = () => {
    clearInterval(dayTimerInterval);
};

//1000 milliseconds = 1 second
const dayTimer = () => {
    //start timer at 3:00 and have it count down...
    //every 3 minutes... checkState? If values > 0, winMsg(), nextDay(), if ONE or more values === 0, lossMsg(), restartDay()
    let timeLeft = 180;

    //from MDN web docs setInterval
    dayTimerInterval = setInterval(() => {
        //from web docs Math.floor()
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        //ensure correct format
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //update display
        timerDisplay.innerHTML = `Day ${day}: ${minutes}:${seconds}`;

        //TO DO: update to include all variables
        if (timeLeft === 0 && hunger > 0) {
            continueBtn.classList.remove('hidden');
            foodOptionsBtn.classList.add('hidden');
            disableFoodOptionsBtn();
            stopDayTimer();
            stopHungerTimer();
            successMsg();
        }

        timeLeft--;

    }, 1000);

};

// =======================================================================================================

const stopHungerTimer = () => {
    clearInterval(hungerTimerInterval);
};

const checkHunger = () => {
    if (hunger >= 10) {
        disableCookieBtn();
        disableCerealBtn();
    } else {
        enableCookieBtn();
        enableCerealBtn();
    }
};

//check hunger value every 1 second (so buttons can always stay updated)
setInterval(() => {
    checkHunger();
}, 1000);


const showFoodOptions = () => {
    disableFoodOptionsBtn();
    foodOptionsBtn.classList.add('hidden');
    cookieBtn.classList.remove('hidden');
    cerealBtn.classList.remove('hidden');
};

const showAllOptions = () => {
    foodOptionsBtn.classList.remove('hidden');
    cookieBtn.classList.add('hidden');
    cerealBtn.classList.add('hidden');
}

//increments hunger down on a 6 second timer using a random integer between 1-3
const lowerHunger = () => {
    hungerTimerInterval = setInterval(() => {
        //grab random integer first
        let randomInteger = Math.floor(Math.random() * 3) + 1;
        hunger = hunger - randomInteger;
        hungerDisplay.innerHTML = `Hunger: ${hunger}`;

        if (hunger <= 0) {
            //keep hunger at 0
            hunger = 0;
            lossMsg();
            //add loss() to switch to sleeping class png
            stopDayTimer();
            stopHungerTimer();
            disableFoodOptionsBtn();
            hungerDisplay.classList.add('hidden');
            retryBtn.classList.remove('hidden');
            foodOptionsBtn.classList.add('hidden');
            //when player loses, don't run anything else below
            return;
            //TO DO: trigger sleeping class
        }

        if (hunger < 10) {
            enableFoodOptionsBtn();
        }
    }, 6000);
};

const addCookie = () => {
    //need to have this function check the hunger value, so if hunger changes, this logic is rechecked
    checkHunger();
    
    if (hunger + cookie <= 10) {
        hunger += cookie;
        hungerDisplay.innerHTML = `Hunger: ${hunger}`;
    }

    if (hunger + cookie > 10) {
        hunger = 10;
        hungerDisplay.innerHTML = `Hunger: ${hunger}`;
    };

    hungerDisplay.innerHTML = `Hunger: ${hunger}`;
    showAllOptions();
};

const addCereal = () => {
    checkHunger();
    
    if (hunger + cereal <= 10) {
        hunger += cereal;
        hungerDisplay.innerHTML = `Hunger: ${hunger}`;
    }

    if (hunger + cereal > 10) {
        hunger = 10;
        hungerDisplay.innerHTML = `Hunger: ${hunger}`;
    };

    hungerDisplay.innerHTML = `Hunger: ${hunger}`;
    showAllOptions();
};

// ======================================================================================================

const nextDay = () => {
    console.log("it's the next day!");
    day += 1;
    console.log(day);
    resetDay();
};

const subtractDay = () => {
    if (day <= 1) {
        day = 1;
    } else if (day > 1) {
        day -= 1;
    }

    console.log(day);
};

const retry = () => {
    subtractDay();
    resetDay();
};

const resetDay = () => {
    hunger = 10;

    timerDisplay.innerHTML = `Day ${day}:`;
    dayTimer();

    hungerDisplay.classList.remove('hidden');
    hungerDisplay.innerHTML = `Hunger: ${hunger}`;
    lowerHunger();

    continueBtn.classList.add('hidden');
    retryBtn.classList.add('hidden');

    foodOptionsBtn.classList.remove('hidden');
    cookieBtn.classList.add('hidden');
    cerealBtn.classList.add('hidden');

    //reset happiness
    //reset fun
    //change to idle png class
};



//loss()
//resetDay()
//sleeping png class
//buttons to retry()



// =======================================================================================================

//button controls
const disableFoodOptionsBtn = () => {
    foodOptionsBtn.disabled = true;
};

const enableFoodOptionsBtn = () => {
    foodOptionsBtn.disabled = false;
};

const disableCookieBtn = () => {
    cookieBtn.disabled = true;
};

const enableCookieBtn = () => {
    cookieBtn.disabled = false;
};

const disableCerealBtn = () => {
    cerealBtn.disabled = true;
};

const enableCerealBtn = () => {
    cerealBtn.disabled = false;
};

// ========================================================================================================

foodOptionsBtn.addEventListener("click", showFoodOptions);
cookieBtn.addEventListener("click", addCookie);
cerealBtn.addEventListener("click", addCereal);

continueBtn.addEventListener("click", nextDay);
retryBtn.addEventListener("click", retry);

happyOptionsBtn.addEventListener("click", showHappyOptions);
// buildingBlocksBtn.addEventListener("click", addBuildingBlocks);
// coloringBookBtn.addEventListener("click", addColoringBook);

//=========================================================================================================

//stuff to do on page load
//from MDN web docs window.onload
window.onload = () => {
    //binding timer to start onload
    dayTimer();
    hungerDisplay.innerHTML = `Hunger: ${hunger}`;
    timerDisplay.innerHTML = `Day 1:`;
    lowerHunger();
    //start lowering happiness
    //start lowering fun
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
//prompt to retry (does state reset and subtracts 1 from day value)
//BUT day cannot be below one
