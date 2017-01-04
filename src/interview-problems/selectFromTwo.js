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
  let i = Math.floor(a.length / 2);
  let j = Math.floor(b.length / 2);

  if (a[i] < b[j]) {
    [a, b] = [b, a];
    [i, j] = [j, i];
  }

  /*
   * Comparing a[i] and b[j]: we have established that A[i] > B[j] and A and B
   * are both sorted with respect to themselves.
   *
   * Lowest position that a[i] can be:
   *   - all i elements to the left in a[] are smaller (i)
   *   - all j elements in b[] including j are smaller (j + 1)
   *   => lowest position a[i] can be is `i + j + 2`
   *
   * Highest position that a[i] can be:
   *   - all i elements to the left in a[] are smaller (i)
   *   - if all elements in b[] are smaller than it (b.length elements)
   *   => highest position a[i] can be is `i + b.length + 1`
   *
   * Lowest position that b[j] can be:
   *   - all j elements to the left in b[] are smaller (j + 1)
   *   - if all elements in a[] are bigger than it (0)
   *   => lowest position b[j] can be is `j + 1`
   *
   * Highest position that b[j] can be:
   *   - all j elements to the left in b[] are smaller (j + 1)
   *   - if all elements in a[] before a[i] was smaller (i)
   *   => highest position b[j] can be is `i + j + 1`
   */
  let aLow = i + j + 2;
  let aHigh = i + b.length + 1;
  let bLow = j + 1;
  let bHigh = i + j + 1;

  /*
   * Since we are searching for the kth smallest element, if k did not exist
   * within these bounds, then neither a[i] nor b[j] can be the kth smallest.
   *
   * 1) If k is smaller than the lowest possible a[i] position, aLow, then a[i]
   * and all elements after it are not the kth smallest element.
   * 2) If k is bigger than the highest possible a[i] position, aHigh, then
   * a[i] and all elements before it are not the kth smallest element. In this
   * scenario, we now have to decrement k by the amount of elements removed:
   * i - 1.
   *
   */
  if (k < aLow) a = a.slice(0, i);
  else if (k > aHigh) {
    a = a.slice(i + 1);
    k -= (i + 1);
  }

  /*
   * Repeat the same process to eliminate sub-sections of array b[].
   */
  if (k < bLow) b = b.slice(0, j);
  else if (k > bHigh) {
    b = b.slice(j + 1);
    k -= (j + 1);
  }

  return selectFromTwo(a, b, k);
};

console.log(selectFromTwo([1,2,3,4,5], [0,10,20,30,40], 3)); // 2
console.log(selectFromTwo([3,8,12,19,31,52],[5],4)); // 12
