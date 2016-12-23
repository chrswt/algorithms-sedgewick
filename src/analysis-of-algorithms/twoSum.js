/*
 * TWO SUM
 *
 * Find the number of pairs of integers in an input file that sum to 0. Assume
 * that the integers are distinct. Solve the problem with O(n log n) complexity
 */

const fs = require('fs');

const binarySearch = (sortedArray, key) => {
  let low = 0;
  let high = sortedArray.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (sortedArray[mid] === key) {
      return mid; // Found the index of the key
    } else if (key > sortedArray[mid]) {
      low = mid + 1; // Go right
    } else if (key < sortedArray[mid]) {
      high = mid - 1; // Go left
    }
  }

  return -1; // Key not found
};

const twoSum = (arr) => {
  /*
   * Here we use JavaScript's native sort method, which is implemented using
   * QuickSort. However, we could also use MergeSort to guarantee O(n log n)
   * worst case time complexity.
   */
  arr = arr.sort((a, b) => {
    return a - b;
  });

  /*
   * Attempt to find the negative of the current element in the array using
   * binary search. Only increment count if index of current element greater
   * than index of found element to prevent double incrementation of count.
   */
  return arr.reduce((p, c, i) => {
    let result = binarySearch(arr, -c);
    return p += result >= 0 && i > result ? 1 : 0;
  }, 0);
};

let input = [];

fs.readFile('../../input/analysis-of-algorithms/4Kints.txt', 'utf-8', (err, data) => {
  data.split('\n').forEach((int) => {
    input.push(Number(int));
  });

  console.log(twoSum(input)); // 3
});
