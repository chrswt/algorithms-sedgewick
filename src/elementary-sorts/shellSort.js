const shellSort = (arr) => {
  /*
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
        if (arr[j] < arr[j - h]) {
          [arr[j], arr[j - h]] = [arr[j - h], arr[j]];
        }
      }
    }

    // Move to the next increment
    h = Math.floor(h / 3);
  }

  return arr;
};

if (!module.parent) {
  console.log(shellSort([0, -5, 23, -2, 19, 3, 7]));
// [-5, -2, 0, 3, 7, 19, 23]
  console.log(shellSort(['d', 'aa', 'ba', 'ab', 'da', 'a']));
// ['a', 'aa', 'ab', 'ba', 'd', 'da']
}

module.exports = {
  shellSort: shellSort,
};
