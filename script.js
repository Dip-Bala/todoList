// let counter = 1;
//   function addToDo(){
//     const inputEl = document.querySelector("input");
//     const value = inputEl.value;
//     const newTodoDiv = document.createElement("div");
//     const newH4El = document.createElement("h4");
//     const newDeleteButton = document.createElement("button");
//     newTodoDiv.setAttribute("id", counter);
//     newTodoDiv.setAttribute("class", "todos");
//     newH4El.innerHTML = `${counter}. ${value}`
//     newDeleteButton.innerHTML = "Delete";
//     newDeleteButton.setAttribute("onclick", `deleteTodo(${counter})`);
//     newDeleteButton.setAttribute("class", "deletebtn");
//     newTodoDiv.appendChild(newH4El);
//     newTodoDiv.appendChild(newDeleteButton);
//     document.querySelector("#parentList").appendChild(newTodoDiv);
//     counter++;
//   }

//   function deleteTodo(index){
//     const todoDiv = document.getElementById(index);
//     document.querySelector("#parentList").removeChild(todoDiv)
//     console.log("delete called")
//   }

let todos = [];
function addToDo(){
    todos.push({
       title : document.querySelector("input").value
    });
    render();
    console.log(todos)
}
function deleteTodo(index){
    // delete todos[index]; //this creates a bug
    todos.splice(index, 1);
    console.log(todos);
    render();
}

function createToDoComponent(todo, index){
    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    const deletebtn = document.createElement("button");
    div.setAttribute("class", "todos");
    div.setAttribute("id", index);
    const span = document.createElement("span");
    // span.innerHTML = `${index + 1}`;
    h4.innerHTML = `<span>${index + 1}</span> ${todo.title}`
    deletebtn.innerHTML = "Delete";
    deletebtn.setAttribute("onclick", `deleteTodo(${index})`);
    deletebtn.setAttribute("class", "deletebtn");
    div.appendChild(h4);
    div.appendChild(deletebtn);
    return div;
}
function render(){
    document.querySelector("#parentList").innerHTML = "";
    todos.map((value, index) => {
        const div = createToDoComponent(value, index);
        document.querySelector("#parentList").appendChild(div);
    })
}