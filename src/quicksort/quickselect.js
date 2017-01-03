/*
 * Quick-select implementation. This algorithm rearranges the array so that
 * a[k] contains the kth smallest key.
 */

const partition = require('./quicksort').partition;
const shuffle = require('./quicksort').shuffle;

const quickselect = (arr, k) => {
  // Shuffle the array to guarantee average linear-time performance
  arr = shuffle(arr);

  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let j = partition(arr, low, high);

    /*
     * We know that the jth element is sorted such that all elements on its
     * left are less than arr[j] and all elements on its right are greater than
     * arr[j] (or equal to). So in order for us to ensure that the kth element
     * is sorted, we need to partition either the left or right sub-array.
     */
    if (j > k) {
      // Partition left sub-array
      high = j - 1;
    } else if (j < k) {
      // Partition right sub-array
      low = j + 1;
    } else {
      // The kth item is already in position j
      return arr[j];
    }
  }

  /*
   * After sorting a two element sub-array, where low is one less than high, we
   * will increment low or decrement high such that the outer while loop
   * breaks. However, rather than partition an array of size 1, which is
   * trivially partitioned, we know that the element in this position, k, is
   * the kth largest element in the array and we can return it when the while
   * loop breaks at low = high = k.
   */
  return arr[low];
};

console.log(quickselect([7,2,3,0,9,6], 0)); // 0
console.log(quickselect([9,8,7,6], 3)); // 9
console.log(quickselect([2,9,4,1,10,3,0], 2)); // 2
