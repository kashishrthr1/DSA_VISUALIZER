// /src/algorithms/binarySearch.js

// --- 1. ALGORITHM LOGIC (Function you provided) ---
export function binarySearch(arr, target) {
    const steps = [];
    // IMPORTANT: Binary search requires a sorted array for the visualization
    const sorted = [...arr].sort((a, b) => a - b); 
    let low = 0, high = sorted.length - 1;
    let foundIndex = -1;
  
    // Initial step before the loop starts (showing start and end pointers)
    steps.push({
      bars: [...sorted],
      comparing: [], 
      swapping: [low, high], // Using swapping for [low, high] Pointers (Start/End)
      found: [],
      line: 2, // Highlight initialization line
    });
  
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
  
      // 1. Calculate mid (line 4)
      steps.push({
        bars: [...sorted],
        comparing: [mid], // Mid Pointer
        swapping: [low, high], // Low/High Pointers
        found: [],
        line: 4,
      });
  
      // 2. Check for target (line 5)
      steps.push({
        bars: [...sorted],
        comparing: [mid], 
        swapping: [low, high], 
        found: [],
        line: 5,
      });
  
      if (sorted[mid] === target) {
        foundIndex = mid;
        // Step showing found (line 6)
        steps.push({
          bars: [...sorted],
          comparing: [],
          swapping: [], 
          found: [mid],
          line: 6
        });
        break;
      } else if (sorted[mid] < target) {
        // 3. Move low pointer (line 7, 8)
        low = mid + 1;
        steps.push({
          bars: [...sorted],
          comparing: [mid],
          swapping: [low, high], 
          found: [],
          line: 8,
        });
      } else {
        // 4. Move high pointer (line 9, 10)
        high = mid - 1;
        steps.push({
          bars: [...sorted],
          comparing: [mid],
          swapping: [low, high], 
          found: [],
          line: 10,
        });
      }
    }
  
    // 5. Final step (line 12: return -1)
    steps.push({
      bars: [...sorted],
      comparing: [],
      swapping: [],
      found: foundIndex !== -1 ? [foundIndex] : [],
      line: foundIndex !== -1 ? 6 : 12,
    });
  
    return steps;
  }
  
  // --- 2. CODE STRING EXPORT (The missing piece that caused the error) ---
  export const binarySearchCode = `
  function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (arr[mid] === target) { // 5
          return mid; // 6
      }
      else if (arr[mid] < target) { // 7
          low = mid + 1; // 8
      }
      else { // 9
          high = mid - 1; // 10
      }
    }
    return -1; // 12
  }
  `;