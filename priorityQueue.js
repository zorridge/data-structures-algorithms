/**
 * Implementation of a priority queue (max by default) with a binary heap.
 * A one-indexed array is used to simplify parent and child calculations.
 *
 * In a binary heap, the items are stored in an array such that each key is guaranteed to be larger than (or equal to) the keys at two other specific positions.
 * In turn, each of those keys must be larger than two more keys, and so forth.
 *
 * Definition: A binary tree is heap-ordered if the key in each node is larger than (or equal to) the keys in that nodes two children (if any).
 * Proposition: The largest key in a heap-ordered binary tree is found at the root.
 *
 * Definition: A binary heap is a set of nodes with keys arranged in a complete heap-ordered binary tree, represented in level order in an array (not using the first entry).
 *
 * In a heap, the parent of the node in position k is in position k/2; and, conversely, the two children of the node in position k are in positions 2k and 2k + 1.
 *
 * insert() and delMax() operations take O(logn) time.
 * peek(), size(), and isEmpty() takes O(1) time.
 *
 * References:
 * https://algs4.cs.princeton.edu/24pq/
 * https://algs4.cs.princeton.edu/24pq/MaxPQ.java.html
 */

class PriorityQueue {
    constructor(comparator = (a, b) => a > b) {
        this.heap = [null]; // Stores items at indices 1 to n
        this.n = 0; // Number of items on priority queue
        this.comparator = comparator; // Optional comparator function
    }

    /**
     * Returns number of items on this priority queue
     *
     * @return {Integer} Number of items on this priority queue
     */
    size() {
        return this.n;
    }

    /**
     * Returns true if this priority queue is empty
     *
     * @return {Boolean} true if this priority queue is empty;
     *                   false if this priority queue is not empty;
     */
    isEmpty() {
        return this.n === 0;
    }

    /**
     * Returns the largest item on this priority queue
     *
     * @return {Item} The largest item on this priority queue
     * @throws Error if this priority queue is empty
     */
    peek() {
        if (this.isEmpty()) throw new Error('Priority queue underflow');
        return this.heap[1];
    }

    /**
     * Adds new item(s) to this priority queue
     *
     * @param items Item(s) to add to this priority queue
     *
     * @return {Integer} Size of updated priority queue
     */
    insert(...items) {
        // Add item, and percolate it up to maintain heap invariant
        items.forEach(item => {
            this.heap[++this.n] = item;
            this.swim(this.n);
        });
        return this.size();
    }

    /**
     * Removes and returns a largest item on this priority queue
     *
     * @return {Item} A largest item on this priority queue
     * @throws Error if this priority queue is empty
     */
    delMax() {
        if (this.isEmpty()) throw new Error('Priority queue underflow');
        let max = this.heap[1];
        this.swap(1, this.n--);
        this.sink(1);
        this.heap[this.n + 1] = null;
        return max;
    }

    /****************************************************************************************************
     * Helper functions to restore the heap invariant
     ****************************************************************************************************/

    swim(k) {
        while (k > 1 && this.less(Math.floor(k / 2), k)) {
            this.swap(Math.floor(k / 2), k);
            k = Math.floor(k / 2);
        }
    }

    sink(k) {
        while (2 * k <= this.n) {
            let j = 2 * k;
            if (j < this.n && this.less(j, j + 1)) j++; // Choose larger children
            if (!this.less(k, j)) break;
            this.swap(k, j);
            k = j;
        }
    }

    /****************************************************************************************************
     * Helper functions for compares and swaps
     ****************************************************************************************************/

    /**
     * Returns true if heap[i] less than heap[j]
     *
     * @param {Integer} i Index of item
     * @param {Integer} j Index of item
     *
     * @return {Boolean} true if heap[i] less than heap[j]
     */
    less(i, j) {
        return this.comparator(this.heap[j], this.heap[i]);
    }

    /**
     * Swap items at i and j
     *
     * @param {Integer} i Index of item
     * @param {Integer} j Index of item
     */
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    /****************************************************************************************************
     * Helper functions for testing
     ****************************************************************************************************/

    isHeap() {
        for (let i = 1; i <= this.n; i++) {
            if (this.heap[i] === null) return false;
        }

        if (this.heap[0] !== null) return false;
        return this.isHeapOrdered(1);
    }

    isHeapOrdered(k) {
        if (k > this.n) return true;
        let left = 2 * k,
            right = 2 * k + 1;
        if (left <= this.n && this.less(k, left)) return false;
        if (right <= this.n && this.less(k, right)) return false;
        return this.isHeapOrdered(left) && this.isHeapOrdered(right);
    }
}

module.exports = PriorityQueue;
