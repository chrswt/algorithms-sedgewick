/*
 * Simple Stack using array implementation
 */

class Stack {
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

  push(item) {
    /*
     * Add an item to the top of the stack.
     * Use num to index the array, then increment num.
     */
    this.storage[this.num++] = item;
  }

  pop() {
    // Remove an item from the top of the stack
    if (this.isEmpty()) { return null; }

    /*
     * This allows us to decrement the counter, then use it to index the array.
     * This implementation also removes reference to the deleted object.
     */
    let item = this.storage[--this.num];
    this.storage[this.num] = null;
    return item;
  }

  peek() {
    // Method that allows us to peek at the top of the stack
    if (this.isEmpty()) { return null; }

    return this.storage[this.num - 1];
  }
}

if (!module.parent) {
  let s = new Stack();
  console.log(s.isEmpty()); // true
  s.push(1);
  s.push(2);
  console.log(s.pop()); // 2
  console.log(s.size()); // 1
  console.log(s.isEmpty()); // false
}

module.exports = {
  Stack: Stack,
};
