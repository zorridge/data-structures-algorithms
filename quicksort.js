const isSorted = require('./utils/isSorted');

const swap = (arr, i, j) => {
  const swapItem = arr[i];
  arr[i] = arr[j];
  arr[j] = swapItem;
};

const partition = (arr, lo, hi) => {
  let i = lo,
    j = hi + 1,
    v = arr[lo];

  while (true) {
    // find next item greater than or equal to partitioning item
    while (arr[++i] < v) {
      if (i === hi) break;
    }

    // find next item less than or equal to partitioning item
    while (v < arr[--j]) {
      if (j === lo) break; // redundant since arr[lo] acts as sentinel
    }

    // check if pointers cross
    if (i >= j) break;

    // swap greater item to right of partitioning item, less item to left of partitioning item
    swap(arr, i, j);
  }

  // swap partitioning item and arr[j]
  swap(arr, lo, j);

  // return index of sorted item
  return j;
};

const quicksort = (arr, lo, hi) => {
  // stop if less than 2 items
  if (hi <= lo) return;

  // sort lo
  let j = partition(arr, lo, hi);

  // sort left of lo
  quicksort(arr, lo, j - 1);

  // sort right of lo
  quicksort(arr, j + 1, hi);
};

// Testing
const length = 5; // change this
const test = () => {
  for (let i = 0; i < 1000; i++) {
    let arr = Array.from({ length }, () => Math.floor(Math.random() * length));

    console.log(arr);
    quicksort(arr, 0, arr.length - 1);

    if (!isSorted(arr)) {
      return false;
    }
  }

  return true;
};

console.log(test());
