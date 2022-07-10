// ALSO SEE: Shellsort

const isSorted = require('./utils/isSorted');

const length = 50;
const arr = Array.from({ length }, () => Math.floor(Math.random() * length));

const insertionSort = arr => {
    // Iterate through array
    for (let i = 0; i < arr.length; i++) {
        let temp;

        // Iterate through entries to the left
        for (let j = i; j > 0; j--) {
            // Swap a[i] with each larger entry to its left
            if (arr[j] < arr[j - 1]) {
                temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
            } else {
                break;
            }
        }
    }
};

console.log(isSorted(arr));
insertionSort(arr);
console.log(isSorted(arr));
