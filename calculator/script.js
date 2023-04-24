import { calc } from "./calc.js";

const resultButton = document.querySelector("#result-button");
const results = document.querySelector(".results");
resultButton.addEventListener("click", () => {
  const numbers = Array.from(document.querySelectorAll("input")).map(
    (node) => Number.parseFloat(node.value)
  );
  const operation = document.querySelector(".current div").dataset.value;
  const result = calc(...numbers, operation);
  const resultNode = document.querySelector("#result");

  if (result) resultNode.textContent = result.value;

  const historyResult = document.createElement("div");
  historyResult.classList.add("rectangle");
  historyResult.textContent = `${numbers[0]} ${result.sign} ${numbers[1]} = ${result.value}`;
  results.appendChild(historyResult);
  results.scrollTop = results.scrollHeight;

  historyResult.addEventListener("click", historyResult.remove);
});
