/*ej 7*/
function allowDrop(event) {
    event.preventDefault();
}
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}
function drop(event) {
    event.preventDefault();
    //recuperar id establecido en drag(event)
    // Recuperamos el id que nosotros mismos establecimos en drag(event)
    const draggedElementId = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(draggedElementId);

    // event.target es el elemento sobre el que se hace drop
    // al hacer appendchild el elemento cambia de padre
    event.target.appendChild(draggedElement);
}
/*ej 8*/
document.getElementById("fullscreenButton").addEventListener("click", onFullscreenRequested);
function onFullscreenRequested(event) {

    console.log("Fullscreen requested");

    const parent = document.getElementById("parent");
    parent.requestFullscreen();
}

/*ej 10*/
var ta = 1;
function onSubmitNewTask(event) {  
    event.preventDefault();
    const taskTitle = event.target.elements.inputTaskName.value;
    if (taskTitle.length < 8) {
        alert("El título de tu tarea debe tener por lo menos 8 caracteres");
        return;
    }
    const taskType = event.target.elements.inputTaskType.value;
    let backgroundColorClassName;
    if (taskType === "backend") {
        backgroundColorClassName = "green";
    } else if (taskType === "frontend") {
        backgroundColorClassName = "blue";
    } else if (taskType === "urgent") {
        backgroundColorClassName = "red";
    } else {
        backgroundColorClassName = "yellow";
    }
    /*ej 11*/

    addNewTaskNote("task" + ta, taskTitle, backgroundColorClassName);
    ta += 1;
    event.target.reset();

}
function addNewTaskNote(id, title, className) {
    const note = document.createElement("div");
    note.innerHTML = title;
    note.setAttribute("id", id);
    note.setAttribute("class", "taskNote " + className); // Tiene 2 clases CSS; taskNote y la que sea que usemos de color de fondo
    note.setAttribute("draggable", "true");
    note.addEventListener("dragstart", drag);
    const pendingTasksColumn = document.getElementById("toDoColumn");
    pendingTasksColumn.append(note);

}


const newTaskForm = document.getElementById("newTaskForm");
newTaskForm.addEventListener("submit", onSubmitNewTask);

