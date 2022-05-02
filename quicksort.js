const isSorted = require('./utils/isSorted');

const partition = (arr, lo, hi) => {
    let temp,
        i = lo,
        j = hi;

    // Note use of >= and <=, as stopping on duplicate keys will result in infinite loop e.g. [1, 1, 1]
    while (true) {
        // Find next item larger than partitioning item
        while (arr[i] <= arr[lo] && i < hi) i++;

        // Find next item smaller than partitioning item
        while (arr[j] >= arr[lo] && j > lo) j--;

        // Stop if i and j cross
        if (i >= j) break;

        // Swap larger item to right of partitioning item, smaller item to left of partitioning item
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // Swap partitioning item and arr[j]
    temp = arr[lo];
    arr[lo] = arr[j];
    arr[j] = temp;

    // Return index of sorted item
    return j;
};

const quicksort = (arr, lo, hi) => {
    // Stop if less than 2 items
    if (hi <= lo) return;

    // Sort lo
    let j = partition(arr, lo, hi);

    // Sort left of lo
    quicksort(arr, lo, j - 1);

    // Sort right of lo
    quicksort(arr, j + 1, hi);
};

// Testing
const length = 5; // Change this
const test = () => {
    for (let i = 0; i < 1000; i++) {
        let arr = Array.from({ length }, () =>
            Math.floor(Math.random() * length)
        );

        console.log(arr); // Remove
        quicksort(arr, 0, arr.length - 1);

        if (!isSorted(arr)) {
            return false;
        }
    }

    return true;
};

console.log(test());
