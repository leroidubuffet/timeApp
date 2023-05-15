let timerElement = document.getElementById("timer");
let controlTimerElement = document.getElementById("control-timer");
let minutesElement = document.getElementById("minutes");
let secondsElement = document.getElementById("seconds");

let timer = null;
let countdown = 0;
let timerRunning = false;

let deltaThreshold = 100;
let deltaAccumulator = 0;


timerElement.addEventListener('dblclick', function() {
  // Show the control timer
  controlTimerElement.style.display = 'flex';
});

// Add click event listener to the entire document
document.addEventListener('click', function() {
	// Only start/stop the timer if the control timer is not displayed
	if (controlTimerElement.style.display !== 'flex') {
	  // Check if the timer is already running
	  if (timer !== null) {
		// Stop the timer
		clearInterval(timer);
		timer = null;
	  } else {
		// Start the timer
		timer = setInterval(updateCountdown, 1000);
	  }
	}
  });
  
  function updateCountdown() {
	let minutes = Math.floor(countdown / 60).toString().padStart(2, '0');
	let seconds = (countdown % 60).toString().padStart(2, '0');
	timerElement.textContent = `${minutes}:${seconds}`;
  
	if (countdown > 0) {
	  countdown--;
	} else {
	  clearInterval(timer);
	  timer = null;
	}
  }

// Add wheel event listener to increment or decrement the value
minutesElement.addEventListener('wheel', function(event) {
  event.preventDefault();
  deltaAccumulator += event.deltaY;
  if (Math.abs(deltaAccumulator) > deltaThreshold) {
    let newValue = parseInt(minutesElement.value) - Math.sign(deltaAccumulator);
    if(newValue >= 0 && newValue <= 59) {
      minutesElement.value = newValue.toString().padStart(2, '0');
      countdown = minutesElement.value * 60 + secondsElement.value * 1;
      updateCountdown();
    }
    deltaAccumulator = 0;  // Reset the accumulator
  }
});

secondsElement.addEventListener('wheel', function(event) {
  event.preventDefault();
  deltaAccumulator += event.deltaY;
  if (Math.abs(deltaAccumulator) > deltaThreshold) {
    let newValue = parseInt(secondsElement.value) - Math.sign(deltaAccumulator);
    if(newValue >= 0 && newValue <= 59) {
      secondsElement.value = newValue.toString().padStart(2, '0');
      countdown = minutesElement.value * 60 + secondsElement.value * 1;
      updateCountdown();
    }
    deltaAccumulator = 0;  // Reset the accumulator
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
