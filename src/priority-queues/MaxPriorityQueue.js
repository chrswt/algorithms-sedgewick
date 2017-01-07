/*
 * Max Priority Queue implementation using a Binary Heap data structure
 * represented as an array.
 */

class MaxPriorityQueue {
  constructor() {
    this.heap = []; // binary heap that stores the keys
    this.n    = 0;  // number of items in the priority queue
  }

  // Insert a key into the priority queue
  insert(key) {
    /* Add the key to the end of the heap and increment n, then swim up the heap
     * to fix any violations that have arisen.
     */
    this.heap[++this.n] = key;
    this.swim(this.n);
  }

  // Return the largest key from the priority queue
  max() {
    return this.heap[1];
  }

  // Return and remove the largest key from the priority queue
  delMax() {
    /*
     * Save reference to the max key.
     * Swap the max key with the last key in the heap.
     * Decrement n so that the key does not swim back up the heap.
     * Sink down the heap to fix any violations that have arisen.
     * Delete the max key to prevent loitering, and return its reference.
     */
    let max = this.heap[1];

    [this.heap[1], this.heap[this.n]] = [this.heap[this.n], this.heap[1]];
    this.n--;
    this.sink(1);
    this.heap[this.n+1] = null;

    return max;
  }

  // Return the number of items in the priority queue
  size() {
    return this.n;
  }

  // Maintains the heap order by sinking down the heap and fixing violations
  sink(k) {
    while (2*k <= this.n) {
      /*
       * While the comparison node (k) still has children (2k or 2k+1), check
       * the parent against both its children. If it is less than either, swap
       * it with the larger of its children. Continue sinking down the heap
       * until a parent is larger than its two children.
       */
      let parent = this.heap[k];
      let child1 = this.heap[2*k];
      let child2 = this.heap[2*k + 1];

      if (parent < child1 || parent < child2) {
        /*
         * If the parent node is smaller than either of its child nodes, swap
         * with the larger of its two children.
         */
        if (child1 >= child2 || child2 === undefined) {
          [this.heap[k], this.heap[2*k]] = [this.heap[2*k], this.heap[k]];
          k = 2*k;
        } else {
          [this.heap[k], this.heap[2*k+1]] = [this.heap[2*k+1], this.heap[k]];
          k = 2*k + 1;
        }
      } else {
        // Return because the parent node is larger than its two children
        return;
      }
    }
  }

  // Maintains the heap order by swimming up the heap and fixing violations
  swim(k) {
    while (k > 1 && this.heap[Math.floor(k/2)] < this.heap[k]) {
      /*
       * While not at root node, swap k (parent) with k/2 (child) if
       * parent<child. Continue swimming upwards until the invariant holds.
       */
      [this.heap[k], this.heap[Math.floor(k/2)]]
        = [this.heap[Math.floor(k/2)], this.heap[k]];
      k = Math.floor(k / 2);
    }
  }
}

let mpq = new MaxPriorityQueue();
mpq.insert(5);
mpq.insert(10);
mpq.insert(15);
mpq.insert(2);
mpq.insert(8);
mpq.delMax();
mpq.delMax();
console.log(mpq.heap);
