var new_todo = document.getElementById("new_todo");
var submit_todo = document.getElementById("submit_todo");
var todo_field = document.getElementById("todo-field");


submit_todo.addEventListener("click", function(){
    var new_todo = document.getElementById("new_todo").value;
    send_todo_backend(new_todo);
    const el = document.createElement("div");
    el.classList.add("task");
    el.textContent = new_todo;
    todo_field.appendChild(el);
    // Add delete button //
    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.addEventListener("click", function(){
        el.style.display = "none";
    })
    span.className = "close";
    span.appendChild(txt);
    el.append(span);
})

//add  delete button for files from database!
//think about logic to delete files from database when clicked on delete button!



function send_todo_backend(task) {
    const dict_values = {task}
    const s = JSON.stringify(dict_values);
    console.log(s)

    $.ajax({
        url:"/todo",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify(s)
    })
}


