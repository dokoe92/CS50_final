var new_todo = document.getElementById("new_todo");
var submit_todo = document.getElementById("submit_todo");
var todo_field = document.getElementById("todo-field");


submit_todo.addEventListener("click", function(){
    var new_todo = document.getElementById("new_todo").value;
    const el = document.createElement("div");
    el.classList.add("task");
    el.textContent = new_todo;
    todo_field.appendChild(el);
})