/*
 * Partitions the sub-array a[low..high] such that
 *    a[low..j-1] <= a[j] <= a[j+1..high]
 * and return the index j.
 */
const partition = (arr, low, high) => {
  let i = low;
  let j = high + 1;
  let v = a[low]; // Partitioning element

  while (true) {
    /*
     * Note: the reason we increment i first and decrement j first (and
     * therefore start i at low rather than low+1, and j at high+1 rather than
     * high) is so that we can save the pointer reference to i and j whenever
     * we find two pairs of elements to swap.
     */

    // Find the low item to swap (any item greater than or equal to v)
    while (a[++i] < v) {
      if (i === high) break;
    }

    // Find the high item to swap (any item less than or equal to v)
    while (a[--j] > v) {
      if (j === low) break; // Redundant since a[low] acts as sentinel
    }

    // Check if the pointers cross
    if (i >= j) break;

    // Each time we find both i and j, swap them
    [a[i], a[j]] = [a[j], a[i]];
  }

  /*
   * Swap the positions of the partitioning item v with the element at a[j].
   * This maintains the invariant a[low..j-1] <= a[j] <= a[j+1..high].
   */
  [a[low], a[j]] = [a[j], a[low]];

  return j;
};

const quicksort = (arr, low=0, high=arr.length-1) => {
  if (low >= high) return;

  let j = partition(arr, low, high);
  quicksort(arr, low, j-1);
  quicksort(arr, j+1, high);

  return arr;
};

let a = [6,4,2,1,0,29,3,62];
a = quicksort(a);
console.log(a);