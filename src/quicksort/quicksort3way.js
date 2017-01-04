const shuffle = require('./quicksort').shuffle;

const quicksort3way = (arr, low=0, high=arr.length-1) => {
  if (low >= high) return;

  let lt = low; // Less than sub-section
  let gt = high; // Greater than sub-section
  let i = low; // Comparison pointer
  let v = arr[low]; // Comparison element, should not change while comparing

  while (i <= gt) {
    if (arr[i] < v) {
      // Element smaller than v -> move into the lt sub-section
      [arr[i], arr[lt]] = [arr[lt], arr[i]];
      i++;
      lt++;
    } else if (arr[i] > v) {
      // Element greater than v -> move into the gt sub-section
      [arr[i], arr[gt]] = [arr[gt], arr[i]];
      gt--;
    } else {
      i++;
    }
  }

  // Sort the less than sub-section
  quicksort3way(arr, low, lt - 1);
  // Sort the greater than sub-section
  quicksort3way(arr, gt + 1, high);

  return arr;
};

console.log(quicksort3way(shuffle([1,2,3,1,2,3,1,2,3])));
console.log(quicksort3way(shuffle([9,3,4,1,4,2,1,2,3,5,4,3,2,1,3,2,8])));
