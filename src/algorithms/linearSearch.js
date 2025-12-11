// /src/algorithms/linearSearch.js

// --- 1. ALGORITHM LOGIC (Function you provided) ---
export function linearSearch(arr, target) {
  const steps = [];
  const a = [...arr];
  let foundIndex = -1;

  for (let i = 0; i < a.length; i++) {
    // Step: comparing current index (line 3)
    steps.push({
      bars: [...a],
      comparing: [i],
      found: foundIndex !== -1 ? [foundIndex] : [],
      line: 3
    });

    if (a[i] === target) {
      foundIndex = i;

      // Step: found (line 4)
      steps.push({
        bars: [...a],
        comparing: [],
        found: [i],
        line: 4
      });

      break;
    }
  }

  // Final step (line 4 or line 7)
  steps.push({
    bars: [...a],
    comparing: [],
    found: foundIndex !== -1 ? [foundIndex] : [],
    line: foundIndex !== -1 ? 4 : 7
  });

  return steps;
}

export const linearSearchCode = `
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) { // 3
    if (arr[i] === target) { // 4
      return i; // found
    }
  }
  return -1; // 7
}
`;
