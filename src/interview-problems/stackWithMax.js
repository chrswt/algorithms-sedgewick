/*
 * STACK WITH MAX
 *
 * Create a data structure that efficiently supports the stack operations (push
 * and pop) and also a return-the-maximum operation. Assume the elements are
 * real numbers so that you can compare them.
 */

const Stack = require('../bags-queues-stacks/Stack');

class StackWithMax {
  constructor() {
    this.stack = new Stack.Stack();
    this.maxStack = new Stack.Stack();
  }

  push(num) {
    if (this.maxStack.isEmpty() || num > this.maxStack.peek()) {
      // Push the number to the top of max stack if is greater than current max
      this.maxStack.push(num);
    }

    this.stack.push(num);
  }

  pop() {
    let num = this.stack.pop();

    if (this.maxStack.peek() === num) {
      // If the number to be removed is also in max stack, remove it
      this.maxStack.pop();
    }

    return num;
  }

  getMax() {
    return this.maxStack.peek();
  }

  size() {
    return this.stack.size();
  }
}

let swm = new StackWithMax();
swm.push(5);
console.log(swm.getMax()); // 5
swm.push(8);
swm.push(3);
console.log(swm.getMax()); // 8
console.log(swm.pop()); // 3
console.log(swm.size()); // 2
console.log(swm.pop()); // 8
console.log(swm.getMax()); // 5
