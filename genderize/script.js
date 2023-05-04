import { dataStorage } from "./dataStorage.js";

const form = document.querySelector("form");
const historyNode = document.querySelector(".history");

const historyStorage = dataStorage();
historyStorage.loadData(addResult);

form.addEventListener("submit", submitHandler);
function submitHandler(event) {
  event.preventDefault();

  const input = form.querySelector(`input[type="text"]`);
  const name = input.value;

  const serverUrl = "https://api.genderize.io";
  const url = `${serverUrl}?name=${name}`;
  fetch(url)
    .then((response) => response.json())
    .then(addResult);

  input.value = "";
}

function addResult(data, id) {
  const result = document.createElement("div");
  result.classList.add("result");

  if (!data.count) {
    result.textContent = "Not found.";
    historyNode.append(result);
    return;
  }

  const name = document.createElement("p");
  name.textContent = `${data.name} is ${data.gender}.`;

  const popularity = document.createElement("p");
  popularity.textContent = `Popularity: ${data.count}`;

  result.append(name, popularity);

  result.setAttribute("id", id || historyStorage.setID(data));
  historyStorage.saveData(data, result.getAttribute("id"));
  historyNode.append(result);
}

historyNode.addEventListener("click", removeResult);
function removeResult(event) {
  const result = event.target.closest(".result");
  if (result) {
    historyStorage.deleteData(result.getAttribute("id"));
    result.remove();
  }
}
