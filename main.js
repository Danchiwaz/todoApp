let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let textarea = document.getElementById("textarea");
let dateInput = document.getElementById("dateInput");
let idInput = document.getElementById("idInput");
let msg = document.getElementById("msg");
let add = document.getElementById("add");
let updateBtn = document.getElementById("update-btn");
let tasks = document.getElementById("tasks");
let completed = document.getElementById("checkedbtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "" || textInput.value === "" || dateInput.value === "") {
    msg.innerHTML = "Task cannot be empty";
  } else {
    msg.innerHTML = "";
    acceptData();
  }
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = ""; //
  textarea.value = ""; //
};

const data = [];
let incomplete = [];

let acceptData = () => {
  const id = Math.ceil(Math.random() * 1000000000);
  const tasks = getData() || [];
  tasks.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
    completed: false,
    id,
  });

  localStorage.setItem("data", JSON.stringify(tasks));
  renderTasks("all");
};



const getData = () => {
  return JSON.parse(localStorage.getItem("data"));
};

let renderTasks = (status) => {
  tasks.innerHTML = "";
  let taskList,
    todos = getData();

  if (status === "complete") {
    taskList = todos.filter((task) => task.completed);
  } else if (status === "incomplete") {
    taskList = todos.filter((task) => !task.completed);
  } else taskList = todos;

  tasks.innerHTML = taskList
    .map(
      (x) => `
      <div id=${x.id} class="card">
        <div class="card__title">
            <input onclick="toggleTaskStatus(${x.id})" type="checkbox" ${
        x.completed ? "checked" : ""
      } id="checkedbtn" />
            <h3>${x.text}</h3>
        </div>
        
        <input type="text" style="display: none;" value="${x.id}" id="checked" />
        <h5>${x.date}</h5>
        
        <p class="card__desc">${x.description}</p>

        <span class="options">
          <button onClick= "editTask(this)" class="btn-primary"><ion-icon name="pencil-outline"></ion-icon></button>
            <button style="display: none;" data-id="${
              x.id
            }" class="btn-danger"><ion-icon name="trash-outline"></ion-icon></button> 
          <button onClick= "deleteTask(this)"  class="btn-danger"><ion-icon name="trash-outline"></ion-icon></button>
            <button style="display: none;" data-id="${x.id}"></button> 
        </span>
      </div>
    `
    )
    .join("");

  resetForm();
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  const task = getData().find((t) => t.id === parseInt(selectedTask.id));

  textInput.value = task.text;
  idInput.value = task.id;
  dateInput.value = task.date;
  textarea.value = task.description;

  add.style.display = "none";
  updateBtn.style.display = "block";
};

const updateTask = (target) => {
  const todos = getData();
  const found = todos.find((task) => task.id === parseInt(idInput.value));

  const task = {
    text: textInput.value,
    id: parseInt(idInput.value),
    date: dateInput.value,
    description: textarea.value,
  };

  Object.assign(found, task);
  localStorage.setItem("data", JSON.stringify(todos));
  renderTasks("all");

  add.style.display = "block";
  updateBtn.style.display = "none";
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

const toggleTaskStatus = (taskId) => {
  const todos = getData();
  const found = todos.find((todo) => todo.id === taskId);
  if (found) Object.assign(found, { completed: !found.completed });
  localStorage.setItem("data", JSON.stringify(todos));
  renderTasks("all");
};
