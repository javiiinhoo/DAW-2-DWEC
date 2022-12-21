//ej 1
console.log("Código inicializado");
//ej 2
function generateRandomName() {
    function choose(choices) {
        const index = Math.trunc(Math.random() * choices.length);
        return choices[index];
    }

    function randomNumber(min, rangeLength) {
        return Math.trunc(min + (Math.random() * rangeLength));
    }
    const randomPart1 = choose(['Mega', 'Turbo', 'Hiper', 'Super', 'Great', 'Big', 'Small', 'Nitro', 'Shadow', 'Random']);
    const randomPart2 = choose(['Dog', 'Cat', 'Lizard', 'Croco', 'Coconut', 'Apple', 'Demon', 'Car', 'Tree', 'Light', 'JavaScript']);
    const randomPart3 = randomNumber(11214, 69);

    return randomPart1 + randomPart2 + randomPart3;
}
// ej 3
console.log(generateRandomName());
const ns = []
const theList = document.getElementById("namesList");

function appendNewNames() {
    for (var i = 0; i < 30; i++) {
        const n = generateRandomName();
        let aListItem = document.createElement("li");
        aListItem.innerHTML = n;
        theList.append(aListItem);
    }
}

console.log(appendNewNames());


//ej 4
const paragraphLoading = document.getElementById("textLoadingMore");

// Intersection Observer API
const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
}
const observer = new IntersectionObserver(appendNewNames, options);
observer.observe(paragraphLoading);

