export function quickSort(arr) {
    const steps = [];
    const a = [...arr];
  
    function partition(low, high) {
      let pivot = a[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        steps.push({
          bars: [...a],
          comparing: [j, high],
          swapping: [],
          line: 6
        });
        if (a[j] < pivot) {
          i++;
          [a[i], a[j]] = [a[j], a[i]];
          steps.push({
            bars: [...a],
            comparing: [],
            swapping: [i, j],
            line: 8
          });
        }
      }
      [a[i + 1], a[high]] = [a[high], a[i + 1]];
      steps.push({
        bars: [...a],
        comparing: [],
        swapping: [i + 1, high],
        line: 12
      });
      return i + 1;
    }
  
    function sort(low, high) {
      if (low < high) {
        const pi = partition(low, high);
        sort(low, pi - 1);
        sort(pi + 1, high);
      }
    }
  
    sort(0, a.length - 1);
    return steps;
  }
  
  export const quickSortCode = `
  function quickSort(arr, low, high) {
    if (low < high) {
      let pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }
  
  function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }
  `;
  