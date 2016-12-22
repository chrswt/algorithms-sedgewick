const fs = require('fs');

class QuickUnion {
  constructor() {
    this.numComponents = null;
    this.id = [];
  }

  initialize(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err !== null) { console.log(err); }
      let parsedData  = data.split('\n');
      this.numComponents = Number(parsedData[0]);

      for (let i = 0; i < this.numComponents; i++) {
        // Set id of each object to itself
        this.id.push(i);
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
      this.id[pRoot] = qRoot;
      this.numComponents--;
    }
  }

  root(i) {
    // Chase parent pointers until the root is reached
    while (i !== this.id[i]) { i = this.id[i]; }
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

const qu = new QuickUnion();
qu.initialize('../../input/union-find/tinyUF.txt');
