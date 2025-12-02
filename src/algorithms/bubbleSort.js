// FIX 1: Removed leading \n so "function bubbleSort" is Line 1, fixing the highlight offset.
export const bubbleSortCode = `function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) { // Line 2
    for (let j = 0; j < arr.length - i - 1; j++) { // Line 3
      if (arr[j] > arr[j + 1]) { // Line 4: Comparison line
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Line 5: Swap line
      }
    }
  }
}`;

export function bubbleSort(arr) {
  const steps = [];
  const a = [...arr];

  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      
      // FIX 2: Pushing line 4 for the comparison step
      steps.push({
        bars: [...a],
        comparing: [j, j + 1],
        swapping: [],
        line: 4, 
      });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        
        // FIX 3: Pushing line 5 for the swap step
        steps.push({
          bars: [...a],
          comparing: [],
          swapping: [j, j + 1],
          line: 5,
        });
      }
    }
  }
  // Final state
  steps.push({ bars: [...a], comparing: [], swapping: [], sorted: true, line: 0 }); 
  return steps;
}