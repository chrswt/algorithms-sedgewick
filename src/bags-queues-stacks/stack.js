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

  push(item) {
    // use num to index the array, then increment num
    this.storage[this.num++] = item;
  }

  pop() {
    // decrement num then use it to index the array
    return this.storage[--this.num];
  }
}

let s = new Stack()
console.log(s.isEmpty()); // true
s.push(1);
s.push(2);
console.log(s.pop()); // 2
console.log(s.isEmpty()); // false
