/*
 * COUNTING INVERSIONS
 *
 * An inversion in array a[] is a pair of entries a[i] and a[j] such that i < j
 * but a[i] > a[j]. Given an array, design a linearithmic algorithm to count
 * the number of inversions.
 */

const countAndMerge = (arr, low, mid, high) => {
  // Copy the array to be merged into an auxiliary array
  let aux = [];
  for (let k = low; k <= high; k++) {
    aux[k] = arr[k];
  }

  let i = low; // Index pointer for left half of the array
  let j = mid + 1; // Index pointer for right half of the array
  let count = 0; // Count the number of inversions

  for (let k = low; k <= high; k++) {
    if (i > mid) {
      /*
       * Left half of the array is exhausted. This means that the remainder of
       * the array can be populated from the right half, and does not imply any
       * inversions. Populate from right and increment the right counter (j).
       */
      arr[k] = aux[j++];
    } else if (j > high) {
      /*
       * Right half of the array is exhausted. Populate the remainder from the
       * left half and increment the right counter (i). The implied inversions
       * are taken care of when we are populating from the right while the left
       * is still not empty so we do not increment the count here.
       */
      arr[k] = aux[i++];
    } else if (aux[i] <= aux[j]) {
      /*
       * The two elements being compared are in the right order, so populate
       * from the left array and increment the left counter.
       */
      arr[k] = aux[i++];
    } else {
      /*
       * The element on the right is smaller, so populate from the right
       * sub-array and increment the right counter. The number of inversions is
       * the number of elements it "jumped over" on the left side of the array.
       */
      arr[k] = aux[j++];
      count += (mid+1 - i);
    }
  }

  return count;
};

const countInversions = (arr) => {
  let count = 0;
  let interval = 2;
  let low;
  let high;
  let mid;

  /*
   * Starting from intervals of 2, perform bottom-up mergesort to get sorted
   * sub-arrays while counting the number of inversions. If the length of the
   * array is not a factor of 2 and the interval iterates over the end of the
   * array, high will take the rest of the array and perform countAndMerge.
   */
  while (interval <= arr.length) {
    for (let i = 0; i < arr.length; i += interval) {
      low  = i;
      high = Math.min(i + interval - 1, arr.length-1);
      mid  = Math.floor((low + high) / 2);

      // Add the number of inversions that each merge took
      count += countAndMerge(arr, low, mid, high);
    }

    // Increment interval by a factor of two for max log n number of operations
    interval *= 2;
  }

  /*
   * For array lengths that are not a factor of two, the penultimate merge is
   * not balanced, therefore a final merge has to occur with the midpoint at
   * one below the low index of the penultimate merge. For example, for an
   * array of length 5, the merges that will occur are:
   *
   * (At interval: 2): 0 0 1, 2 2 3, and 4 4 4
   * (At interval: 4): 0 1 3 and 4 4 4
   * The final merge has to occur between the sub-arrays 0-3 and 4-4, with the
   * midpoint set at 3 (4-1).
   */
  count += countAndMerge(arr, 0, low-1, arr.length - 1);

  return count;
};

console.log(countInversions([5,4,3,2,1])); // 10
console.log(countInversions([67,3,44,1,7,80])); // 7
console.log(countInversions([16,8,4,2,9,3,6,10])); // 15
