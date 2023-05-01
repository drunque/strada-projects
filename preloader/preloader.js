const preloader = document.querySelector(".preloader");

const fadeOutEffect = setInterval(() => {
    if (!preloader.style.opacity) {
      preloader.style.opacity = 1;
    }
    if (preloader.style.opacity > 0) {
      preloader.style.opacity -= 0.1;
    } else {
      clearInterval(fadeOutEffect);
      preloader.classList.add("none");
    }
  }, 50);

window.addEventListener("load", () => {
  fadeOutEffect();
});
