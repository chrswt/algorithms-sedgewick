const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        // If the element on the left is greater, swap the pair
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
  }

  return arr;
};

console.log(insertionSort([0, -5, 23, -2, 19, 3, 7]));
// [-5, -2, 0, 3, 7, 19, 23]
console.log(insertionSort(['d', 'aa', 'ba', 'ab', 'da', 'a']));
// ['a', 'aa', 'ab', 'ba', 'd', 'da']
