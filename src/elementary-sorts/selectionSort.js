const selectionSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;

    for (let j = i + 1; j < arr.length; j++) {
      // Find the minimum value in the unsorted sub-array
      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    // Swap minimum element with the i'th element to maintain sorted sub-array
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }

  return arr;
};

console.log(selectionSort([0, -5, 23, -2, 19, 3, 7]));
// [-5, -2, 0, 3, 7, 19, 23]
console.log(selectionSort(['d', 'aa', 'ba', 'ab', 'da', 'a']));
// ['a', 'aa', 'ab', 'ba', 'd', 'da']
