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

minutesElement.addEventListener('change', function() {
  countdown = minutesElement.value * 60 + secondsElement.value * 1; // Multiply minutes by 60 to convert to seconds
  updateCountdown();
});

secondsElement.addEventListener('change', function() {
  countdown = minutesElement.value * 60 + secondsElement.value * 1; // Multiply minutes by 60 to convert to seconds
  updateCountdown();
});

// Start the countdown
timer = setInterval(updateCountdown, 1000);

// Hide the control timer and start the countdown when the inputs lose focus
minutesElement.addEventListener('blur', function() {
  controlTimerElement.style.display = 'none';
  timer = setInterval(updateCountdown, 1000);
});

secondsElement.addEventListener('blur', function() {
  controlTimerElement.style.display = 'none';
  timer = setInterval(updateCountdown, 1000);
});
