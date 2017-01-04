/*
 * DECIMAL DOMINANTS
 * Given an array with n keys, design an algorithm to find all values that
 * occur more than n/10 times. The expected running time of your algorithm
 * should be linear.
 */

const decimalDominants = (arr) => {
  let n = arr.length;

  // Record the frequencies of each key occuring in the array
  let freq = arr.reduce((p, c) => {
    p[c] === undefined ? p[c] = 1 : p[c] += 1;
    return p;
  }, {});

  // Filter out keys that occur less than n/10 times, convert to integers
  return Object.keys(freq).filter((key) => {
    return Number(freq[key]) >= n/10;
  }).map((key) => {
    return Number(key);
  });

};

console.log(decimalDominants([4,2,1,3,4,5,1,2,2,3,2])); // [1,2,3,4]
