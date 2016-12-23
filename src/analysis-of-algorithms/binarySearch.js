/*
 * BINARY SEARCH
 *
 * Given a sorted array and a key, find index of the key in the array
 */

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

console.log(binarySearch([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(binarySearch([38, 88, 199, 512, 600], 4)); // -1
