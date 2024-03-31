/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

function getDigit(num, place) {
  const str = String(num)
   return str[str.length - (place + 1)] || 0
}

function getLongestNumber(array) {
  let highest = 0
  for(let num of array) {
    if (highest < num) {
      highest = num
    }
  }
  return highest
}

function getDigitAmount(number) {
  return String(number).length
}

function radixSort(array) {  
  const buckets = {
    '0': [], 
    '1': [], 
    '2': [], 
    '3': [], 
    '4': [], 
    '5': [], 
    '6': [], 
    '7': [], 
    '8': [], 
    '9': []
  }

  let arr = [...array]
  for(let digit = 0; digit <= getDigitAmount(getLongestNumber(array)) - 1; digit++) {
    const newArr = []
    for(let num of arr) {
      const digitValue = getDigit(num, digit)

      buckets[digitValue].push(num)
    }

    Object.keys(buckets).forEach(key => {
      newArr.push(...buckets[key])
      buckets[key] = []
    })

    arr = newArr
  }
  return arr
}



// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should return highest", () => {
    const nums = [1, 6, 10, 4, 500, 2]
    expect(getLongestNumber(nums)).toEqual(500)
  })

  it("should sort correctly", () => {
    const nums = [
      20,
      51,
      3,
      801,
      415,
      62,
      4,
      17,
      19,
      11,
      1,
      100,
      12441,
      104,
      944,
      854,
      34,
      3000,
      3001,
      12001,
      633
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1,
      3,
      4,
      11,
      17,
      19,
      20,
      34,
      51,
      62,
      100,
      104,
      415,
      633,
      801,
      854,
      944,
      3000,
      3001,
      12001,
      12441,
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(ans);
  });
});
