const fs = require('fs');

/*
 * Partitions the sub-array a[low..high] such that
 *    a[low..j-1] <= a[j] <= a[j+1..high]
 * and return the index j.
 */
const partition = (arr, low, high) => {
  let i = low;
  let j = high + 1;
  let v = arr[low]; // Partitioning element

  while (true) {
    /*
     * Note: the reason we increment i first and decrement j first (and
     * therefore start i at low rather than low+1, and j at high+1 rather than
     * high) is so that we can save the pointer reference to i and j whenever
     * we find two pairs of elements to swap.
     */

    // Find the low item to swap (any item greater than or equal to v)
    while (arr[++i] < v) {
      if (i === high) break;
    }

    // Find the high item to swap (any item less than or equal to v)
    while (arr[--j] > v) {
      if (j === low) break; // Redundant since a[low] acts as sentinel
    }

    // Check if the pointers cross
    if (i >= j) break;

    // Each time we find both i and j, swap them
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  /*
   * Swap the positions of the partitioning item v with the element at a[j].
   * This maintains the invariant a[low..j-1] <= a[j] <= a[j+1..high].
   */
  [arr[low], arr[j]] = [arr[j], arr[low]];

  return j;
};

// Implementation of Fischer-Yates Shuffle to guarantee linearithmic performance
const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    // Generate a random integer between 0 and counter
    let rnd = Math.floor(Math.random() * counter);
    counter--;

    // Swap the element at the random index with the element at counter
    [arr[counter], arr[rnd]] = [arr[rnd], arr[counter]];
  }

  return arr;
};

const quicksort = (arr, low=0, high=arr.length-1) => {
  if (low >= high) return;

  if (low === 0 && high === arr.length-1) {
    // If this is the first time running through, shuffle the array
    arr = shuffle(arr);
  }

  // Partition the array on some j, then recursively partition the rest
  let j = partition(arr, low, high);
  quicksort(arr, low, j-1);
  quicksort(arr, j+1, high);

  return arr;
};

fs.readFile('../../input/mergesort/tiny.txt', 'utf-8', (err, data) => {
  let sorted = quicksort(data.split('\n').join('').split(' '));
  console.log(sorted); // ['A', 'E', 'E', ..., 'X']
});
