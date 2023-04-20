const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#restart");
const timeNode = document.querySelector("#time");

function createStopwatch() {
  let count = 0;
  let isOn = false;
  let timer;
  const initialTime = formatTime(0);

  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    const format = (time) => `${time < 10 ? `0${time}` : time}`;
    return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
  }

  return {
    start() {
      if (!isOn) {
        timer = setInterval(() => {
          timeNode.textContent = formatTime(++count);
        }, 1000);
        isOn = true;
      }
    },
    pause() {
      if (isOn) {
        clearInterval(timer);
        isOn = false;
      }
    },
    stop() {
      count = 0;
      timeNode.textContent = initialTime;
      clearInterval(timer);
    },
    isOn() {
      return isOn;
    },
  };
}

const stopwatch = createStopwatch();

startButton.addEventListener("click", () => {
  if (!stopwatch.isOn()) {
    stopwatch.start();
  }
});

pauseButton.addEventListener("click", () => {
  if (stopwatch.isOn()) {
    stopwatch.pause();
  }
});

stopButton.addEventListener("click", () => {
  stopwatch.stop();
});
