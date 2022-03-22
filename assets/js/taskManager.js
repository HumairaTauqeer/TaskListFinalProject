const createTaskHtml = (name, assignedTo, dueDate, status, description, id) => {
    const html = ` <div class="row" id="taskList" data-task-id='${id}'>
    <div class=" col-lg-4 col-md-6" >
    <div class="card">
        <div class="card-header">
            <img src="./assets/images/task.jpeg" class="card-img-top" alt="...">

        </div>
        <div class="card-body">
            <h3 class="card-title card-font-size">${name}</h3>



            <h4 class="card-text card-font-size">Assigned To</h4>
            <p>${assignedTo}</p>

            <h4 class="card-font-size card-font-size">Due Date</h4>
            <p>${dueDate}</p>

            <h4 class="margin-task-desc card-font-size">Task Description</h4>
            <p class="margin-task-desc">${description}</p>




            <div>
                <p>${status}</p>
                <button class="done-button">Done</button>
                <button>Delete</button>

            </div>

        </div>
        </div>

    </div>`
        //     const html = `  
        //     <div class=" col-lg-4 col-md-6" id="taskList" data-task-id='${id}'>
        //      <div class="card"  >
        //     <img src="./assets/images/task.jpeg" class="card-img-top w-100" alt="...">
        //     <div class="card-body">


    //             <h3 class="card-title card-font-size">${name}</h3>



    //                 <h4 class="card-text card-font-size">Assigned To</h4>
    //                 <p>${assignedTo}</p>

    //                 <h4 class="card-font-size card-font-size">Due Date</h4>
    //                 <p>${dueDate}</p>

    //                     <h4 class="margin-task-desc card-font-size">Task Description</h4>
    //                     <p class="margin-task-desc">${description}</p>




    //             <div>
    //                 <p>${status}</p>
    //                 <button class="done-button">Done</button>
    //                 <button>Delete</button>

    //             </div>

    //     </div>

    //          </div>
    // `;


    return html;
};
console.log(createTaskHtml);

class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }
    addTask(name, description, assignedTo, dueDate, status = "TODO") {
        const taskObject = {
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status,
        };

        this.tasks.push(taskObject);
        console.log("this.tasks!!!", this.tasks);
    }
    getTaskById(taskId) {
        let foundTask;
        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            if (task.id === taskId) {
                foundTask = task;
                console.log(`!!!!!! ${foundTask}`);
            }
        }
        return foundTask;
    }

    render() {
        const tasksHtmlList = [];

        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            // console.log(currentTask);
            const date = new Date(task.dueDate);

            const formattedDate =

                (date.getMonth() + 1) +
                " /" +
                date.getDate() +
                " /" +
                date.getFullYear();

            const taskHtml = createTaskHtml(
                task.name,
                task.assignedTo,
                formattedDate,
                task.status,
                task.description,
                task.id
            );
            tasksHtmlList.push(taskHtml);
        }
        const tasksHtml = tasksHtmlList.join("\n");
        const taskListCards = document.querySelector("#taskList");
        taskListCards.innerHTML = tasksHtml;
    }

    save() {

        const taskJson = JSON.stringify(this.tasks);
        localStorage.setItem("tasks", taskJson);
        const currentId = this.currentId.toString();
        localStorage.setItem("currentId", currentId);


    }

}

