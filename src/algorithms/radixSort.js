export function radixSort(arr) {
    const steps = [];
    const a = [...arr];
  
    const getMax = () => Math.max(...a);
  
    function countingSort(exp) {
      const output = Array(a.length).fill(0);
      const count = Array(10).fill(0);
  
      for (let i = 0; i < a.length; i++) {
        const idx = Math.floor(a[i] / exp) % 10;
        count[idx]++;
        steps.push({ bars: [...a], comparing: [i], swapping: [], line: 7 });
      }
  
      for (let i = 1; i < 10; i++) count[i] += count[i - 1];
  
      for (let i = a.length - 1; i >= 0; i--) {
        const idx = Math.floor(a[i] / exp) % 10;
        output[count[idx] - 1] = a[i];
        count[idx]--;
      }
  
      for (let i = 0; i < a.length; i++) {
        a[i] = output[i];
        steps.push({ bars: [...a], comparing: [], swapping: [i], line: 20 });
      }
    }
  
    for (let exp = 1; Math.floor(getMax() / exp) > 0; exp *= 10) {
      countingSort(exp);
    }
  
    return steps;
  }
  
  export const radixSortCode = `
  function radixSort(arr) {
    const getMax = () => Math.max(...arr);
    function countingSort(exp) {
      const output = Array(arr.length).fill(0);
      const count = Array(10).fill(0);
      for (let i = 0; i < arr.length; i++) count[Math.floor(arr[i] / exp) % 10]++;
      for (let i = 1; i < 10; i++) count[i] += count[i - 1];
      for (let i = arr.length - 1; i >= 0; i--) {
        const idx = Math.floor(arr[i] / exp) % 10;
        output[count[idx] - 1] = arr[i];
        count[idx]--;
      }
      for (let i = 0; i < arr.length; i++) arr[i] = output[i];
    }
    for (let exp = 1; Math.floor(getMax() / exp) > 0; exp *= 10) countingSort(exp);
  }
  `;
  