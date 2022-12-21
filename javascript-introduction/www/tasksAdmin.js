

const tasks = [];
function customOnSubmit(event) {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const Relevancia = event.target.elements.Relevancia.value;
    const fecha=event.target.elements.fecha.value

    const ta = {
        "name": name,
        "relevancia": Relevancia,
        "data":fecha
    }

    tasks.push(ta);
    console.log(ta.name);
    console.log(ta.relevancia);

    let li = document.createElement("li");
    li.innerHTML = ta.name;
    document.getElementById("tasksList").append(li);
}
document.getElementById("tasksForm").addEventListener("submit", customOnSubmit);

function customOnClick(event) {
    const theList = document.getElementById("tasksList");
    theList.innerHTML = "";

    tasks.sort((tasks1, tasks2) => tasks1.relevancia - tasks2.relevancia);
    tasks.reverse();

    for (const task of tasks) {
        let aListItem = document.createElement("li");
        aListItem.innerHTML = task.name;
        theList.append(aListItem);
    }

}


function customOnClick2(event) {

    console.log("Clicaste en ordenar");
    const theList = document.getElementById("tasksList");
    theList.innerHTML = "";

    tasks.sort((tasks1, tasks2) => new Date(tasks1.data) - new Date(tasks2.data));
    for (const ta of tasks) {
        let aListItem = document.createElement("li");
        aListItem.innerHTML = ta.data;
        theList.append(aListItem);
    }
}


document.getElementById("sortButton").addEventListener("click", customOnClick);


document.getElementById("sortButton2").addEventListener("click", customOnClick2);
