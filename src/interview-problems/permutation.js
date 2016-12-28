/*
 * PERMUTATION
 *
 * Given two integer arrays of size n, design a sub-quadratic algorithm to
 * determine whether one is a permutation of the other. That is, do they
 * contain exactly the same entries but, possibly, in a different order.
 */

const shellSort = require('../elementary-sorts/shellSort').shellSort;

const isPermutation = (arrA, arrB) => {
  // Sort the two arrays using shellsort
  arrA = shellSort(arrA);
  arrB = shellSort(arrB);

  // Iterate through both arrays to check if all elements match
  return arrA.every((e, i) => {
    return e === arrB[i];
  });
};

console.log(isPermutation([1, 2, 3, 4, 5], [4, 1, 3, 5, 2])); // true
console.log(isPermutation([0, 0, 3, 1, 3], [3, 3, 1, 1, 0])); // false

/*
 * Note: this problem could also be solved outside the context of shellsort in
 * something close to ~3n linear time. This could be done by loading all the
 * elements of each array into a separate object, then first ensuring that the
 * number of keys in each object are the same, then ensuring that the key/value
 * pairs in each object are the same. This however, would require extra space.
 */
