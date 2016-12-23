/*
 * THREE SUM
 *
 * Find the number of triples of integers in an input file that sum to 0.
 * Assume that the integers are distinct. Solve the problem with O(n^2 log n)
 * time complexity.
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

const threeSum = (arr) => {
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
  let count = 0;

  for (let i = 0; i < arr.length - 2; i++) {
    for (let j = i + 1; j < arr.length - 1; j++) {
      let result = binarySearch(arr, -(arr[i] + arr[j]));
      if (result >= 0 && result > j) { count++; }
    }
  }

  return count;

  /*
   * Note that while the above implementation is O(n^2 log n), we could also
   * further optimize this by storing all the integers in a hash table, which
   * would allow for O(1) retrieval and search for a corresponding triple.
   * This would eliminate the need for binary search and therefore searching,
   * resulting in an O(n^2) implementation.
   */

};

let input = [];

fs.readFile('../../input/analysis-of-algorithms/4Kints.txt', 'utf-8', (err, data) => {
  data.split('\n').forEach((int) => {
    if (int !== '') { input.push(Number(int)); }
  });

  console.log(threeSum(input)); // 3
});
