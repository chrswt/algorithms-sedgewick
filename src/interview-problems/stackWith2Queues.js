/*
 * QUEUE WITH TWO STACKS
 *
 * Implement a queue with two stacks so that each queue operations takes a
 * constant amortized number of stack operations.
 */

const Stack = require('../bags-queues-stacks/Stack');

class Queue {
  constructor() {
    // Create an incoming stack and an outgoing stack
    this.in = new Stack.Stack();
    this.out = new Stack.Stack();
  }

  isEmpty() {
    // Check if both stacks are empty
    return this.in.isEmpty() && this.out.isEmpty();
  }

  size() {
    // Return the sum of the sizes of both stacks
    return this.in.size() + this.out.size();
  }

  push(item) {
    // Push all new items into the incoming stack
    this.in.push(item);
  }

  pop() {
    // Re-populate the outgoing stack every time it is empty
    if (this.out.isEmpty()) {
      while (!this.in.isEmpty()) {
        this.out.push(this.in.pop());
      }
    }

    return this.out.pop();
  }
}

let q = new Queue();
console.log(q.isEmpty()); // true
q.push(1);
q.push(2);
console.log(q.size()); // 2
console.log(q.pop()); // 1
q.push(3);
console.log(q.pop()); // 2
