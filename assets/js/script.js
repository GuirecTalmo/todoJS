const todoForm = document.querySelector(".container__form");

const todoInput = document.querySelector(".container__form--input");

const todoItemsList = document.querySelector(".items");

const date = new Date();

let todos = [];

const dateContainer = document.getElementById("date");
dateContainer.innerHTML = date.toDateString();

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo(todoInput.value);
});

function addTodo(item) {
  if (item !== "") {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };

    todos.push(todo);
    addToLocalStorage(todos);
    todoInput.value = "";
  }
}

function renderTodos(todos) {
  todoItemsList.innerHTML = "";

  todos.forEach(function (item) {
    const checked = item.completed ? "checked" : null;

    const li = document.createElement("li");

    li.setAttribute("class", "item");

    li.setAttribute("data-key", item.id);

    if (item.completed === true) {
      li.classList.add("checked");
    }
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;

    todoItemsList.append(li);
  });
}

function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodos(todos);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem("todos");

  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });
  addToLocalStorage(todos);
}

getFromLocalStorage();

todoItemsList.addEventListener("click", function (event) {
  if (event.target.type === "checkbox") {
    toggle(event.target.parentElement.getAttribute("data-key"));
  }
  if (event.target.classList.contains("delete-button")) {
    deleteTodo(event.target.parentElement.getAttribute("data-key"));
  }
});

// DARK MODE PART

const switcher = document.getElementById("switch");
switcher.addEventListener("click", modeSwitch);

function modeSwitch() {
  let rootElement = document.body;
  rootElement.classList.toggle("darkMode");

  let form = document.querySelector(".container__form");
  form.classList.toggle("container__form--light");

  let items = document.querySelector(".items");
  items.classList.toggle("items--light");

  let buttonDelete = document.querySelectorAll(".item");
  for (const allButtons of buttonDelete) {
    allButtons.classList.toggle("item--light");
  }
}
