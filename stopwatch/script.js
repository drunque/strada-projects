const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#restart");
const timeNode = document.querySelector("#time");

function Stopwatch(displayFunc) {
  let count = 0;
  const initialTime = formatTime(0);
  let isOn = false;
  let timer;

  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = Math.floor(time % 60);

    const format = (time) => `${time < 10 ? `0${time}` : time}`;
    return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
  }

  return {
    start() {
      if (!isOn) {
        isOn = true;
        timer = setInterval(() => {
          displayFunc(formatTime(++count))
        }, 1000);
      }
    },
    pause() {
      if (isOn) {
        isOn = false;
        clearInterval(timer);
      }
    },
    stop() {
      isOn = false;
      count = 0;
      clearInterval(timer);
      displayFunc(initialTime)
    },
  };
}

function displayTime(time) {
  timeNode.textContent = time;
}

const stopwatch = Stopwatch(displayTime);

startButton.addEventListener("click", stopwatch.start);
pauseButton.addEventListener("click", stopwatch.pause);
stopButton.addEventListener("click", stopwatch.stop);
