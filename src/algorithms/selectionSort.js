export function selectionSort(arr) {
  const steps = [];
  const a = [...arr];

  for (let i = 0; i < a.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < a.length; j++) {
      steps.push({
        bars: [...a],
        comparing: [minIndex, j],
        swapping: [],
        line: 6
      });

      if (a[j] < a[minIndex]) {
        minIndex = j;
        steps.push({
          bars: [...a],
          comparing: [minIndex, j],
          swapping: [],
          line: 7
        });
      }
    }

    if (minIndex !== i) {
      [a[i], a[minIndex]] = [a[minIndex], a[i]];
      steps.push({
        bars: [...a],
        comparing: [],
        swapping: [i, minIndex],
        line: 11
      });
    }
  }

  return steps;
}

export const selectionSortCode = `
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
}
`;
