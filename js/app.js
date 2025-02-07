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
const foodOptionsBtn = document.getElementById("foodOptionsBtn");

const happinessOptionsBtn = document.querySelector("#happinessOptionsBtn");
const funOptionsBtn = document.querySelector("#funOptionsBtn");


const timerDisplay = document.querySelector('#timerDisplay');
const hungerDisplay = document.querySelector('#hungerDisplay');
const happinessDisplay = document.querySelector('#happinessDisplay');
// const funDisplay = document.querySelector('#funDisplay');

const continueBtn = document.querySelector('#continueBtn');
const retryBtn = document.querySelector('#retryBtn');

const cookieBtn = document.querySelector("#cookieBtn");
const cerealBtn = document.querySelector("#cerealBtn");

const stuffedAnimalBtn = document.querySelector("#stuffedAnimalBtn");
const coloringBookBtn = document.querySelector("#coloringBookBtn");

const trampolineBtn = document.querySelector("#trampolineBtn");
const baseballSetBtn = document.querySelector("#baseballSetBtn");

//labels
const feedLabel = document.querySelector("#feed-label");
const playLabel = document.querySelector("#play-label");
const exerciseLabel = document.querySelector("#exercise-label");

const screen = document.querySelector("#screen");

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
let happinessTimerInterval;
let funTimerInterval;

const successMsg = () => {
    timerDisplay.innerHTML = "Congrats! You survived the day. Continue?";
};

const lossMsg = () => {
    timerDisplay.innerHTML = "Your Tamagotchi fell asleep! Try again?";
};

// ===============================================================================================================================

//need to be able to stop the timer from other functions
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
        if (timeLeft === 0 && hunger > 0 | timeLeft === 0 && happiness > 0 | timeLeft === 0 &&  fun > 0) {
            stopDayTimer();
            continueBtn.classList.remove('hidden');

            updateActionsOptions();

            foodOptionsBtn.classList.add('hidden');
            disableFoodOptionsBtn();
            stopHungerTimer();

            disableHappinessOptionsBtn();
            happinessOptionsBtn.classList.add('hidden');
            stopHappinessTimer();

            disableFunOptionsBtn();
            funOptionsBtn.classList.add('hidden');
            stopFunTimer();

            successMsg();
        }

        timeLeft--;

    }, 1000);

};

// =======================================================================================================

//timers
const stopHungerTimer = () => {
    clearInterval(hungerTimerInterval);
};

const stopHappinessTimer = () => {
    clearInterval(happinessTimerInterval);
}

const stopFunTimer = () => {
    clearInterval(funTimerInterval);
};

//check meters
const checkHunger = () => {
    if (hunger >= 10) {
        disableCookieBtn();
        disableCerealBtn();
    } else {
        enableCookieBtn();
        enableCerealBtn();
    }
};

setInterval(() => {
    checkHunger();
}, 1000);

const checkHappiness = () => {
    if (happiness >= 10) {
        disableStuffedAnimalBtn();
        disableColoringBookBtn();
    } else {
        enableStuffedAnimalBtn();
        enableColoringBookBtn();
    }
};

setInterval(() => {
    checkHappiness();
}, 1000);

const checkFun = () => {
    if (fun >= 10) {
        disableTrampolineBtn();
        disableBaseballSetBtn();
    } else {
        enableTrampolineBtn();
        enableBaseballSetBtn();
    }
};

setInterval(() => {
    checkFun();
}, 1000);

//hide/show settings
const showFoodOptions = () => {
    disableFoodOptionsBtn();
    foodOptionsBtn.classList.add('hidden');
    cookieBtn.classList.remove('hidden');
    cerealBtn.classList.remove('hidden');
};

const showHappinessOptions = () => {
    disableHappinessOptionsBtn();
    happinessOptionsBtn.classList.add('hidden');
    stuffedAnimalBtn.classList.remove('hidden');
    coloringBookBtn.classList.remove('hidden');
};

const showFunOptions = () => {
    disableFunOptionsBtn();
    funOptionsBtn.classList.add('hidden');
    trampolineBtn.classList.remove('hidden');
    baseballSetBtn.classList.remove('hidden');
};

const showAllOptions = () => {
    foodOptionsBtn.classList.remove('hidden');
    cookieBtn.classList.add('hidden');
    cerealBtn.classList.add('hidden');

    happinessOptionsBtn.classList.remove('hidden');
    stuffedAnimalBtn.classList.add('hidden');
    coloringBookBtn.classList.add('hidden');

    funOptionsBtn.classList.remove('hidden');
    trampolineBtn.classList.add('hidden');
    baseballSetBtn.classList.add('hidden');
}

//increments hunger down on a 6 second timer using a random integer between 1-3
const lowerHunger = () => {
    hungerTimerInterval = setInterval(() => {
        //grab random integer first
        let randomInteger = Math.floor(Math.random() * 3) + 1;
        hunger = hunger - randomInteger;
        hungerDisplay.innerHTML = `${hunger} <br> hunger`;

        if (hunger <= 0) {
            //keep hunger at 0
            hunger = 0;
            lossMsg();
            retryBtn.classList.remove('hidden');
            //add loss() to switch to sleeping class png
            stopDayTimer();
            stopHungerTimer();
            updateActionsOptions();
            disableFoodOptionsBtn();
            disableHappinessOptionsBtn();
            disableFunOptionsBtn();

            hungerDisplay.classList.add('hidden');
            happinessDisplay.classList.add('hidden');
            funDisplay.classList.add('hidden');

            foodOptionsBtn.classList.add('hidden');
            happinessOptionsBtn.classList.add('hidden');
            funOptionsBtn.classList.add('hidden');
            //when player loses, don't run anything else below
            return;
            //TO DO: trigger sleeping class
        }

        if (hunger < 10) {
            enableFoodOptionsBtn();
        }
    }, 20000);
};

const lowerHappiness = () => {
    happinessTimerInterval = setInterval(() => {
        //grab random integer first
        let randomInteger = Math.floor(Math.random() * 3) + 1;
        happiness = happiness - randomInteger;
        happinessDisplay.innerHTML = `${happiness} <br> happiness`;

        if (happiness <= 0) {
            //keep hunger at 0
            lossMsg();
            retryBtn.classList.remove('hidden');
            //add loss() to switch to sleeping class png
            stopDayTimer();
            stopHungerTimer();
            updateActionsOptions();
            disableFoodOptionsBtn();
            disableHappinessOptionsBtn();
            disableFunOptionsBtn();

            hungerDisplay.classList.add('hidden');
            happinessDisplay.classList.add('hidden');
            funDisplay.classList.add('hidden');

            foodOptionsBtn.classList.add('hidden');
            happinessOptionsBtn.classList.add('hidden');
            funOptionsBtn.classList.add('hidden');
            //when player loses, don't run anything else below
            return;
            //TO DO: trigger sleeping class
        }

        if (happiness < 10) {
            enableHappinessOptionsBtn();
        }
    }, 12000);
};

const lowerFun = () => {
    funTimerInterval = setInterval(() => {
        //grab random integer first
        let randomInteger = Math.floor(Math.random() * 3) + 1;
        fun = fun - randomInteger;
       funDisplay.innerHTML = `${fun} <br> fun`;

        if (fun <= 0) {
            //keep hunger at 0
            fun = 0;
            lossMsg();
            retryBtn.classList.remove('hidden');
            //add loss() to switch to sleeping class png
            stopDayTimer();
            stopHungerTimer();
            updateActionsOptions();
            disableFoodOptionsBtn();
            disableHappinessOptionsBtn();
            disableFunOptionsBtn();

            hungerDisplay.classList.add('hidden');
            happinessDisplay.classList.add('hidden');
            funDisplay.classList.add('hidden');

            foodOptionsBtn.classList.add('hidden');
            happinessOptionsBtn.classList.add('hidden');
            funOptionsBtn.classList.add('hidden');
            //when player loses, don't run anything else below
            return;
            //TO DO: trigger sleeping class
        }

        if (fun < 10) {
            enableFunOptionsBtn();
        }
    }, 16000);
};

//food
const addCookie = () => {
    //need to have this function check the hunger value, so if hunger changes, this logic is rechecked
    checkHunger();
    
    if (hunger + cookie <= 10) {
        hunger += cookie;
        hungerDisplay.innerHTML = `${hunger} <br> hunger`;
    }

    if (hunger + cookie > 10) {
        hunger = 10;
        hungerDisplay.innerHTML = `${hunger} <br> hunger`;
    };

    hungerDisplay.innerHTML = `${hunger} <br> hunger`;
    showAllOptions();
};

const addCereal = () => {
    checkHunger();
    
    if (hunger + cereal <= 10) {
        hunger += cereal;
        hungerDisplay.innerHTML = `${hunger} <br> hunger`;
    }

    if (hunger + cereal > 10) {
        hunger = 10;
        hungerDisplay.innerHTML = `${hunger} <br> hunger`;
    };

    hungerDisplay.innerHTML = `${hunger} <br> hunger`;
    showAllOptions();
};

//toys
const addStuffedAnimal = () => {
    checkHappiness();
    
    if (happiness + stuffedAnimal <= 10) {
        happiness += stuffedAnimal;
        happinessDisplay.innerHTML = `${happiness} <br> happiness`;
    }

    if (happiness + stuffedAnimal > 10) {
        happiness = 10;
        happinessDisplay.innerHTML = `${happiness} <br> happiness`;
    };

    happinessDisplay.innerHTML = `${happiness} <br> happiness`;
    showAllOptions();
};

const addColoringBook = () => {
    checkHappiness();
    
    if (happiness + coloringBook <= 10) {
        happiness += coloringBook;
        happinessDisplay.innerHTML = `${happiness} <br> happiness`;
    }

    if (happiness + coloringBook > 10) {
        happiness = 10;
        happinessDisplay.innerHTML = `${happiness} <br> happiness`;
    };

    happinessDisplay.innerHTML = `${happiness} <br> happiness`;
    showAllOptions();
};

//exercise
const addTrampoline = () => {
    checkFun();
    
    if (fun + trampoline <= 10) {
        fun += trampoline;
        funDisplay.innerHTML = `${fun} <br> fun`;
    }

    if (fun + trampoline > 10) {
        fun = 10;
        funDisplay.innerHTML = `${fun} <br> fun`;
    };

    funDisplay.innerHTML = `${fun} <br> fun`;
    showAllOptions();
};

const addBaseballSet = () => {
    checkFun();
    
    if (fun + baseballSet <= 10) {
        fun += baseballSet;
        funDisplay.innerHTML = `${fun} <br> fun`;
    }

    if (fun + baseballSet > 10) {
        fun = 10;
        funDisplay.innerHTML = `${fun} <br> fun`;
    };

    funDisplay.innerHTML = `${fun} <br> fun`;
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
    happiness = 10;
    fun = 10;

    updateActionsOptions();

    timerDisplay.innerHTML = `Day ${day}:`;
    dayTimer();

    hungerDisplay.classList.remove('hidden');
    hungerDisplay.innerHTML = `${hunger} <br> hunger`;
    lowerHunger();

    foodOptionsBtn.classList.remove('hidden');
    cookieBtn.classList.add('hidden');
    cerealBtn.classList.add('hidden');

    happinessDisplay.classList.remove('hidden');
    happinessDisplay.innerHTML = `${happiness} <br> happiness`;
    lowerHappiness();

    happinessOptionsBtn.classList.remove('hidden');
    stuffedAnimalBtn.classList.add('hidden');
    coloringBookBtn.classList.add('hidden');

    funDisplay.classList.remove('hidden');
    funDisplay.innerHTML = `${fun} <br> fun`;
    lowerFun();

    funOptionsBtn.classList.remove('hidden');
    trampolineBtn.classList.add('hidden');
    baseballSetBtn.classList.add('hidden');

    continueBtn.classList.add('hidden');
    retryBtn.classList.add('hidden');

    //reset fun
    //change to idle png class
};



//loss()
//resetDay()
//sleeping png class
//buttons to retry()



// =======================================================================================================

//button controls

//food toggles
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

//happiness toggles
const disableHappinessOptionsBtn = () => {
    happinessOptionsBtn.disabled = true;
};
const enableHappinessOptionsBtn = () => {
    happinessOptionsBtn.disabled = false;
};

const disableStuffedAnimalBtn = () => {
    stuffedAnimalBtn.disabled = true;
};
const enableStuffedAnimalBtn = () => {
    stuffedAnimalBtn.disabled = false;
};

const disableColoringBookBtn = () => {
    coloringBookBtn.disabled = true;
};
const enableColoringBookBtn = () => {
    coloringBookBtn.disabled = false;
};

//fun toggles
const disableFunOptionsBtn = () => {
    funOptionsBtn.disabled = true;
};
const enableFunOptionsBtn = () => {
    funOptionsBtn.disabled = false;
};

const disableTrampolineBtn = () => {
    trampolineBtn.disabled = true;
};
const enableTrampolineBtn = () => {
    trampolineBtn.disabled = false;
};

const disableBaseballSetBtn = () => {
    baseballSetBtn.disabled = true;
};
const enableBaseballSetBtn = () => {
    baseballSetBtn.disabled = false;
};

const updateActionsOptions = () => {
    screen.classList.toggle("actions-active");
};


// ========================================================================================================

foodOptionsBtn.addEventListener("click", function (event) {
    event.preventDefault();
    updateActionsOptions();
    showFoodOptions();
});

cookieBtn.addEventListener("click", function (event) {
    addCookie();
    updateActionsOptions();
});
cerealBtn.addEventListener("click", function (event) {
    addCereal();
    updateActionsOptions();
});

continueBtn.addEventListener("click", function (event) {
    nextDay();
});
retryBtn.addEventListener("click", function (event) {
    retry();
});

happinessOptionsBtn.addEventListener("click", function (event) {
    event.preventDefault();
    updateActionsOptions();
    showHappinessOptions();
});

stuffedAnimalBtn.addEventListener("click", function (event) {
    addStuffedAnimal();
    updateActionsOptions();
});
coloringBookBtn.addEventListener("click", function (event) {
    addColoringBook();
    updateActionsOptions();
});

funOptionsBtn.addEventListener("click", function (event) {
    event.preventDefault();
    updateActionsOptions();
    showFunOptions();
});

trampolineBtn.addEventListener("click", function (event) {
    addTrampoline();
    updateActionsOptions();
});
baseballSetBtn.addEventListener("click", function (event) {
    addBaseballSet();
    updateActionsOptions();
});

//=========================================================================================================

//stuff to do on page load
//from MDN web docs window.onload
window.onload = () => {
    //binding timer to start onload
    imageMapResize();
    dayTimer();
    hungerDisplay.innerHTML = `${hunger} <br> hunger`;
    happinessDisplay.innerHTML = `${happiness} <br> happiness`;
    funDisplay.innerHTML = `${fun} <br> fun`;
    
    timerDisplay.innerHTML = `Day 1:`;
    lowerHunger();
    lowerHappiness();
    lowerFun();
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
