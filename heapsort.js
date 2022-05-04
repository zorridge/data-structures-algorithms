const isSorted = require('./utils/isSorted');

/**
 * Given a 0-indexed array representation of a heap
 * Child will always be at index (2 * parent + 1) or (2 * parent + 2)
 * Parent will always be at Math.floor((child - 1) / 2)
 */

/**
 * Swap two items in the array
 *
 * @param {Array} arr
 * @param {Int} i
 * @param {Int} j
 */
const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

/**
 * Appends item to the end of the array and moves it up the heap
 *
 * @param {Array} arr
 * @param {Int} last - Last position of the array
 * @param {*} n - Item to be added
 */
const add = (arr, last, n) => {
    arr[++last] = n;
    swim(arr, last);
};

/**
 * Recursively, compares child to its parent and swaps them if child > parent
 *
 * @param {Array} arr
 * @param {Int} i - Index of item to be moved up the heap
 * @returns If at root
 */
const swim = (arr, i) => {
    if (i === 0) return;

    let parent = Math.floor((i - 1) / 2);
    if (arr[i] > arr[parent]) {
        swap(arr, i, parent);
        swim(arr, parent); // Repeat for item just moved up the heap
    }
};

/**
 * Swaps last item and root item and detach the swapped root item from the heap
 * Sinks the swapped last item down the heap
 *
 * @param {Array} arr
 * @param {Int} last - Last position of the array
 * @returns Largest item i.e. item at root
 */
const remove = (arr, last) => {
    // let temp = arr[0];
    swap(arr, 0, last--);
    sink(arr, 0, last);
    // return temp;
};

/**
 * While left child exists, find the bigger child and swaps item with that child if child > item
 *
 * @param {Array} arr
 * @param {Int} i - Index of item to be moved down the heap
 * @param {Int} last - Last position of the array
 * @returns If item is in place or no more children
 */
const sink = (arr, i, last) => {
    while (2 * i + 1 <= last) {
        let child = 2 * i + 1;
        if (child < last && arr[child] < arr[child + 1]) child++;
        if (arr[child] <= arr[i]) break;
        swap(arr, i, child);
        i = child;
    }
};

const heapsort = arr => {
    // First array pass, build the input array into a heap
    let last = arr.length - 1;
    for (let parent = Math.floor((last - 1) / 2); parent >= 0; parent--) {
        sink(arr, parent, last);
    }

    // Second array pass, remove largest (root) item until array is sorted i.e. last === root
    // https://youtu.be/LbB357_RwlY
    while (last > 0) {
        swap(arr, 0, last--);
        sink(arr, 0, last);
    }
};

// Test
const length = 1000; // Change this
const test = () => {
    for (let i = 0; i < 1000; i++) {
        let arr = Array.from({ length }, () =>
            Math.floor(Math.random() * length)
        );

        // console.log(arr); // Remove
        heapsort(arr);

        if (!isSorted(arr)) {
            return false;
        }
    }

    return true;
};

console.log(test());
