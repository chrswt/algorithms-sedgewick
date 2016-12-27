/*
 * Simple Queue using array implementation
 */

class Queue {
  constructor() {
    this.storage = [];
    this.num = 0;
  }

  isEmpty() {
    return this.num === 0;
  }

  size() {
    return this.num;
  }

  enqueue(item) {
    /*
     * Add an item to the end of the queue.
     * Use num to index the array, then increment num.
     */
    this.storage[this.num++] = item;
  }

  dequeue() {
    // Remove an item from the start of the queue
    if (this.isEmpty()) {return null; }

    this.num--;
    return this.storage.shift();
  }
}

let q = new Queue();
q.enqueue(1);
console.log(q.size()); // 1
q.enqueue(2);
console.log(q.dequeue()); // 1
console.log(q.size()); // 1
