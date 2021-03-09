// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");

const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions

//       <div class="todo">
//           <li></li>
//           <button>Checked</button>
//           <button>delete</button>
//       </div>

function addTodo(event) {
  if (todoInput.value.trim()) {
    //Prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");

    if (checkLocalTodos(todoInput.value) == true) {
      alert("Task already exists!");
      todoInput.value = "";
    } else {
      newTodo.innerText = todoInput.value;
      newTodo.setAttribute("readonly", true);
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);

      //ADD TODO TO LOCALSTORAGE
      saveLocalTodos(todoInput.value);

      //Check Mark BUTTON
      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      // EDIT BUTTON
      var editButton = document.createElement("button");
      editButton.classList.add("edit-btn");
      editButton.innerHTML = '<i class="fas fa-edit"></i>';
      todoDiv.appendChild(editButton);
      editButton.onclick = function () {
        editWorking(newTodo);
      };

      //Check Trash BUTTON
      const trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash"></i>';
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //APPEND TO LIST
      todoList.appendChild(todoDiv);
      //Clear Todo INPUT VALUE
      todoInput.value = "";
    }
  } else if (todoInput.value === "") {
    alert("Please fill the input field");
  }
}

function deleteCheck(e) {
  console.log(e.target);
  const item = e.target;
  //DELETE
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    //REMOVED FROM LOCALSTORAGE
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  //console.log(todos);
  todos.forEach(function (todo) {
    if (todo.nodeType == Node.ELEMENT_NODE) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
      }
    }
  });
}

function saveLocalTodos(todo) {
  //CHECK--Do I already have things in there?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check Mark BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // EDIT BUTTON

    var editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    todoDiv.appendChild(editButton);
    editButton.onclick = function () {
      editWorking(newTodo);
    };
    //Check Trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //console.log(todo.children[0].innerText);
  const todoIndex = todo.children[0].innerText; //set value of todoIndex with value of 'todoInput.value'
  todos.splice(todos.indexOf(todoIndex), 1); // removed 1 item from item with index of "todoIndex" from array with key "todos" of localstorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function editWorking(e) {
  const oldValue = e.firstChild.nodeValue;

  var editValue = prompt("edit the selected item", e.firstChild.nodeValue);
  if (editValue === "") {
    alert("Please fill the input field");
  } else {
    e.firstChild.nodeValue = editValue;
    changeLocalTodos(oldValue, editValue);
  }
}

function changeLocalTodos(oldValue, editValue) {
  //console.log(oldValue);
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.splice(todos.indexOf(oldValue), 1, editValue);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function checkLocalTodos(e) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  if (todos.includes(e)) {
    return true;
  } else {
    return false;
  }
}
function deleteAllElements() {
  var item = document.getElementById("todo-container");
  if (confirm("Delete all tasks?") == true) {
    item.remove();
    deleteAllLocalTodos();
  } else {
    alert("Tasks are not deleted!");
  }
}

function deleteAllLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos = [];
  localStorage.setItem("todos", JSON.stringify(todos));
}

//document.getElementById("deleteAll").addEventListener(
//  "mouseover",
//  function (event) {
//    alert("Delete all tasks!");
//  },
//  false
//);
