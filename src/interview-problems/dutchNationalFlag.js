/*
 * DUTCH NATIONAL FLAG
 *
 * Given an array of n buckets, each containing a red, white, or blue pebble,
 * sort them by color. The allowed operations are:
 *   - swap(i, j): swap the pebble in bucket i with the pebble in bucket j
 *   - color(i): color of pebble in bucket i
 *
 * The performance requirements are as follows:
 *   - At most n calls to color()
 *   - At most n calls to swap()
 *   - Constant extra space
 */

/*
 * For ease of modeling, we model each bucket as an index in the array, and
 * each pebble as the element in that index. This also allows for the resulting
 * sorted array to be easily human-readable and verifiable. Swapping thus
 * involves swapping two elements of an array at different indices.
 *
 * Create an object representation of colors and a numerical representation of
 * each to allow constant time access to an ordinal comparison of different
 * colors, e.g. red < white < blue.
 */
const colors = {
  'red': 0,
  'white': 1,
  'blue': 2,
};

// Generate an array of n buckets, each represented by a color
const generateBuckets = (n) => {
  let result = [];

  for (let i = 0; i < n; i++) {
    let colors = ['red', 'white', 'blue'];
    result.push(colors[Math.floor(Math.random() * 3)]);
  }

  return result;
};

// Peek at the color of pebble in bucket i, returns a numerical representation
const color = (i) => {
  return colors[i];
};

// Swap the pebble in bucket i with the pebble in bucket j
const swap = (i, j) => {
  return [j, i];
};

const dutchNationalFlag = (arr) => {
  let low = 0;
  let reader = 0;
  let high = arr.length - 1;

  /*
   * The algorithm involves keeping three pointers that divide the array into
   * four parts: the red area, the white area, an unknown area, and the blue
   * area. Red, white, and blue areas expand while iterating through the array,
   * while the unknown (unsorted) area shrinks.
   *
   * 1) If element @ reader index === 0, swap with low index, low++, reader++
   * 2) If element @ reader index === 1, reader++
   * 3) If element @ reader index === 2, swap with high index, high--
   * 4) When reader crosses high, we can terminate because it is already sorted
   *
   * This ensures 3 sorted areas that grow, while ensuring that we only have to
   * make one pass through the array, calling colors and swap a maximum of n
   * times each.
   */
  while (reader <= high) {
    if (color(arr[reader]) === 0) {
      [arr[reader], arr[low]] = swap(arr[reader], arr[low]);
      low++;
      reader++;
    } else if (color(arr[reader]) === 1) {
      reader++;
    } else if (color(arr[reader]) === 2) {
      [arr[reader], arr[high]] = swap(arr[reader], arr[high]);
      high--;
    }
  }

  return arr;
};

let a = generateBuckets(20);
console.log(dutchNationalFlag(a));
