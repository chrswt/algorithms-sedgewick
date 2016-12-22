const fs = require('fs');

class QuickFind {
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
          this.numComponents--;
          console.log(`Joined ${p} and ${q}`);
        }
      }

      console.log(`Number of components: ${this.count()}`);
    });
  }

  union(p, q) {
    // Put p and q into the same component
    let pID = this.find(p);
    let qID = this.find(q);

    if (!(pID === qID)) {
      // Change all values from id[p] to id[q] iff they're not already the same
      for (let i = 0; i < this.id.length; i++) {
        if (this.id[i] === pID) {
          this.id[i] = qID;
        }
      }
    }
  }

  find(p) {
    return this.id[p];
  }

  connected(p, q) {
    return this.id[p] === this.id[q];
  }

  count() {
    return this.numComponents;
  }
}

const qf = new QuickFind();
qf.initialize('../../input/union-find/tinyUF.txt');
