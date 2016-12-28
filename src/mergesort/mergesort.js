/*
 * Top-down mergesort implementation
 * (includes testing if two sub-arrays are already in order)
 */

const fs = require('fs');

const merge = (arr, low, mid, high) => {
  // Copy arr[low..high] into auxiliary array, aux[low..high]
  let aux = [];
  for (let k = low; k <= high; k++) {
    aux[k] = arr[k];
  }

  let i = low;
  let j = mid + 1;

  // Merge the two sub-arrays of the auxiliary array back into the main array
  for (let k = low; k <= high; k++) {
    if (i > mid) {
      // Left half is exhausted, take from right sub-array and increment j
      arr[k] = aux[j++];
    } else if (j > high) {
      // Right half is exhausted, take from left sub-array and increment i
      arr[k] = aux[i++];
    } else if (aux[i] <= aux[j]) {
      // Element on left smaller or equal to element on right, take from left
      arr[k] = aux[i++];
    } else {
      // Element on left greater than element on right, take from right
      arr[k] = aux[j++];
    }
  }
};

const mergesort = (arr, low=0, high=arr.length - 1) => {
  if (low >= high) { // No more elements left to sort
    return;
  }

  let mid = Math.floor((low + high) / 2);
  mergesort(arr, low, mid); // Sort the left half of the array
  mergesort(arr, mid + 1, high); // Sort the right half of the array

  // Before executing a merge, observe if the two arrays are already sorted
  if (arr[mid] < arr[mid + 1]) {
    return;
  }

  merge(arr, low, mid, high); // Merge the results

  return arr;
};

if (!module.parent) {
  fs.readFile('../../input/mergesort/tiny.txt', 'utf-8', (err, data) => {
    let a = [];

    data.split('\n').join('').split(' ').forEach((e) => {
      a.push(e);
    });

    console.log(mergesort(a)); // ['A', 'E', 'E', 'L', 'M', 'N', 'O', ..., 'X']
  });

  fs.readFile('../../input/mergesort/words3.txt', 'utf-8', (err, data) => {
    let b = [];

    data.split('\n').join('').split(' ').forEach((e) => {
      b.push(e);
    });

    console.log(mergesort(b));
  });
}

module.exports = {
  merge: merge,
  mergesort: mergesort,
};
