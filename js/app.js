//KNOWN BUGS
//when a value reaches 0 OR timer reaches 0 while an option menu is open, loss mechanic goes wonky with options open

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
const backBtn = document.querySelector('#backBtn');

const continueBtn = document.querySelector('#continueBtn');
const retryBtn = document.querySelector('#retryBtn');

const cookieBtn = document.querySelector("#cookieBtn");
const cerealBtn = document.querySelector("#cerealBtn");

const stuffedAnimalBtn = document.querySelector("#stuffedAnimalBtn");
const coloringBookBtn = document.querySelector("#coloringBookBtn");

const trampolineBtn = document.querySelector("#trampolineBtn");
const baseballSetBtn = document.querySelector("#baseballSetBtn");

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

//timers uniquely named and stored globally so it can be accessed/stopped from other functions
let dayTimerInterval;
let hungerTimerInterval;
let happinessTimerInterval;
let funTimerInterval;

// === win / lose =============================================================================================

const successMsg = () => {
    timerDisplay.innerHTML = "Congrats! You survived the day. Continue?";
};

const lossMsg = () => {
    timerDisplay.innerHTML = "Your Tamagotchi fell asleep! Try again?";
};

// === day timer ===============================================================================================

//need to be able to stop the timer from other functions
const stopDayTimer = () => {
    clearInterval(dayTimerInterval);
};

//1000 milliseconds = 1 second
const dayTimer = () => {
    //start timer at 3:00 and have it count down
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

        if (timeLeft === 0 && hunger > 0 | timeLeft === 0 && happiness > 0 | timeLeft === 0 &&  fun > 0) {
            stopDayTimer();
            console.log("daytimer");
            updateActionsOptions();
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

// === run checks and keep options updated ======================================================================

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

// === hide / show settings ================================================================

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

// === timers =========================================================================================

//stop timers
const stopHungerTimer = () => {
    clearInterval(hungerTimerInterval);
};

const stopHappinessTimer = () => {
    clearInterval(happinessTimerInterval);
}

const stopFunTimer = () => {
    clearInterval(funTimerInterval);
};

//increments hunger down on a timer using a random integer between 1-3
const lowerHunger = () => {
    hungerTimerInterval = setInterval(() => {
        //grab random integer to use first
        let randomInteger = Math.floor(Math.random() * 3) + 1;
        hunger = hunger - randomInteger;
        hungerDisplay.innerHTML = `${hunger} <br> hunger`;

        if (hunger <= 0) {
            //keep hunger at 0
            hunger = 0;

            updateActionsOptions();
            lossMsg();
            sleeping();
            retryBtn.classList.remove('hidden');
            
            //stop timers
            stopDayTimer();
            stopHungerTimer();
            stopHappinessTimer();
            stopFunTimer();
            
            //disable buttons
            disableFoodOptionsBtn();
            disableHappinessOptionsBtn();
            disableFunOptionsBtn();

            //hide things we can't use
            hungerDisplay.classList.add('hidden');
            happinessDisplay.classList.add('hidden');
            funDisplay.classList.add('hidden');

            foodOptionsBtn.classList.add('hidden');
            happinessOptionsBtn.classList.add('hidden');
            funOptionsBtn.classList.add('hidden');

            //when player loses, don't run anything else below
            return;
        }

        if (hunger < 10) {
            enableFoodOptionsBtn();
        }
    }, 20000);
};

const lowerHappiness = () => {
    happinessTimerInterval = setInterval(() => {
        //grab random integer to use first
        let randomInteger = Math.floor(Math.random() * 3) + 1;
        happiness = happiness - randomInteger;
        happinessDisplay.innerHTML = `${happiness} <br> happiness`;

        if (happiness <= 0) {
            //keep happiness at 0
            happiness = 0;

            updateActionsOptions();
            lossMsg();
            sleeping();
            retryBtn.classList.remove('hidden');
            
            //stop timers
            stopDayTimer();
            stopHungerTimer();
            stopHappinessTimer();
            stopFunTimer();

            //disable buttons
            disableFoodOptionsBtn();
            disableHappinessOptionsBtn();
            disableFunOptionsBtn();

            //hide stuff we can't use
            hungerDisplay.classList.add('hidden');
            happinessDisplay.classList.add('hidden');
            funDisplay.classList.add('hidden');

            foodOptionsBtn.classList.add('hidden');
            happinessOptionsBtn.classList.add('hidden');
            funOptionsBtn.classList.add('hidden');

            //when player loses, don't run anything else below
            return;
            
        }

        if (happiness < 10) {
            enableHappinessOptionsBtn();
        }
    }, 12000);
};

const lowerFun = () => {
    funTimerInterval = setInterval(() => {
        //grab random integer to use first
        let randomInteger = Math.floor(Math.random() * 3) + 1;
        fun = fun - randomInteger;
       funDisplay.innerHTML = `${fun} <br> fun`;

        if (fun <= 0) {
            //keep hunger at 0
            fun = 0;
            
            updateActionsOptions();
            sleeping();
            lossMsg();
            retryBtn.classList.remove('hidden');

            //stop timers
            stopDayTimer();
            stopHungerTimer();
            stopHappinessTimer();
            stopFunTimer();
            
            //disable buttons
            disableFoodOptionsBtn();
            disableHappinessOptionsBtn();
            disableFunOptionsBtn();

            //hide stuff we can't use
            hungerDisplay.classList.add('hidden');
            happinessDisplay.classList.add('hidden');
            funDisplay.classList.add('hidden');

            foodOptionsBtn.classList.add('hidden');
            happinessOptionsBtn.classList.add('hidden');
            funOptionsBtn.classList.add('hidden');

            //when player loses, don't run anything else below
            return;

        }

        if (fun < 10) {
            enableFunOptionsBtn();
        }
    }, 16000);
};

// === math for items ================================================================================================

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

//gifts
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

//play
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
// === day mechanics ==================================================================================================

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

    updateActionsOptions();
    awake();    
   
};

// === button controls ===========================================================================================

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

// === animations ======================================================================

const eatingAnimation = () => {
    let tamagotchi = document.getElementById("tamagotchi");
    let isIdle = false;
    let intervalCount = 0;

    // start toggling
    let interval = setInterval(() => {
        if (isIdle) {
            tamagotchi.classList.add("eating");
            tamagotchi.classList.remove("idle");
        } else {
            tamagotchi.classList.add("idle");
            tamagotchi.classList.remove("eating");
        }

        // toggle state
        isIdle = !isIdle; 
        intervalCount++;

        // stop after 3 seconds
        if (intervalCount >= 6) {
            clearInterval(interval);
            // ensure toggling ends on idle
            tamagotchi.classList.add("idle");
            tamagotchi.classList.remove("eating");
        }
    }, 500);
}

const happyAnimation = () => {
    let tamagotchi = document.getElementById("tamagotchi");
    let isIdle = false;
    let intervalCount = 0;

    // start toggling
    let interval = setInterval(() => {
        if (isIdle) {
            tamagotchi.classList.add("happy");
            tamagotchi.classList.remove("idle");
        } else {
            tamagotchi.classList.add("idle");
            tamagotchi.classList.remove("happy");
        }

        // toggle state
        isIdle = !isIdle; 
        intervalCount++;

        // stop after 3 seconds
        if (intervalCount >= 6) {
            clearInterval(interval);
            // ensure toggling ends on idle
            tamagotchi.classList.add("idle");
            tamagotchi.classList.remove("happy");
        }
    }, 500);
}

const excitedAnimation = () => {
    let tamagotchi = document.getElementById("tamagotchi");
    let isIdle = false;
    let intervalCount = 0;

    // start toggling
    let interval = setInterval(() => {
        if (isIdle) {
            tamagotchi.classList.add("excited");
            tamagotchi.classList.remove("idle");
        } else {
            tamagotchi.classList.add("idle");
            tamagotchi.classList.remove("excited");
        }

        // toggle state
        isIdle = !isIdle; 
        intervalCount++;

        // stop after 3 seconds
        if (intervalCount >= 6) {
            clearInterval(interval);
            // ensure toggling ends on idle
            tamagotchi.classList.add("idle");
            tamagotchi.classList.remove("excited");
        }
    }, 500);
}

const sleeping = () => {
    let tamagotchi = document.getElementById("tamagotchi");

    tamagotchi.classList = "";
    tamagotchi.classList.add("sleeping");
};

const awake = () => {
    let tamagotchi = document.getElementById("tamagotchi");

    tamagotchi.classList = "";
    tamagotchi.classList.add("idle");
};

// === listeners ===============================================================================================

backBtn.addEventListener("click", function (event) {
    backBtn.classList.add('hidden');
    showAllOptions();
    updateActionsOptions();
});



foodOptionsBtn.addEventListener("click", function (event) {
    event.preventDefault();
    updateActionsOptions();
    backBtn.classList.remove('hidden');
    showFoodOptions();
});

cookieBtn.addEventListener("click", function (event) {
    eatingAnimation();
    addCookie();
    updateActionsOptions();
});
cerealBtn.addEventListener("click", function (event) {
    eatingAnimation();
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
    backBtn.classList.remove('hidden');
    showHappinessOptions();
});

stuffedAnimalBtn.addEventListener("click", function (event) {
    happyAnimation();
    addStuffedAnimal();
    updateActionsOptions();
});
coloringBookBtn.addEventListener("click", function (event) {
    happyAnimation();
    addColoringBook();
    updateActionsOptions();
});



funOptionsBtn.addEventListener("click", function (event) {
    event.preventDefault();
    updateActionsOptions();
    backBtn.classList.remove('hidden');
    showFunOptions();
});

trampolineBtn.addEventListener("click", function (event) {
    excitedAnimation();
    addTrampoline();
    updateActionsOptions();
});
baseballSetBtn.addEventListener("click", function (event) {
    excitedAnimation();
    addBaseballSet();
    updateActionsOptions();
});

//=== stuff to run when page loads ====================================================================================

//from MDN web docs window.onload
window.onload = () => {
    //checks user browser window size and maps clickable image
    imageMapResize();
    //binding timer to start onload
    dayTimer();
    hungerDisplay.innerHTML = `${hunger} <br> hunger`;
    happinessDisplay.innerHTML = `${happiness} <br> happiness`;
    funDisplay.innerHTML = `${fun} <br> fun`;
    
    timerDisplay.innerHTML = `Day 1:`;
    lowerHunger();
    lowerHappiness();
    lowerFun();
};
