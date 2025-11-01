export function bubbleSort(arr) {
  const steps = [];
  const a = [...arr];

  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({
        bars: [...a],
        comparing: [j, j + 1],
        swapping: [],
        line: 5
      });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({
          bars: [...a],
          comparing: [],
          swapping: [j, j + 1],
          line: 6
        });
      }
    }
  }

  return steps;
}

export const bubbleSortCode = `
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}
`;
