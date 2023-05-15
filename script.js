let timerElement = document.getElementById("timer");
let controlTimerElement = document.getElementById("control-timer");
let minutesElement = document.getElementById("minutes");
let secondsElement = document.getElementById("seconds");

let timer = null;
let countdown = 0;

timerElement.addEventListener('click', function() {
  // Show the control timer
  controlTimerElement.style.display = 'flex';
});

function updateCountdown() {
  let minutes = Math.floor(countdown / 60).toString().padStart(2, '0');
  let seconds = (countdown % 60).toString().padStart(2, '0');
  timerElement.textContent = `${minutes}:${seconds}`;

  if (countdown > 0) {
    countdown--;
  } else {
    clearInterval(timer);
  }
}

// Add wheel event listener to increment or decrement the value
minutesElement.addEventListener('wheel', function(event) {
  event.preventDefault();
  let newValue = parseInt(minutesElement.value) - Math.sign(event.deltaY);
  if(newValue >= 0 && newValue <= 59) {
    minutesElement.value = newValue.toString().padStart(2, '0');
    countdown = minutesElement.value * 60 + secondsElement.value * 1; // Multiply minutes by 60 to convert to seconds
    updateCountdown();
  }
});

secondsElement.addEventListener('wheel', function(event) {
  event.preventDefault();
  let newValue = parseInt(secondsElement.value) - Math.sign(event.deltaY);
  if(newValue >= 0 && newValue <= 59) {
    secondsElement.value = newValue.toString().padStart(2, '0');
    countdown = minutesElement.value * 60 + secondsElement.value * 1; // Multiply minutes by 60 to convert to seconds
    updateCountdown();
  }
});

// Hide the control timer and start the countdown when the inputs lose focus
minutesElement.addEventListener('blur', function() {
  controlTimerElement.style.display = 'none';
  if (timer !== null) { // Check if a timer is already running
    clearInterval(timer); // Clear the existing timer
  }
  timer = setInterval(updateCountdown, 1000); // Start a new timer
});

secondsElement.addEventListener('blur', function() {
  controlTimerElement.style.display = 'none';
  if (timer !== null) { // Check if a timer is already running
    clearInterval(timer); // Clear the existing timer
  }
  timer = setInterval(updateCountdown, 1000); // Start a new timer
});
