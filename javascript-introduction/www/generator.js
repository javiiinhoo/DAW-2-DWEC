import sortArray from "./sort.js";

// Generador de parrillas de salida
const participants = ["Manson", "Fury", "Storm", "Kelloggs", "Scarecrow", "Number", "Bull"];
console.log(participants[4]);
const numberOfParticipants = participants.length;
console.log(numberOfParticipants);
for (let i = 0; i < participants.length; i++) {
    // Contenido del bucle
    console.log("Iteración número: " + i);
    console.log("En el hueco " + i + " del array se encuentra " + participants[i]);
}
for (const p of participants) {
    console.log("Participante " + p);
}

const vehicles = ["Peugeot 208", "Volkswagen Golf", "Dacia Sandero", "Renault Clio", "Tesla Model 3", "Hyundai Tucson", "Fiat Panda"];
console.assert(participants.length === vehicles.length, "¡Cuidado! Longitud de arrays diferente");
for (let i = 0; i < participants.length; i++) {
    console.log("El participante " + participants[i] + " usa el vehículo " + vehicles[i]);
}

const runners = [
    {
        "name": "Manson",
        "car": "Peugeot 208"
    },
    {
        "name": "Fury",
        "car": "Volkswagen Golf"
    },
    {
        "name": "Storm",
        "car": "Dacia Sandero"
    },
    {
        "name": "Kelloggs",
        "car": "Renault Clio"
    },
    {
        "name": "Scarecrow",
        "car": "Tesla Model 3"
    },
    {
        "name": "Number",
        "car": "Hyundai Tucson"
    },
    {
        "name": "Bull",
        "car": "Fiat Panda"
    },
]

for (const runner of runners) {
    console.log(runner);
}
for (const runner of runners) {
    console.log(runner);
}
console.log("Información de los participantes y sus coches en el array de objetos");
// Nuevo bucle
for (const runner of runners) {
    console.log("Conductor: " + runner.name + ". Coche: " + runner.car);
}


const times = [830, 830, 827, 922, 619, 757, 1070];
sortArray(times);
console.log("Tiempos ordenados");
console.log(times);
console.log("Ordenados con una función importada");


function compareAB(a, b) {
    if (a < b) {
        return -1
    }
    if (a > b) {
        return 1
    }
    if (a === b) {
        return 0
    }
}

const times2 = [832, 834, 828, 920, 623, 759, 1077];
times2.sort(compareAB);
console.log(times2);

const unsortedTimes = [830, 830, 827, 922, 619, 757, 1070];
const unsortedTimes2 = [832, 834, 828, 920, 623, 759, 1077];
console.assert((runners.length === unsortedTimes.length) && (runners.length === unsortedTimes2.length), "¡Cuidado! Longitud de arrays diferente");
const completeRunnersData = [];
for (let i = 0; i < runners.length; i++) {
    const meanTime = (unsortedTimes[i] + unsortedTimes2[i]) / 2;
    const truncatedMeanTime = Math.trunc(meanTime);
    const runnerData = { ...runners[i], "time": truncatedMeanTime };
    completeRunnersData.push(runnerData);
    console.log("He añadido el elemento");
    console.log(runnerData);
}
completeRunnersData.sort((a, b) => a.time - b.time);
let theList = document.createElement("ol");

for (let i = 0; i < completeRunnersData.length; i++) {
    const runner = completeRunnersData[i];
    let aListItem = document.createElement("li");
    aListItem.setAttribute("data-cy", "item" + i)
    aListItem.innerHTML = "<b>" + runner.name + "</b>; <i>" + runner.car + "</i>. Clasificación: " + runner.time + " décimas de segundo";
    theList.append(aListItem);
}
document.getElementById("mainDiv").append(theList);