/*
 * BITONIC ARRAY SEARCH
 *
 * An array is bitonic if it is comprised of an increasing sequence of integers
 * followed immediately by a decreasing sequence of integers. Write a program
 * that, given a bitonic array of n distinct integer values, determines whether
 * a given integer is in the array.
 *
 * Use ~3 lg n comparisons in the worst case
 */

const binarySearch = (sortedArray, key, option='asc') => {
  let low = 0;
  let high = sortedArray.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (sortedArray[mid] === key) {
      return mid; // Found the index of the key
    } else if (key > sortedArray[mid]) {
      option === 'asc' ? low = mid + 1 : high = mid - 1;
    } else if (key < sortedArray[mid]) {
      option === 'asc' ? high = mid - 1 : low = mid + 1;
    }
  }

  return -1; // Key not found
};

const bitonicArraySearch = (array, key) => {
  let low = 0;
  let high = array.length - 1;
  let found = false;

  // Apply a modified version of binary search in order to find the inflection
  while (low <= high && found === false) {
    let mid = Math.floor((low + high) / 2);

    if (array[mid] === key) {
      return mid; // Point of inflection is the key
    } else if (array[mid] > array[mid - 1] && array[mid] > array[mid + 1]) {
      found = mid;
    } else if ((array[mid] > array[mid - 1] || array[mid - 1] === undefined)
        && array[mid] < array[mid + 1]) {
      low = mid + 1; // Go right if the series is still ascending
    } else if (array[mid] < array[mid - 1]
        && (array[mid] > array[mid + 1]) || array[mid + 1] === undefined) {
      high = mid - 1; // Go left if the series is still descending
    }
  }

  /*
   * Perform ascending binary search on the left sub-array and perform
   * descending binary search on the right sub-array
   */
  if (!found) {
    return 'Invalid input: array is not bitonic!';
  }

  const leftSearch = binarySearch(array.slice(0, found), key);
  if (leftSearch >= 0) { return leftSearch; }
  const rightSearch = binarySearch(array.slice(found + 1), key);
  if (rightSearch >= 0) { return rightSearch; }
  return -1;
};

console.log(bitonicArraySearch([1, 2, 3, 4, 5, 8, 10, 0], 1)); // 0
console.log(bitonicArraySearch([9, 14, 3, 0, -2], 5)); // -1
console.log(bitonicArraySearch([9, 10, 15, 18, 2], 18)); // 3