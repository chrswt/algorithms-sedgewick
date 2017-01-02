/*
 * SHUFFLING A LINKED LIST
 *
 * Given a singly-linked list containing n items, rearrange the items uniformly
 * at random. Your algorithm should consume a logarithmic (or constant) amount
 * of extra memory and run in time proportional to n log n in the worst case.
 */

class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  add(val) {
    let newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }
}

let ll = new LinkedList();
ll.add(3);
ll.add(5);
ll.add(8);
//ll.add(10);
console.log(ll);

const randomSwap = (linkedList, low, mid, high) => {
  let rnd = Math.random();

  if (rnd < 0.5) {
    // Do not flip the order of the linked list
    return;
  } else {
    // Make a reference to the second half of the sub-list
    let node = linkedList.head;
    for (let i = 0; i < mid; i++) {
      node = node.next;
    }
    let oldNext = node.next;

  }
};

//console.log(randomSwap(ll, 0, 1, 3));

const shuffleLinkedList = (linkedList) => {
  let i = 0;
  let len = linkedList.length;
  let iterator = 2;
  let low;
  let high;
  let mid;

  // Find the closest power of two (e.g. 5, 6, 7 => 8)
  let nearestPowerOfTwo = Math.pow(2, Math.ceil(Math.log(len) / Math.log(2)));

  // Add dummy nodes to the end of the linked list to ensure uniform dist
  let x = len;
  while (x !== nearestPowerOfTwo) {
    ll.add('dummy');
    x++;
  }
  console.log(ll);

  while (iterator <= len) {
    for (let i = 0; i < len; i += iterator) {
      low = i;
      high = Math.min(i += iterator, len);
      mid = Math.floor((low+high) / 2);
      console.log('Low,min,high, LL', low,mid,high);

      //randomSwap(linkedList, low, min, high);
    }

    iterator *= 2;
  }
};

console.log(shuffleLinkedList(ll));
