const isSorted = require('./utils/isSorted');

const length = 100;
const arr = Array.from({ length }, () => Math.floor(Math.random() * length));

const merge = (arr, low, mid, high) => {
    // Create auxiliary array
    const copy = [...arr];

    // Create pointers for sorted left and right halves of auxiliary array
    let i = low,
        j = mid + 1;

    // Iterate through ORIGINAL array
    for (let k = low; k <= high; k++) {
        // If left half is exhausted
        if (i > mid) {
            arr[k] = copy[j++]; // Right pointer +1
        }

        // If right half is exhausted
        else if (j > high) {
            arr[k] = copy[i++]; // Left pointer +1
        }

        // If right num less than left num
        else if (copy[j] < copy[i]) {
            arr[k] = copy[j++]; // Right pointer +1
        }

        // If right num more than left num OR equal (hence values in the left subarray are always prioritised => stable sort)
        else {
            arr[k] = copy[i++]; // Left pointer +1
        }
    }
};

const sort = (arr, low, high) => {
    // Base case
    if (high <= low) return;

    // Find middle of array
    let mid = Math.floor((low + high) / 2);

    // Recursively mergesort left half
    sort(arr, low, mid);

    // Recursively mergesort right half
    sort(arr, mid + 1, high);

    // Merge left and right halves
    merge(arr, low, mid, high);
};

// Testing
let low = 0,
    high = arr.length - 1;

console.log(isSorted(arr));
sort(arr, low, high);
console.log(isSorted(arr));
