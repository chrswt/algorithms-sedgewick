import percolation from './percolation'
const percolator = percolation.percolation;
const percolatorSim = percolation.percolationSim;
class PercolationStats {
  constructor(n, trials, expectedValue) {
    this.n = n;
    this.trials = trials;
    this.currentTrial = 0;
    this.total = null;
    this.stddev = null;
    this.confidenceLo = null;
    this.confidenceHi = null;
    this.data = [];
  }

  mean(total) {
    return total / this.trials;
  }
  stddev() {
    const mean = this.mean(this.total);
    return Math.sqrt(
      this.data.reduce(
        (acc, data) => {
          acc + Math.pow((data - mean), 2);
        }, 0));
  }
  confidenceLo() {}
  confidenceHi() {}
  sim() {
    for (let i = 0; i < trials; i++) {
      this.data.push(percolatorSim(this.n));
    }

  }
}

/*
New average = old average * (n-1)/n + new value /n 
This is assuming the count only changed by one (in case it changed by m then:

new average =old average * (n-m)/n + sum of new value/n).
This is the mathematical formula (I believe the most efficient one), believe you can do further code by yourselves
*/


/*
public PercolationStats(int n, int trials)    // perform trials independent experiments on an n-by-n grid
   public double mean()                          // sample mean of percolation threshold
   public double stddev()                        // sample standard deviation of percolation threshold
   public double confidenceLo()                  // low  endpoint of 95% confidence interval
   public double confidenceHi()                  // high endpoint of 95% confidence interval
*/

