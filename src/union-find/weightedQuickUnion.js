const fs = require('fs');

class WeightedQuickUnion {
  constructor() {
    this.numComponents = null;
    this.id = [];
    this.size = [];
  }

  initialize(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err !== null) { console.log(err); }
      let parsedData  = data.split('\n');
      this.numComponents = Number(parsedData[0]);

      for (let i = 0; i < this.numComponents; i++) {
        // Set id of each object to itself
        this.id.push(i);
        // Instantiate the size of each component as 1
        this.size.push(1);
      }

      // Read the input and create dynamic connections
      for (let j = 1; j < parsedData.length - 1; j++) {
        let p = Number(parsedData[j].split(' ')[0]);
        let q = Number(parsedData[j].split(' ')[1]);

        if (!this.connected(p, q)) { // Ignore connected components
          this.union(p, q); // Combine unconnected components
          console.log(`Joined ${p} and ${q}`);
        }
      }

      console.log(`Number of components: ${this.count()}`);
    });
  }

  union(p, q) {
    // Put p and q into the same component
    let pRoot = this.root(p);
    let qRoot = this.root(q);

    if (pRoot !== qRoot) {
      // Give p and q the same root if they did not already have the same root
      if (this.size[pRoot] < this.size[qRoot]) {
        // Make the smaller root point to the larger one, and increase its size
        this.id[pRoot] = qRoot;
        this.size[pRoot] += this.size[qRoot];
      } else {
        this.id[qRoot] = pRoot;
        this.size[qRoot] += this.size[pRoot];
      }

      this.numComponents--;
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

  connected(p, q) {
    // Check if p and q have the same root
    return this.root(p) === this.root(q);
  }

  count() {
    return this.numComponents;
  }
}

const wqu = new WeightedQuickUnion();
wqu.initialize('../../input/union-find/tinyUF.txt');
