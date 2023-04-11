const timerEl = document.getElementById('timer');
const minutesEl = timerEl.querySelector('.minutes');
const secondsEl = timerEl.querySelector('.seconds');
const minutesControl = document.getElementById('minutes-control');
const secondsControl = document.getElementById('seconds-control');
const halfTimeElement = document.getElementById('half-time');
const separatorEl = timerEl.querySelector('.separator');

let intervalId = null;
let isRunning = false;

separatorEl.addEventListener('dblclick', () => {
    if (!isRunning) {
        updateDisplay(0, 0);
        hideAllIndicators();
    }
});

minutesEl.addEventListener('click', () => {
    if (!isRunning) {
        toggleControls(true);
        minutesControl.classList.add('active');
    }
});

secondsEl.addEventListener('click', () => {
    if (!isRunning) {
        toggleControls(true);
        secondsControl.classList.add('active');
    }
});

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
    const quarterTime = Math.floor(totalTime / 4);
    const halfTime = Math.floor(totalTime / 2);
    const thirdTime = Math.floor(totalTime / 3);
    const twoThirdsTime = Math.floor((totalTime * 2) / 3);
    const threeQuartersTime = Math.floor((totalTime * 3) / 4);
    
    const halfTimeElement = document.getElementById('half-time');
    const quarterTimeElement = document.getElementById('quarter-time');
    const thirdTimeElement = document.getElementById('third-time');
    const twoThirdsTimeElement = document.getElementById('two-thirds-time');
    const threeQuartersTimeElement = document.getElementById('three-quarters-time');

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
        if (timeLeft === quarterTime) {
            hideAllIndicators();
            quarterTimeElement.classList.remove('hidden');
        } else if (timeLeft === halfTime) {
            hideAllIndicators();
            halfTimeElement.classList.remove('hidden');
        } else if (timeLeft === thirdTime) {
            hideAllIndicators();
            thirdTimeElement.classList.remove('hidden');
        } else if (timeLeft === twoThirdsTime) {
            hideAllIndicators();
            twoThirdsTimeElement.classList.remove('hidden');
        } else if (timeLeft === threeQuartersTime) {
            hideAllIndicators();
            threeQuartersTimeElement.classList.remove('hidden');
        } else if (timeLeft === 0) {
            hideAllIndicators();
        }
        updateDisplay(minutes, seconds);
    }, 1000);
}

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

createControlNumbers(minutesControl, 60);
createControlNumbers(secondsControl, 59);
toggleControls(false);

timerEl.addEventListener('click', handleClick);
minutesControl.addEventListener('click', handleControlClick);
secondsControl.addEventListener('click', handleControlClick);

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
