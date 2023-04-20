const buttons = document.querySelectorAll(".button");

buttons.forEach((mainButton) => {
  mainButton.addEventListener("click", () => {
    buttons.forEach((button) => {
      if (button !== mainButton) {
        button.classList.remove("button-active");
      }
    });
    mainButton.classList.add("button-active");
  });
});
