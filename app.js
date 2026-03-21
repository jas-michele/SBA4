let taskArray = [];
let categories = [];
let addbtn = document.getElementById('addTask');
let list = document.getElementById('list');



addbtn.addEventListener("click", function (e) {
    e.preventDefault();

    let task = {
    name: document.getElementById('name').value,
    category: document.getElementById('category').value,
    deadline: document.getElementById("deadline").value,
    status: "In Progress"
}

    taskArray.push(task);   
    renderTask();
})

function renderTask() {
    list.innerHTML = "";
    for (let i = 0; i < taskArray.length; i++) {
        let taskItem = document.createElement("li");
        taskItem.innerText = 
        taskArray[i].name + "-" +
        taskArray[i].category + "-" +
        taskArray[i].status;
        
        list.appendChild(taskItem);
    }

}

