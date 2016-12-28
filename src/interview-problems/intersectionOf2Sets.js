/*
 * INTERSECTION OF TWO SETS
 *
 * Given two arrays a[] and b[], each containing n distinct 2D points in the
 * plane, design a sub-quadratic algorithm to count the number of points that
 * are contained both in array a[] and array b[].
 */

const generateRandomPoints = () => {
  // Generate 100 random [x, y] points in an array
  let result = [];

  for (let i = 0; i < 100; i++) {
    // Generate random x and y values from 0 to 19
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 20);
    result.push([x, y]);
  }

  return result;
};

const compare = (pointA, pointB) => {
  /*
   * Compare points A to point B and returns 1 if point A is greater than point
   * B, returns -1 if point B is greater than point A, and 0 if they are equal.
   */
  return pointA[0] > pointB[0] ? 1 :
    pointA[0] < pointB[0] ? -1 :
    pointA[1] > pointB[1] ? 1 :
    pointA[1] < pointB[1] ? - 1 : 0;
};

const shellSort = (arr) => {
  /*
   * Shellsort implementation that sorts on x co-ordinate, then on y-coordinate
   *
   * Generate the increment sequence needed to incrementally h-sort the array
   * by using Knuth's formula: 3x + 1. We want to start at the largest h that
   * is less than our file size, and do decreasing sorts starting from that
   * increment. Knuth's formula will generate the following sequence:
   * 1, 4, 13, 40, 121, 364, ...
   */
  let h = 1;
  while (h < arr.length / 3) {
    h = 3 * h + 1;
  }

  while (h >= 1) {
    // h-sort the array
    for (let i = h; i < arr.length; i++) {
      /*
       * For each h, starting at h, we want to compare every subsequent element
       * to the elements in c*h positions behind it, where c is a some constant
       * that starts at 1 and continues while c*h remains within the bounds of
       * the array. Using the insertion sort implementation, we then swap the
       * element with the element at i - c*h if they are not in the right order
       */
      for (let j = i; j >= h; j -= h) {
        // Use the compare helper function to compare on x-coord and y-coord
        if (compare(arr[j], arr[j - h]) < 0) {
          [arr[j], arr[j - h]] = [arr[j - h], arr[j]];
        }
      }
    }

    // Move to the next increment
    h = Math.floor(h / 3);
  }

  return arr;
};

const countIntersections = (arrA, arrB) => {
  // Sort the two arrays using shellsort
  arrA = shellSort(arrA);
  arrB = shellSort(arrB);

  let i = 0;
  let j = 0;
  let count = 0;

  while (i < arrA.length && j < arrB.length) {
    if (compare(arrA[i], arrB[j]) > 0) {
      // The point in array A is bigger, so increment arrB's index
      j++;
    } else if (compare(arrA[i], arrB[j]) < 0) {
      // The point in array B is larger, so increment arrA's index
      i++;
    } else {
      // The points are equal, so count them, and increment both indices
      count++;
      i++;
      j++;
    }
  }

  return count;
};

let a = generateRandomPoints();
let b = generateRandomPoints();
console.log(countIntersections(a, b));
