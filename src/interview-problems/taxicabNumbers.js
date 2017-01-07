/*
 * TAXICAB NUMBERS
 * A taxicab number is an integer that can be expressed as the sum of two
 * cubes of integers in two different ways: a^3 + b^3 = c^3 + d^3. For
 * example, 1729 = 9^3 + 10^3 = 1^3 + 12^3. Design an algorithm to find
 * all taxicab numbers with a, b, c, and d less than n.
 *
 * Version 1: Use time proportional to n^2 log n and space proportional to n^2.
 * Version 2: Use time proportional to n^2 log n and space proportional to n.
 */

class MinPriorityQueue {
  constructor() {
    this.heap = []; // binary heap that stores the keys
    this.n    = 0;  // number of items in the priority queue
  }

  // Insert a key into the priority queue
  insert(key) {
    /*
     * Add the key to the end of the heap and increment n, then swim up the
     * heap to fix any violations that have arisen.
     */
    this.heap[++this.n] = key;
    this.swim(this.n);
  }

  // Return the smallest key from the priority queue
  min() {
    return this.heap[1];
  }

  // Return and remove the smallest key from the priority queue
  delMin() {
    /*
     * Save reference to the min key.
     * Swap the min key with the last key in the heap.
     * Decrement n so that the key does not swim back up the heap.
     * Sink down the heap to fix any violations that have arisen.
     * Delete the min key to prevent loitering, and return its reference.
     */
    let min = this.heap[1];

    [this.heap[1], this.heap[this.n]] = [this.heap[this.n], this.heap[1]];
    this.n--;
    this.sink(1);
    this.heap[this.n+1] = null;

    return min;
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
       * the parent against both its children. If greater than either, swap
       * it with the larger of its children. Continue sinking down the heap
       * until a parent is smaller than its two children.
       */
      let parent = this.heap[k].priority;
      let child1 = this.heap[2*k].priority;
      let child2 = this.heap[2*k + 1].priority;

      if (parent > child1 || parent > child2) {
        /*
         * If the parent node is smaller than either of its child nodes, swap
         * with the larger of its two children.
         */
        if (child1 <= child2 || child2 === undefined) {
          [this.heap[k], this.heap[2*k]] = [this.heap[2*k], this.heap[k]];
          k = 2*k;
        } else {
          [this.heap[k], this.heap[2*k+1]] = [this.heap[2*k+1], this.heap[k]];
          k = 2*k + 1;
        }
      } else {
        // Return because the parent node is smaller than its two children
        return;
      }
    }
  }

  // Maintains the heap order by swimming up the heap and fixing violations
  swim(k) {
    while (k > 1 && this.heap[Math.floor(k/2)] > this.heap[k]) {
      /*
       * While not at root node, swap k (parent) with k/2 (child) if
       * parent > child. Continue swimming upwards until the invariant holds.
       */
      [this.heap[k], this.heap[Math.floor(k/2)]]
        = [this.heap[Math.floor(k/2)], this.heap[k]];
      k = Math.floor(k / 2);
    }
  }
}