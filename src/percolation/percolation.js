/*
 * Adapted from Algorithms, 4th Edition by Robert Sedgewick
 * 
 * PERCOLATION
 * Write a program to estimate the value of the percolation threshold via Monte
 * Carlo simulation.
 *
 * Percolation: Given a porous landscape with water on the surface, under what
 * conditions will water be able to drain through to the bottom? The abstract
 * process of percolation is designed to model such situations.
 *
 * The model: We model a percolation system using an n-by-n grid of sites. Each
 * site is either open or blocked. A full site is an open site that can be
 * connected to an open site in the top row via a chain of neighboring (left,
 * right, up, down) open sites. We say the system percolates if there is a full
 * site in the bottom row. In other words, a system percolates if we fill all
 * open sites connected to the top row and that process fills some open site on
 * the bottom row.
 *
 * The problem: If sites are independently set to be open with probability p
 * (and therefore blocked with probability 1 - p), what is the probability that
 * the system percolates? When p equals 0, the system does not percolate; when
 * p equals 1, the system percolates. When n is sufficiently large, there is a
 * threshold value p* such that when p < p* a random n-by-n grid almost never
 * percolates, and when p > p*, a random n-by-n grid almost always percolates.
 * Write a program to estimate p*.
 *
 * http://coursera.cs.princeton.edu/algs4/assignments/percolation.html 
*/

class Percolation {
  constructor(n) {
    this.grid = []; // Grid representation of sites
    this.id = []; // Root representation of connected components
    this.n = n;
    this.size = [];

    for (let i = 0; i < n * n; i++) {
      this.grid.push(0); // Instantiate each site as a blocked site
      this.id.push(i); // Instantiate each site with a self-referencing root
    }
  }

  open(int) {
    const n = this.n;
    const union = this.union.bind(this);
    const isOpen = this.isOpen.bind(this);
    // Open site (if it is not open already)
    if (!this.grid[int]) {
      this.grid[int] = 1;
    }

    if (int >= 0 && int < n) { // Combining components with sites at top row
      if (isOpen(int + n)) { union(int, int + n); }
      if (int !== 0 && isOpen(int - 1)) { union(int, int - 1); }
      if (int !== n - 1 && isOpen(int + 1)) { union(int, int + 1); }
    } else if (int >= n * n - n && int < n * n) { // Bottom row
      if (isOpen(int - n)) { union(int, int - n); }
      if (int !== n * n - n && isOpen(int - 1)) { union(int, int - 1); }
      if (int !== n - 1 && isOpen(int + 1)) { union(int, int + 1); }
    } else if (int % n === 0) { // Combining components with sites at left col
      if (isOpen(int + 1)) { union(int, int + 1); }
      if (int !== 0 && isOpen(int - n)) { union(int, int - n); }
      if (int !== n * n - n + 1 && isOpen(int + n)) { union(int, int + n); }
    } else if (int % n === n - 1) { // Right col
      if (isOpen(int - 1)) { union(int, int - 1); };
      if (int !== n - 1 && isOpen(int - n)) { union(int, int - n); }
      if (int !== n * n - 1 && isOpen(int + n)) { union(int, int + n); }
    } else {
      if (isOpen(int - n)) { union(int, int - n); }
      if (isOpen(int + n)) { union(int, int + n); }
      if (isOpen(int - 1)) { union(int, int - 1); }
      if (isOpen(int + 1)) { union(int, int + 1); }
    }
  }

  isOpen(int) {
    // Returns a boolean if site is open
    return this.grid[int] === 1;
  }

  isFull(int) {
    /*
     * Returns a boolean if site is open and can be connected to an open site
     * in the top row via a chain of neighboring open sites
     */
    return this.id[int] >= 0 && this.id[int] < this.n;
  }

  percolates() {
    // If any of the bottom sites are full, the grid percolates
    const n = this.n;

    for (let i = n * n - n; i < n * n; i++) {
      if (this.isFull(i)) { return true; }
    }

    return false;
  }

  union(p, q) {
    // Put p and q into the same component
    let pRoot = this.root(p);
    let qRoot = this.root(q);

    if (pRoot !== qRoot) {
      // Give p and q the same root if they did not already have the same root
      if (pRoot >= qRoot) {
        // Point to the root closer to the top of the grid
        this.id[pRoot] = qRoot;
        this.size[pRoot] += this.size[qRoot];
      } else {
        this.id[qRoot] = pRoot;
        this.size[qRoot] += this.size[pRoot];
      }
    }
  }

  root(i) {
    // Chase parent pointers until the root is reached
    while (i !== this.id[i]) {
      while (this.id[i] !== this.id[this.id[i]]) {
        // Two-pass implementation of path compression, pointing to the root
        this.id[i] = this.id[this.id[i]];
      }
      i = this.id[i];
    }

    return i;
  }
}

const percolationSim = (n) => {
  const p = new Percolation(n);
  let random;
  let count = 0;

  while (!p.percolates()) {
    random = Math.floor(Math.random() * n * n);
    if (!p.isOpen(random)) {
      p.open(random);
      count++;
    }
  }

  // Return the percentage of open sites required for percolation
  return count / (n * n);
}

if (!module.parent) {
  console.log(percolationSim(500));
}

module.exports = {
  Percolation: Percolation,
  percolationSim: percolationSim,
}
