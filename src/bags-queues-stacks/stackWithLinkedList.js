// An inner class 'node' used to represent each node of the linked list
class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

// A linked-list implementation of a stack
class Stack {
  constructor() {
    this.first = null;
    this.num = 0;
  }

  isEmpty() {
    return this.first === null;
  }

  size() {
    return this.num;
  }

  push(val) {
    // Add an item to the top of the stack
    let newNode = new Node(val);

    if (this.isEmpty()) {
      this.first = newNode;
    } else {
      // Link the old first node to the new one, then replace it
      newNode.next = this.first;
      this.first = newNode;
    }

    this.num++;
  }

  pop() {
    // Remove an item from the top of the stack
    if (this.isEmpty()) { return null; }

    let item = this.first.value;
    this.first = this.first.next;
    this.num--;

    return item;
  }
}

let s = new Stack();
s.push(4);
console.log(s.size()); // 1
console.log(s.pop()); // 4
console.log(s.pop()); // null
