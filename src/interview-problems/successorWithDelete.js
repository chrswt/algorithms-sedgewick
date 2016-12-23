/*
 * SUCCESSOR WITH DELETE
 *
 * Given a set of N integers S = {0, 1, ..., N - 1} and a sequence of
 * requests of the following form:
 *   - Remove x from S
 *   - Find the successor of x: the smallest y in S such that y >= x
 *
 * Design a data type so that all operations (except construction) should
 * take logarithmic time or better.
 */

class SuccessorWithDelete {
  constructor(n) {
    this.data = [];
    this.n = n;

    for (let i = 0; i < n; i++) {
      this.data.push(i);
    }
  }

  union(a, b) {
    // Combining two com
    this.data[a] = this.data[b];
  }

  isRemoved(x) {
    // We say that x is removed if it no longer points to itself as a root
    return !(this.data[x] === x);
  }

  remove(x) {
    // Check if x has already been removed
    if (this.isRemoved(x)) { return; }
    this.union(x, x + 1);
  }

  successor(x) {
    if (!this.isRemoved(x)) {
      return x;
    } else {
      while (this.isRemoved(x)) {
        // Search up the tree until we find a self-referencing element
        x = this.data[x];
      }

      return this.data[x];
    }
  }
}

const swd = new SuccessorWithDelete(10);
swd.remove(2);
console.log(swd.successor(2)); // 3
swd.remove(3);
console.log(swd.successor(2)); // 4
console.log(swd.successor(8)); // 8
swd.remove(8);
console.log(swd.successor(8)); // 9
swd.remove(9);
console.log(swd.successor(9)); // undefined
swd.remove(5);
swd.remove(4);
console.log(swd.successor(3)); // 6
