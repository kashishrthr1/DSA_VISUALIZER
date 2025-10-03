export function selectionSort(arr) {
    const steps = [];
    const a = [...arr];
  
    for (let i = 0; i < a.length; i++) {
      let minIndex = i;
      for (let j = i + 1; j < a.length; j++) {
        steps.push({
          bars: [...a],
          comparing: [minIndex, j],
          swapping: []
        });
  
        if (a[j] < a[minIndex]) {
          minIndex = j;
        }
      }
  
      if (minIndex !== i) {
        [a[i], a[minIndex]] = [a[minIndex], a[i]];
        steps.push({
          bars: [...a],
          comparing: [],
          swapping: [i, minIndex]
        });
      }
    }
  
    return steps;
  }
  