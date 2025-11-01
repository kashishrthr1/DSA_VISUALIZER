export function heapSort(arr) {
    const steps = [];
    const a = [...arr];
  
    function heapify(n, i) {
      let largest = i;
      let l = 2 * i + 1;
      let r = 2 * i + 2;
  
      if (l < n) steps.push({ bars: [...a], comparing: [i, l], swapping: [], line: 6 });
      if (l < n && a[l] > a[largest]) largest = l;
  
      if (r < n) steps.push({ bars: [...a], comparing: [i, r], swapping: [], line: 9 });
      if (r < n && a[r] > a[largest]) largest = r;
  
      if (largest !== i) {
        [a[i], a[largest]] = [a[largest], a[i]];
        steps.push({ bars: [...a], comparing: [], swapping: [i, largest], line: 12 });
        heapify(n, largest);
      }
    }
  
    let n = a.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
    for (let i = n - 1; i > 0; i--) {
      [a[0], a[i]] = [a[i], a[0]];
      steps.push({ bars: [...a], comparing: [], swapping: [0, i], line: 18 });
      heapify(i, 0);
    }
  
    return steps;
  }
  
  export const heapSortCode = `
  function heapSort(arr) {
    let n = arr.length;
  
    function heapify(n, i) {
      let largest = i;
      let l = 2 * i + 1;
      let r = 2 * i + 2;
      if (l < n && arr[l] > arr[largest]) largest = l;
      if (r < n && arr[r] > arr[largest]) largest = r;
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(n, largest);
      }
    }
  
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      heapify(i, 0);
    }
  }
  `;
  