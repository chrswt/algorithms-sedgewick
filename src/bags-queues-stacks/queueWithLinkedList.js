/*
 * Simple Queue using linked list implementation
 */

// An inner class 'node' used to represent each node of the linked list
class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.num = 0;
  }

  isEmpty() {
    return this.first === null;
  }

  size() {
    return this.num;
  }

  enqueue(item) {
    /*
     * Add an item to the end of the queue.
     * Create a new node, then update the reference to the last node
     */
    let newNode = new Node(item);

    if (this.isEmpty()) {
      this.first = newNode;
    } else {
      this.last.next = newNode;
    }

    this.last = newNode;
    this.num++;
  }

  dequeue() {
    // Remove an item from the start of the queue
    if (this.isEmpty()) {return null; }

    // Remove the first item in the linked list by removing its reference
    let item = this.first.value;
    this.first = this.first.next;

    // Update the reference to the last node if the list is now empty
    if (this.isEmpty()) { this.last = null; }

    this.num--;

    return item;
  }
}

let q = new Queue();
q.enqueue(1);
console.log(q.size()); // 1
q.enqueue(2);
console.log(q.dequeue()); // 1
console.log(q.size()); // 1
