let taskArray = [];
let addbtn = document.getElementById('addTask');
let list = document.getElementById('list');
let currentFilter = "All";
let filter = document.getElementById('filterStatus');
let currentCategory = "All";
let categoryFilter = document.getElementById('filterCategory');

categoryFilter.addEventListener("change", function () {
    currentCategory = categoryFilter.value;
    renderTask();
})



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
    form.reset();
})

function renderTask() {
    list.innerHTML = "";

    updateOverdueStatus();

    filterCategory();

    for (let i = 0; i < taskArray.length; i++) {

        if (!filterFunction(taskArray[i])) {
            continue;
        }

        let taskItem = document.createElement("li");
        taskItem.className = "card p-3 mb-2 shadow-sm border-0";
            taskItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">

                <div>
                <h6 class="mb-1">${taskArray[i].name}</h6>
                <small class="text-muted">
                ${taskArray[i].category} • ${taskArray[i].deadline}
                </small>
                </div>

                <span class="bg-warning text-dark">
                    ${taskArray[i].status}
                </span>    

            </div>
        `;
        let statusSelect = document.createElement("select");

            statusSelect.className = "form-select w-auto ms-3";

        let option1 = document.createElement("option");
        option1.value = "In Progress";
        option1.text = "In Progress";

        let option2 = document.createElement("option");
        option2.value = "Completed";
        option2.text = "Completed";

        statusSelect.appendChild(option1);
        statusSelect.appendChild(option2);

        statusSelect.value = taskArray[i].status;

        statusSelect.addEventListener("change", function () {
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

filter.addEventListener("change", function () {
    currentFilter = filter.value;
    renderTask();
})

function filterFunction(task) {
    let statusMatch;

    switch (currentFilter) {
        case "In Progress":
            statusMatch = task.status === "In Progress";
            break;
        case "Completed":
            statusMatch = task.status === "Completed";
            break;
        case "Overdue":
            statusMatch = task.status === "Overdue";
            break;
        case "All":
        default:
            statusMatch = true;
    }

    let categorymatch;

    if (currentCategory === "All") {
        categorymatch = true;
    } else {
        categorymatch = task.category === currentCategory;
    }

    return statusMatch && categorymatch;
}

function filterCategory(task) {
    let categoryFilter = document.getElementById('filterCategory');

    categoryFilter.innerHTML = "";

    let allOption = document.createElement("option");
    allOption.value = "All";
    allOption.text = "All";
    categoryFilter.appendChild(allOption);

    let categories = [];

    for (let i = 0; i < taskArray.length; i++) {
        if (!categories.includes(taskArray[i].category)) {
            categories.push(taskArray[i].category);
        }
    }

    for (let i = 0; i < categories.length; i++) {
        let option = document.createElement("option");
        option.value = categories[i];
        option.text = categories[i];
        categoryFilter.appendChild(option);
    }

}
