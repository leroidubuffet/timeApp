const timerEl = document.getElementById('timer');
const minutesEl = timerEl.querySelector('.minutes');
const secondsEl = timerEl.querySelector('.seconds');
const minutesControl = document.getElementById('minutes-control');
const secondsControl = document.getElementById('seconds-control');

let intervalId = null;
let isRunning = false;

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
        updateDisplay(minutes, seconds);
    }, 1000);
}

function handleClick(event) {
    if (isRunning) {
        clearInterval(intervalId);
        toggleControls(true);
    } else {
        startTimer(parseInt(minutesEl.textContent, 10), parseInt(secondsEl.textContent, 10));
        toggleControls(false);
    }
    isRunning = !isRunning;
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
