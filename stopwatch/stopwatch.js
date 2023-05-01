export function Stopwatch(displayTime) {
  let count = 0;
  let isOn = false;
  let timerID;

  function formatTime(time) {
    const hours = Math.floor(time / 60 ** 2);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = Math.floor(time % 60);

    const format = (time) => `${time < 10 ? `0${time}` : time}`;
    return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
  }

  return {
    start() {
      if (!isOn) {
        isOn = true;
        timerID = setInterval(() => {
          displayTime(formatTime(++count))
        }, 1000);
      }
    },
    pause() {
      if (isOn) {
        isOn = false;
        clearInterval(timerID);
      }
    },
    stop() {
      isOn = false;
      count = 0;
      clearInterval(timerID);
      displayTime(formatTime(count))
    },
  };
}