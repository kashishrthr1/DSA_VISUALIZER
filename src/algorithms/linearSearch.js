export function linearSearch(arr, target) {
  let steps = [];
  let foundIndex = -1;

  for (let i = 0; i < arr.length; i++) {
    // Step showing current comparison
    steps.push({
      bars: [...arr],
      comparing: [i],
      swapping: [],
      found: [],
    });

    if (arr[i] === target) {
      foundIndex = i;
      // Step showing element found
      steps.push({
        bars: [...arr],
        comparing: [],
        swapping: [],
        found: [i],
      });
      break;
    }
  }

  // Final step (all done)
  steps.push({
    bars: [...arr],
    comparing: [],
    swapping: [],
    found: foundIndex !== -1 ? [foundIndex] : [],
  });

  return steps;
}

export const linearSearchCode = `
// Linear Search
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // found
    }
  }
  return -1; // not found
}
`;
