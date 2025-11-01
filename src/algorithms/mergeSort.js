export function mergeSort(arr) {
    const steps = [];
    const a = [...arr];
  
    function merge(l, m, r) {
      let n1 = m - l + 1;
      let n2 = r - m;
  
      let L = a.slice(l, m + 1);
      let R = a.slice(m + 1, r + 1);
  
      let i = 0, j = 0, k = l;
      while (i < n1 && j < n2) {
        steps.push({ bars: [...a], comparing: [l + i, m + 1 + j], swapping: [], line: 6 });
        if (L[i] <= R[j]) {
          a[k++] = L[i++];
        } else {
          a[k++] = R[j++];
        }
        steps.push({ bars: [...a], comparing: [], swapping: [k - 1], line: 10 });
      }
  
      while (i < n1) {
        a[k++] = L[i++];
        steps.push({ bars: [...a], comparing: [], swapping: [k - 1], line: 15 });
      }
  
      while (j < n2) {
        a[k++] = R[j++];
        steps.push({ bars: [...a], comparing: [], swapping: [k - 1], line: 20 });
      }
    }
  
    function sort(l, r) {
      if (l < r) {
        const m = Math.floor((l + r) / 2);
        sort(l, m);
        sort(m + 1, r);
        merge(l, m, r);
      }
    }
  
    sort(0, a.length - 1);
    return steps;
  }
  
  export const mergeSortCode = `
  function mergeSort(arr, l, r) {
    if (l < r) {
      let m = Math.floor((l + r) / 2);
      mergeSort(arr, l, m);
      mergeSort(arr, m + 1, r);
      merge(arr, l, m, r);
    }
  }
  
  function merge(arr, l, m, r) {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = arr.slice(l, m + 1);
    let R = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) arr[k++] = L[i++];
      else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
  }
  `;
  