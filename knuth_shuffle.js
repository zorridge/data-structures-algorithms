const length = 100;
const arr = Array.from({ length }, (v, i) => i);

const shuffle = arr => {
    for (let i = 0; i < arr.length; i++) {
        let temp;

        // Pick random integer 0 <= rand <= i
        let rand = Math.floor(Math.random() * i);

        // Shuffle
        temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
    }

    return arr;
};

console.log(shuffle(arr));
