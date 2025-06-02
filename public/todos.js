let data = [];

async function fetchTodos() {
    try {
        const response = await axios.get("http://localhost:3000/todos", {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        data = response.data.data;
        console.log(data)
        render()
    } catch (e) {

    }

}
document.getElementById("addbtn").addEventListener('click', async function (e) {
    e.preventDefault();
    const description = document.getElementById("todo-description").value;

    try {
        await axios.post("http://localhost:3000/todo",
            { description },
            {
                headers: {
                    token: localStorage.getItem("token")
                }
            }
        );

        document.getElementById("todo-description").value = '';
        fetchTodos();
    } catch (err) {
        alert(err)
    }
})
fetchTodos()
// function addToDo(){
//     todos.push({
//        title : document.querySelector("input").value
//     });
//     render();
//     console.log(todos)
// }
// document.getElementByClassName("deletebtn").addEventListener('click', async function (e) {
//     e.preventDefault();
//     const description = document.getElementById("todo-description").value;
//     await axios.delete("http://localhost:3000/delete-todo",
//         {
//             headers: {
//                 token: localStorage.getItem("token")
//             },
//             params: {
//                 description: description
//               }
//         })
//     render();
// })

function createToDoComponent(todo, index) {
    const div = document.createElement("div");
    const h4 = document.createElement("h4");
    const deletebtn = document.createElement("button");
    div.setAttribute("class", "todos");
    div.setAttribute("id", index);
    const span = document.createElement("span");
    h4.innerHTML = `<span>${index + 1}</span> ${todo.description}`
    deletebtn.innerHTML = "Delete";
    deletebtn.setAttribute("class", "deletebtn");
    deletebtn.addEventListener("click", async function () {
        try {
            await axios.delete("http://localhost:3000/delete-todo", {
                headers: {
                    token: localStorage.getItem("token")
                },
                params: {
                    description: todo.description
                }
            });
            fetchTodos(); // refresh the list
        } catch (err) {
            alert("Delete failed");
            console.error(err);
        }
    });
    div.appendChild(h4);
    div.appendChild(deletebtn);
    return div;
}
function render() {
    document.querySelector("#parentList").innerHTML = "";
    data.map((value, index) => {
        console.log(index)
        const div = createToDoComponent(value, index);
        document.querySelector("#parentList").appendChild(div);
    })
}