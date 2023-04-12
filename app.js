// DOM Elements
const timerEl = document.getElementById('timer');
const minutesEl = timerEl.querySelector('.minutes');
const secondsEl = timerEl.querySelector('.seconds');
const separatorEl = timerEl.querySelector('.separator');
const minutesControl = document.getElementById('minutes-control');
const secondsControl = document.getElementById('seconds-control');

// State Variables
let intervalId = null;
let isRunning = false;

// Event Listeners
separatorEl.addEventListener('dblclick', resetTimer);
minutesEl.addEventListener('click', showMinutesControl);
secondsEl.addEventListener('click', showSecondsControl);
timerEl.addEventListener('click', handleClick);
minutesControl.addEventListener('click', handleControlClick);
secondsControl.addEventListener('click', handleControlClick);

// Initialize
createControlNumbers(minutesControl, 60);
createControlNumbers(secondsControl, 59);
toggleControls(false);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(
            registration => {
                console.log('ServiceWorker registered: ', registration);
            },
            err => {
                console.error('ServiceWorker registration failed: ', err);
            }
        );
    });
}

// Functions
function resetTimer() {
    if (!isRunning) {
        updateDisplay(0, 0);
        hideAllIndicators();
        hideAllMessages();
    }
}

function showMinutesControl() {
    if (!isRunning) {
        toggleControls(true);
        minutesControl.classList.add('active');
    }
}

function showSecondsControl() {
    if (!isRunning) {
        toggleControls(true);
        secondsControl.classList.add('active');
    }
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function createControlNumbers(el, max) {
    for (let i = 0; i <= max; i++) {
        const div = document.createElement('div');
        div.textContent = pad(i);
        div.dataset.value = i;
        el.appendChild(div);
    }
}

function updateDisplay(minutes, seconds) {
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
}

function toggleControls(visible) {
    minutesControl.style.display = visible ? 'block' : 'none';
    secondsControl.style.display = visible ? 'block' : 'none';
    timerEl.style.opacity = visible ? '0.2' : '1';
}

function startTimer(minutes, seconds) {
    clearInterval(intervalId);
    const totalTime = minutes * 60 + seconds;
    const halfTime = Math.floor(totalTime / 2);
    const fiveMinutesLeft = 5 * 60;
    const oneMinuteLeft = 60;

    const halfTimeGoneElement = document.getElementById('half-time-gone');
    const fiveMinutesLeftElement = document.getElementById('five-minutes-left');
    const oneMinuteLeftElement = document.getElementById('one-minute-left');

    intervalId = setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }
        if (minutes < 0) {
            minutes = 0;
            seconds = 0;
            clearInterval(intervalId);
            isRunning = false;
        }

        const timeLeft = minutes * 60 + seconds;
        if (timeLeft === halfTime && totalTime >= 120) {
            hideAllMessages();
            halfTimeGoneElement.classList.remove('hidden');
        } else if (timeLeft === fiveMinutesLeft && totalTime >= 600) {
            hideAllMessages();
            fiveMinutesLeftElement.classList.remove('hidden');
        } else if (timeLeft === oneMinuteLeft && totalTime >= 180) {
            hideAllMessages();
            oneMinuteLeftElement.classList.remove('hidden');        
        } else if (timeLeft === 0) {
            hideAllMessages();
        }
        updateDisplay(minutes, seconds);
    }, 1000);}

function handleClick(event) {
    const minutesValue = parseInt(minutesEl.textContent, 10);
    const secondsValue = parseInt(secondsEl.textContent, 10);

    if (isRunning) {
        clearInterval(intervalId);
        toggleControls(true);
    } else if (minutesValue !== 0 || secondsValue !== 0) {
        startTimer(minutesValue, secondsValue);
        toggleControls(false);
    }
    isRunning = !isRunning && (minutesValue !== 0 || secondsValue !== 0);
}

function handleControlClick(event) {
    const value = parseInt(event.target.dataset.value, 10);
    if (event.currentTarget === minutesControl) {
        minutesEl.textContent = pad(value);
        minutesControl.classList.remove('active');
    } else {
        secondsEl.textContent = pad(value);
        secondsControl.classList.remove('active');
    }
    toggleControls(false);
}

function hideAllIndicators() {
    document.querySelectorAll('.indicator').forEach(indicator => {
        indicator.classList.add('hidden');
    });
}

function hideAllMessages() {
    document.querySelectorAll('.message').forEach(message => {
        message.classList.add('hidden');
    });
}
