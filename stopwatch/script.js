import { Stopwatch } from "./stopwatch.js";

const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#stop");
const timeNode = document.querySelector("#time");

function displayTime(time) {
  timeNode.textContent = time;
}

const stopwatch = Stopwatch(displayTime);

startButton.addEventListener("click", stopwatch.start);
pauseButton.addEventListener("click", stopwatch.pause);
stopButton.addEventListener("click", stopwatch.stop);
