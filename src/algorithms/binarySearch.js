
       export function binarySearch(arr, target) {
  let steps = [];
  let sorted = [...arr].sort((a, b) => a - b);
  let low = 0, high = sorted.length - 1;
  let foundIndex = -1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    // Step showing mid comparison
    steps.push({
      bars: [...sorted],
      comparing: [mid],
      swapping: [],
      found: [],
    });

    if (sorted[mid] === target) {
      foundIndex = mid;
      // Step showing found
      steps.push({
        bars: [...sorted],
        comparing: [],
        swapping: [],
        found: [mid],
      });
      break;
    } else if (sorted[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  // Final step
  steps.push({
    bars: [...sorted],
    comparing: [],
    swapping: [],
    found: foundIndex !== -1 ? [foundIndex] : [],
  });

  return steps;
}

export const binarySearchCode = `
// Binary Search
function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
`;
