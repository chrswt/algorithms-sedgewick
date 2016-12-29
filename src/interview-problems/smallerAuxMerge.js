/*
 * MERGING WITH SMALLER AUXILIARY ARRAY
 *
 * Suppose that the subarray a[0] to a[n-1] is sorted and the subarray a[n] to
 * a[2*n - 1] is sorted. How can you merge the two subarrays so that a[0] to
 * a[2*n - 1] is sorted using an auxiliary array of length n (instead of 2n)?
 */

const smallerAuxMerge = (sortedArr1, sortedArr2) => {
  /*
   * Copy the first sorted array into the auxiliary array because we are using
   * the first sorted array to store the results of the first half of the merge
   * operations. We iterate through the first and second sorted arrays using
   * the indices i and j, while populating the sorted results with pointer k.
   */
  let aux = sortedArr1.slice();
  let n = sortedArr1.length;
  let i = 0;
  let j = 0;
  let k = 0;

  const fill = (k, element) => {
    // Fill either sorted array 1 or 2 with the next element
    if (k < n) {
      // Fill into sortedArr1
      sortedArr1[k] = element;
    } else {
      // Fill into sortedArr2
      sortedArr2[k % n] = element;
    }
  };

  while (i < n || j < n) {
    /*
     * Conditions:
     * 1) If aux array exhausted, fill from 2nd sorted array
     * 2) If 2nd sorted array exhausted, fill from aux array
     * 3) If element in 2nd array larger, fill from 2nd array
     * 4) Otherwise, fill from aux array
     *
     * Always increment k and i/j (depending on which array) after each fill
     */
    i >= n ? fill(k++, sortedArr2[j++]) :
    j >= n ? fill(k++, aux[i++]) :
    aux[i] > sortedArr2[j] ? fill(k++, sortedArr2[j++]) : fill(k++, aux[i++]);
  }

  return sortedArr1.concat(sortedArr2);
};

console.log(smallerAuxMerge([5, 8, 10], [6, 7, 9])); // [5, 6, 7, 8, 9, 10]
