/*
 * NUTS AND BOLTS
 * A disorganized carpenter has a mixed pile of n nuts and n bolts. The goal is
 * to find the corresponding pair of nuts and bolts. Each nut fits exactly one
 * bolt and each bolt fits exactly one nut. By fitting a nut and bolt together,
 * the carpenter can see which one is bigger (but the carpenter cannot compare
 * two nuts or two bolts directly). Design an algorithm for the problem that
 * uses n log n compares (probabilistically).
 */

const shuffle = require('../quicksort/quicksort').shuffle;

class NutsAndBolts {
  constructor(n) {
    this.nuts = [];
    this.bolts = [];

    // Populate the nuts and bolts arrays with n nuts and n bolts
    for (let i = 0; i < n; i++) {
      this.nuts.push(i);
      this.bolts.push(i);
    }

    this.nuts = shuffle(this.nuts);
    this.bolts = shuffle(this.bolts);
  }

  // Compare a nut with a bolt, returning 1 if nut > bolt
  compare(nut, bolt) {
    if (nut > bolt) return 1;
    else if (nut < bolt) return -1;
    else return 0;
  }

  // Partition nut on ref bolt or bolt on ref nut
  partition(arr, low, high, ref) {
    let i = low;
    let j = high;
    let p = null;

    while (true) {
      // Increment i as long as it is less than the ref
      while (this.compare(arr[i], ref) <= 0) {
        if (i === high) break;
        // If we find the perfect nut/bolt, take note of it
        if (arr[i] === ref) {
          p = i;
          break;
        }
        i++;
      }

      // Decrement j as long as it is greater than the ref
      while (this.compare(arr[j], ref) >= 0) {
        if (j === low) break;
        if (arr[j] === ref) {
          // If we find the perfect nut/bolt, take note of it
          p = j;
          break;
        }
        j--;
      }

      // Check if the pointers cross
      if (i >= j) break;

      /*
       * Swap when we find two elements that violate the invariant. But first,
       * ensure that we update the pointer to the perfect fit so that we can
       * ensure that the array is properly partitioned.
       */
      if (p === j) p = i;
      else if (p === i) p = j;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // Swap the found match with the last pointer at j to maintain the invariant
    [arr[j], arr[p]] = [arr[p], arr[j]];

    return p;
  }

  match(nuts=this.nuts, bolts=this.bolts, low=0, high=nuts.length-1) {
    if (low >= high) return;

    let pivot = this.partition(this.nuts, low, high, this.bolts[low]);

    this.partition(this.bolts, low, high, this.nuts[pivot]);

    this.match(this.nuts, this.bolts, low, pivot-1);
    this.match(this.nuts, this.bolts, pivot+1, high);

    return [nuts, bolts];
  }
}

let nb = new NutsAndBolts(10);
console.log(nb.match());
