function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
const array = [830, 833, 828, 923, 625, 759, 1036];

function sortArray(arrayToSort) {
    for (let i = 0; i < arrayToSort.length; i++) {
        let smallerTimeIndex = i;
        let smallerTime = arrayToSort[i];
        for (let j = i + 1; j < arrayToSort.length; j++) {

            if (arrayToSort[j] < smallerTime) {
                // Marcamos el más pequeño como 'menor'
                smallerTime = array[j];
                smallerTimeIndex = j;
            }
        }
        // Aquí intercambiamos la posición 'i' con el menor
        swap(arrayToSort, i, smallerTimeIndex);
    }
}
export default sortArray;
