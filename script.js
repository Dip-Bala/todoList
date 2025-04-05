let counter = 1;
  function addToDo(){
    const inputEl = document.querySelector("input");
    const value = inputEl.value;
    const newTodoDiv = document.createElement("div");
    const newH4El = document.createElement("h4");
    const newDeleteButton = document.createElement("button");
    newTodoDiv.setAttribute("id", counter);
    newTodoDiv.setAttribute("class", "todos");
    newH4El.innerHTML = `${counter}. ${value}`
    newDeleteButton.innerHTML = "Delete";
    newDeleteButton.setAttribute("onclick", `deleteTodo(${counter})`);
    newDeleteButton.setAttribute("class", "deletebtn");
    newTodoDiv.appendChild(newH4El);
    newTodoDiv.appendChild(newDeleteButton);
    document.querySelector("#parentList").appendChild(newTodoDiv);
    counter++;
  }

  function deleteTodo(index){
    const todoDiv = document.getElementById(index);
    document.querySelector("#parentList").removeChild(todoDiv)
    console.log("delete called")
  }