export function bubbleSort(arr) {
    const steps = [];
    const a = [...arr];
  
    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        steps.push({
          bars: [...a],
          comparing: [j, j + 1],
          swapping: []
        });
  
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          steps.push({
            bars: [...a],
            comparing: [],
            swapping: [j, j + 1]
          });
        }
      }
    }
  
    return steps;
  }
  