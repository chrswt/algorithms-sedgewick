/*
 * Heapsort implementation that sorts an array in-place in ascending order,
 * uses 0-based indexing.
 */

const sink = (arr, k, n) => {
  /*
   * Maintains the binary heap for arr[k..n] by checking for and fixing
   * violations by swapping smaller parent nodes with the larger of its two
   * child nodes. Uses 0-based indexing.
   */
  while (2*k + 1 < n) {
    /*
     * Note: because 2k + 1 < n rather than 2k + 1 <= n, we are never checking
     * the final sub-heap in order to prevent accidentally swapping back up the
     * recently removed max key. Check if this will produce unexpected results.
     */
    let parent = arr[k];
    let child1 = arr[2*k + 1];
    let child2 = arr[2*k + 2];

    if (parent < child1 || parent < child2) {
      if (child1 >= child2 || child2 === undefined) {
        [arr[k], arr[2*k + 1]] = [arr[2*k + 1], arr[k]];
        k = 2*k + 1;
      } else {
        [arr[k], arr[2*k + 2]] = [arr[2*k + 2], arr[k]];
        k = 2*k + 2;
      }
    } else return;
  }
 };

const heapsort = (arr) => {
  let n = arr.length - 1;

  /*
   * First, build up the heap in-place using the bottom-up method. Go backwards
   * through the heap starting at element at index n/2 (because the rightmost
   * half of the array is composed of little heaps of size 1). Sink each to
   * build out a heap.
   */
  for (let i = Math.floor(n/2); i >= 0; i--) {
    sink(arr, i, n);
  }

  /*
   * Next, sortdown the heap by removing the maximum one at a time, leaving it
   * at the end of the array while decrementing n so that it does not swim back
   * up. Each time a max key is removed, perform a sink operation for the new
   * key at the 0th index, ensuring that the binary heap invariant is restored.
   */
  while (n > 0) {
    [arr[0], arr[n]] = [arr[n], arr[0]];
    n--;
    sink(arr, 0, n);
  }

  return arr;
};

console.log(heapsort([34,6,4,1,2,9,32,-3,13]));
console.log(heapsort([3,2,5,1,4,5,2,-3,2,-5,0,3,2]));
