/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const mergeSort = (nums) => {
  if(nums.length <= 1) return nums

  const middleIndex = Math.floor(nums.length / 2)

  let first = mergeSort(nums.slice(0, middleIndex));
  let second = mergeSort(nums.slice(middleIndex));

  let acc = []
  while(first.length && second.length) {
    if(first[0] <= second[0]) {
      acc.push(first.shift())
    } else {
      acc.push(second.shift())
    }
  }
  
  return acc.concat(first, second)
};

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
