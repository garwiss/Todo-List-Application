//* Tüm elementler seçildi

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.getElementById("clear-todos");

eventListeners();


function eventListeners() { //*Tüm event listenerları atamak
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos)

}

function clearAllTodos(e) {
    if (confirm("Tümünü silmek istediğinize emin misiniz?")) {
        //?arayüzden todo kaldırma
        // todoList.innerHTML = "";  //!yavaş

        // console.log(todoList.firstElementChild);
        while (todoList.firstChild != null) {
            todoList.removeChild(todoList.firstChild);
        }
        localStorage.removeItem("todos");


    }
}


//? silme işlemi (arayüzden)
function deleteTodo(e) {
    // console.log(e.target);
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo başarıyla silindi..");
    }
}

function filterTodos(e) {
    // console.log(e.target.value);
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            //?bulamadı
            listItem.setAttribute("style", "display:none!important");
        }
        else {
            listItem.setAttribute("style", "display:block")
        }
    });
}

function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1); //?arrayden değeri sildik
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

//? girilen todoları sayfa yenilendiğinde de gösterme
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoToUI(todo);

    });

}

function addTodo(e) {
    const newTodo = todoInput.value.trim();   //? sondaki trimi boşlukları kaldırmak için kullandım 
    // console.log(newTodo);

    if (newTodo == "") {
        showAlert("danger", "Lütfen bir todo girin");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "   Başarıyla eklendi")
    }

    // addTodoToUI(newTodo);

    e.preventDefault();
}

function getTodosFromStorage() { //? storagedan bütün todoları alacak
    let todos;

    if (localStorage.getItem("todos") == null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}


function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    // console.log(alert)
    firstCardBody.appendChild(alert);
    //?settimeout metodu  belli bir zaman sonra silinmesi içimn
    window.setTimeout(function () {
        alert.remove();
    }, 2500);
}

function addTodoToUI(newTodo) { //? string değerini list item olarak ui ya ekleyecek

    /*
        <li class="list-group-item d-flex justify-content-between">
            <a href="#" class="delete-item">
                <i class='fa fa-remove'></i>
            </a>
        </li>
    */
    //?  dinamik list item oluşturma 
    const listItem = document.createElement("li");
    //? dinamik link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>"


    listItem.className = "list-group-item d-flex justify-content-between";

    //?text node ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //? Todo List'e List Item' ı ekleme

    todoList.appendChild(listItem);
    todoInput.value = "";
    // console.log(listItem);

}