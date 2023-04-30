import { taskManager } from "./taskManager.js";

const user = taskManager();

const taskTemplate = document.querySelector("#task-example");
const taskCreator = document.querySelector(".task-creator");
const taskInput = taskCreator.querySelector(".input-field input");
const taskSubmit = taskCreator.querySelector(".submit-field");
const tasks = document.querySelector(".tasks");

function saveLocalStorage() {
  const tasksData = []
  for (let index = 0; index < user.length(); index++) {
    const taskID = user.getTaskID(index)
    const taskData = user.getTaskData(taskID)
    tasksData.push(taskData)
  }
  localStorage.setItem("data", JSON.stringify(tasksData))
}

function downloadLocalStorage() {
  const tasksData = JSON.parse(localStorage.getItem("data"))

  if (tasksData) user.concat(tasksData)
  
  render()
}

downloadLocalStorage()


function addTask(event) {
  event.preventDefault();
  const taskName = taskInput.value;
  taskInput.value = "";

  if (!taskName) return

  const selectPriority = taskCreator.querySelector(".select .current .option");
  const taskPriority = selectPriority.getAttribute("data-priority");
  
  user.addTask(taskName, { priority: taskPriority });
  saveLocalStorage()

  render();
}

function render() {
  tasks.textContent = "";

  for (let index = 0; index < user.length(); index++) {
    const taskID = user.getTaskID(index);
    const taskData = user.getTaskData(taskID);
    renderTask(taskData);
  }

  saveLocalStorage()
}


function renderTask(taskData) {
  const taskNode = taskTemplate.cloneNode(true);
  taskNode.setAttribute("id", taskData.id);
  const taskPriority = taskNode.querySelector(".priority");
  taskPriority.textContent = taskData.priority;
  taskPriority.setAttribute("data-priority", taskData.priority)

  const taskLabel = taskNode.querySelector("label");
  taskLabel.setAttribute("for", `checkbox-${taskData.id}`);

  const taskCheckbox = taskNode.querySelector(".checkbox input");
  taskCheckbox.setAttribute("id", `checkbox-${taskData.id}`);
  taskCheckbox.checked = taskData.status === "Done";

  const taskName = taskLabel.querySelector(".description");
  taskName.textContent = taskData.name;


  taskCheckbox.addEventListener("input", (event) => {
    event.target.checked
      ? user.changeProperty(taskData.id, "status", "Done")
      : user.changeProperty(taskData.id, "status", "To Do");

    saveLocalStorage()
  });

  tasks.appendChild(taskNode);
}

function taskRemove(event) {
    if (event.target.classList.contains("remove-task-button")) {
      const removeButton = event.target;
      const task = removeButton.closest(".task")
      const taskID = task.getAttribute("id")
  
      user.deleteTask(taskID)
      render()
    }
  }


tasks.addEventListener("click", taskRemove)
taskSubmit.addEventListener("click", addTask);
