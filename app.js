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
    
    updateOverdueStatus();

    for (let i = 0; i < taskArray.length; i++) {
        let taskItem = document.createElement("li");
        taskItem.innerText = 
        taskArray[i].name + " " +
        taskArray[i].category + " " +
        taskArray[i].deadline + " " +
        taskArray[i].status;
        
        let statusSelect = document.createElement("select");

        let option1 = document.createElement("option");
        option1.value = "In Progress";
        option1.text = "In Progress";

        let option2 = document.createElement("option");
        option2.value = "Completed";
        option2.text = "Completed";

        statusSelect.appendChild(option1);
        statusSelect.appendChild(option2);

        statusSelect.value = taskArray[i].status;

        statusSelect.addEventListener("change", function(){
            taskArray[i].status = statusSelect.value;
            renderTask();
        })

    
        taskItem.appendChild(statusSelect);

        list.appendChild(taskItem);
    }
}

function updateOverdueStatus() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < taskArray.length; i++) {
        let deadlineDate = new Date(taskArray[i].deadline);

        if (deadlineDate < today && taskArray[i].status != "Completed") {
            taskArray[i].status = "Overdue";
        }
    }
}
