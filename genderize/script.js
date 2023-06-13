import { storage } from "./modules/dataStorage.js";

const form = document.querySelector("form");
const historyNode = document.querySelector(".history");

const historyStorage = storage();
historyStorage.loadData(addResult);

form.addEventListener("submit", submitHandler);
function submitHandler(event) {
  event.preventDefault();

  const input = form.querySelector(`input[type="text"]`);
  const name = input.value;

  const serverUrl = "https://api.genderize.io";
  const url = `${serverUrl}?name=${name}`;
  
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(response.status)
      return response.json()
    })
    .then(addResult)
    .catch(console.error)
    .finally(() => form.reset());
}

function addResult(data, id) {
  if (!data.count) throw new Error("Not Found") 

  const result = document.createElement("div");
  result.classList.add("result");

  const name = document.createElement("p");
  name.textContent = `${data.name} is ${data.gender}.`;

  const popularity = document.createElement("p");
  popularity.textContent = `Popularity: ${data.count}`;

  result.append(name, popularity);

  result.setAttribute("id", id || historyStorage.setID(data));
  historyStorage.save(data, result.getAttribute("id"));
  historyNode.append(result);
}

historyNode.addEventListener("click", removeResult);
function removeResult(event) {
  const result = event.target.closest(".result");
  if (result) {
    historyStorage.delete(result.getAttribute("id"));
    result.remove();
  }
}
