// /src/algorithms/linearSearch.js

// --- 1. ALGORITHM LOGIC (Function you provided) ---
export function linearSearch(arr, target) {
    const steps = [];
    const a = [...arr]; // Use a for steps
    let foundIndex = -1;
  
    for (let i = 0; i < a.length; i++) {
      // 1. Step showing current comparison (line 3)
      steps.push({
        bars: [...a],
        comparing: [i], // Checking
        found: foundIndex !== -1 ? [foundIndex] : [], 
        line: 3
      });
  
      if (a[i] === target) {
        foundIndex = i;
        // 2. Step showing element found (line 4)
        steps.push({
          bars: [...a],
          comparing: [],
          found: [i], // Found
          line: 4
        });
        break;
      }
    }
  
    // 3. Final step (line 7: return i or -1)
    steps.push({
      bars: [...a],
      comparing: [],
      found: foundIndex !== -1 ? [foundIndex] : [],
      line: foundIndex !== -1 ? 4 : 7, // If found, highlight line 4 (return i), else highlight line 7 (return -1)
    });
  
    return steps;
  }
  
  // --- 2. CODE STRING EXPORT (The missing piece that caused the error) ---
  export const linearSearchCode = `
  function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) { // 3
      if (arr[i] === target) { // 4
        return i; // found
      }
    }
    return -1; // not found // 7
  }
  `;