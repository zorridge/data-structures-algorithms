const isSorted = require('./utils/isSorted');

const length = 100;
const arr = Array.from({ length }, () => Math.floor(Math.random() * length));

const selectionSort = arr => {
    // Iterate through array
    for (let i = 0; i < arr.length; i++) {
        // Initialize start pointer pointer (everything else to the left has been sorted)
        let min = i;
        let temp;

        // Iterate through remaining entries to the right
        for (let j = i + 1; j < arr.length; j++) {
            // Find minimum
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        // Swap minimum with starting index
        temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
};

console.log(isSorted(arr));
selectionSort(arr);
console.log(isSorted(arr));
