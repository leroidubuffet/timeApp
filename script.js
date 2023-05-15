let timer = document.getElementById("timer");

function updateTime() {
  let date = new Date();
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let seconds = date.getSeconds().toString().padStart(2, '0');
  timer.textContent = `${minutes}:${seconds}`;
}

setInterval(updateTime, 1000);
