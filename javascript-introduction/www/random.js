const r = Math.floor(Math.random() * 101);
console.log("El número secreto es: " + r);
let t = 0;

const form = document.getElementById("userForm");
const sub = document.getElementById("inputSubmit");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let n = parseInt(event.target.elements.num.value);
    t++
    if (r < n) {
        let m = document.createElement("p");
        m.innerHTML = "Crees que estoy pensando en el número " + n + "... Pero estoy pensando en un número menor";
        document.getElementById("mainDiv").append(m);
    } else if (r > n) {

        let m = document.createElement("p");
        mainDiv.innerHTML = "Crees que estoy pensando en el número " + n + "... Pero estoy pensando en un número mayor";
        document.getElementById("mainDiv").append(m);

    } else{
        let m = document.createElement("p");
        mainDiv.innerHTML = "¡Enhorabuena! Has acertado en " + t + " intento(s)";
        document.getElementById("mainDiv").append(m);

    }
})