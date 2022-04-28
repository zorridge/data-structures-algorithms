// const arr = [
//     4, 11, 16, 29, 30, 35, 38, 39, 41, 42, 46, 53, 64, 80, 84, 85, 88, 89, 91,
// ];

const arr = [0, 1, 2, 3, 4, 5, 6];

const binarySearch = (x, arr) => {
    // Sort array
    arr = arr.sort((a, b) => a - b);

    // Initialize left and right pointer
    let left = 0,
        right = arr.length - 1;

    // Left and right can end up at the same index
    while (left <= right) {
        // Find mid
        let mid = Math.floor((left + right) / 2);

        // If target is to the left of mid
        if (x < arr[mid]) {
            right = mid - 1;
        }

        // If target is to the right of mid
        else if (x > arr[mid]) {
            left = mid + 1;
        }

        // If target is mid
        else if (x === arr[mid]) {
            return mid;
        }
    }

    return -1;
};

// console.log(binarySearch(2, arr));

for (i of arr) {
    console.log(binarySearch(i, arr));
}
