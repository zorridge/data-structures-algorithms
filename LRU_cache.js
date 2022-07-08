// https://leetcode.com/problems/lru-cache/

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return -1;

        let value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) this.cache.delete(key);
        if (this.cache.size === this.capacity) this.cache.delete(this.getLRU());
        this.cache.set(key, value);
    }

    getLRU() {
        return this.cache.keys().next().value;
    }
}
