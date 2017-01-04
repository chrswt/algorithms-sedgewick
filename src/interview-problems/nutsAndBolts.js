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

    //this.nuts = [2,3,4,0,1];
    //this.bolts = [2,4,1,0,3];/**/

    console.log('NUTS', this.nuts);
    console.log('BOLTS', this.bolts);
  }

  // Compare a nut with a bolt, returning 1 if nut > bolt
  compare(nut, bolt) {
    if (nut > bolt) return 1;
    else if (nut < bolt) return -1;
    else return 0;
  }

  // Partition nut on ref bolt or bolt on ref nut
  partition(arr, low, high, ref) {
    console.log('Calling partition on', arr, low, high, 'checking against', ref);
    // Setting at low-1 because we do want to check low against ref
    let i = low - 1;
    let j = high + 1;
    let p = null;

    while (true) {
      // Increment i as long as it is less than the ref
      while (this.compare(arr[++i], ref) <= 0) {

        if (i === high) break;
        console.log('i is', i, 'arr[i] is', arr[i]);
        if (arr[i] === ref) {
          console.log('changing p to i', i);
          p = i;
          break;

        }

      }

      // Decrement j as long as it is greater than the ref
      while (this.compare(arr[--j], ref) >= 0) {
        if (j === low) break;
        if (arr[j] === ref) {
          console.log('changing p to j', j);
          p = j;
          break;
        }

      }

      // Check if the pointers cross
      if (i >= j) {
        //j = i;

        //j++;
        break;
      }

      // Swap when we find two elements that violate the invariant
      console.log('swap', arr[i], arr[j]);
      console.log('pre-swap p', p);
      if (p === j) p = i;
      else if (p === i) p = j;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // Swap j and low
    console.log('swap j and p', j, p);
    //[arr[j], arr[p]] = [arr[p], arr[j]];

    console.log('arr has been modified to', arr);
    console.log('this.nuts has been modified to', this.nuts);
    console.log('J VALUE', j);
    return j;
  }

  match(nuts=this.nuts, bolts=this.bolts, low=0, high=nuts.length-1) {
    console.log('recursively calling match on', nuts, bolts, low, high);
    if (low >= high) return;

    let pivot = this.partition(this.nuts, low, high, this.bolts[low]);

    this.partition(this.bolts, low, high, this.nuts[pivot]);

    this.match(this.nuts, this.bolts, low, pivot-1);
    this.match(this.nuts, this.bolts, pivot+1, high);

    console.log('Nuts And Bolts', nuts, bolts);
  }
}

let nb = new NutsAndBolts(5);
//console.log(nb);
//console.log(nb.partition([5,2,3,1,4], 0, 4, 1));
nb.match();