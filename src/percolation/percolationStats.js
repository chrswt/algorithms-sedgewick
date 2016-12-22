/*
 * Adapted from Algorithms, 4th Edition by Robert Sedgewick
 *
 * MONTE CARLO PERCOLATION SIMULATOR
 *
 * http://coursera.cs.princeton.edu/algs4/assignments/percolation.html
 */

const percolation = require('./percolation');
const pSim = percolation.percolationSim;

class PercolationStats {
  constructor(n, trials) {
    this.n = n;
    this.numTrials = trials;
    this.sample = [];
    this.total = null;
    this.mean = null;
    this.stddev = null;
    this.confidenceLo = null;
    this.confidenceHi = null;
  }

  findMean() {
    this.mean = this.total / this.numTrials;
  }

  findStddev() {
    /*
     * For each sample mean, subtract the population mean and square the result
     * Then work out the mean of all the squared differences
     * stddev is the square root of the mean squared differences
     */
    this.stddev = Math.pow((this.sample.reduce((p, c) => {
      return p += Math.pow((c - this.mean), 2);
    }, 0) / this.numTrials), 0.5);
  }

  findConfidenceLo() {
    this.confidenceLo = this.mean - (1.96 * this.stddev) / 
      Math.pow(this.numTrials, 0.5);
  }

  findConfidenceHi() {
    this.confidenceHi = this.mean + (1.96 * this.stddev) / 
      Math.pow(this.numTrials, 0.5);
  }

  sim() {
    for (let i = 0; i < this.numTrials; i++) {
      let result = pSim(this.n);
      this.total += result;
      this.sample.push(result);
    }

    this.findMean();
    this.findStddev();
    this.findConfidenceLo();
    this.findConfidenceHi();

    console.log(`Simulating n = ${this.numTrials} iterations of percolation
      with grid size ${this.n}x${this.n}
      mean = ${this.round(this.mean, 4)}
      stddev = ${this.round(this.stddev, 4)}
      95% confidence interval = ${this.round(this.confidenceLo, 4)}, ${this.round(this.confidenceHi, 4)}`);
  }

  round(int, dp) {
    return Number(Math.round(int + 'e' + dp) + 'e-' + dp);
  }
}

const p = new PercolationStats(200, 100);
p.sim();
