export function insertionSort(arr) {
    const steps = [];
    const a = [...arr];
  
    for (let i = 1; i < a.length; i++) {
      let key = a[i];
      let j = i - 1;
  
      // compare backwards
      while (j >= 0) {
        steps.push({
          bars: [...a],
          comparing: [j, j + 1],
          swapping: []
        });
  
        if (a[j] > key) {
          a[j + 1] = a[j];
          steps.push({
            bars: [...a],
            comparing: [],
            swapping: [j, j + 1]
          });
          j--;
        } else {
          break;
        }
      }
  
      a[j + 1] = key;
      steps.push({
        bars: [...a],
        comparing: [],
        swapping: [j + 1, i]
      });
    }
  
    return steps;
  }
  