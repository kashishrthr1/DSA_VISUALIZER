export function insertionSort(arr) {
  const steps = [];
  const a = [...arr];

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    while (j >= 0 && a[j] > key) {
      steps.push({
        bars: [...a],
        comparing: [j, j + 1],
        swapping: [],
        line: 6
      });

      a[j + 1] = a[j];
      steps.push({
        bars: [...a],
        comparing: [],
        swapping: [j, j + 1],
        line: 7
      });
      j--;
    }

    a[j + 1] = key;
    steps.push({
      bars: [...a],
      comparing: [],
      swapping: [],
      line: 10
    });
  }

  return steps;
}

export const insertionSortCode = `
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}
`;
