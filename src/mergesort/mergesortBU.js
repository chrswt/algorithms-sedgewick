/*
 * Bottom-up mergesort
 */

const fs = require('fs');
const merge = require('./mergesort').merge;

const mergesortBU = (arr) => {
  let N = arr.length;

  for (let size = 1; size < N; size += size) {
    // Only log N number of passes because we are doubling size each time
    for (let low = 0; low < N - size; low += 2*size) {
      // low = 0, 2, 4, 6, ...; low = 0, 4, 8, 12...

      /*
       * Merge 2 n-sized arrays together. For example, if size = 2, merge
       * is called on low = 0, mid = 1, high = 3,
       * then called on low = 4, mid = 5, high = 7, until the limit N-1.
       */
      merge(arr, low, low + size-1, Math.min(low + 2*size - 1, N-1));
    }
  }

  return arr;
};

fs.readFile('../../input/mergesort/tiny.txt', 'utf-8', (err, data) => {
  let a = [];

  data.split('\n').join('').split(' ').forEach((e) => {
    a.push(e);
  });

  console.log(mergesortBU(a)); // ['A', 'E', 'E', 'L', 'M', 'N', 'O', ..., 'X']
});

fs.readFile('../../input/mergesort/words3.txt', 'utf-8', (err, data) => {
  let b = [];

  data.split('\n').join('').split(' ').forEach((e) => {
    b.push(e);
  });

  console.log(mergesortBU(b));
});
