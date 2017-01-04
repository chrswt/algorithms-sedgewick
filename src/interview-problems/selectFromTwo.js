/*
 * SELECTION IN TWO SORTED ARRAYS
 * Given two sorted arrays a[] and b[], of sizes n_1 and n_2, respectively,
 * design an algorithm to find the kth largest key. The order of growth of the
 * worst case running time of your algorithm should be
 * log n, where n = n_1 + n_2.
 */

const selectFromTwo = (a, b, k) => {
  /*
   * If one of the arrays is empty, the kth smallest element is in the
   * non-empty array at index k-1.
   */
  if (a.length === 0) return b[k-1];
  if (b.length === 0) return a[k-1];

  /*
   * Any elements that are of index k or greater in either array can be
   * discarded because they cannot be one of the kth smallest elements.
   */
  if (a.length > k) a = a.slice(0, k);
  if (b.length > k) b = b.slice(0, k);

  /*
   * Establish the midpoints of both arrays in order to perform binary search.
   * For ease, we want to maintain the invariant A[i] > B[j], so we swap them
   * if this invariant is violated.
   */
  let i = Math.floor(a.length / 2); // ***
  let j = Math.floor(b.length / 2);

  if (a[i] < b[j]) {
    [a, b] = [b, a];
    [i, j] = [j, i];
  }

  /*
   *
   */
};

console.log(selectFromTwo([1,2,3,4,5], [], 3));