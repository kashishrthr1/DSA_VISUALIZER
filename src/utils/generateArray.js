export default function generateArray(n) {
  const size = Number(n) || 10;
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100) + 1);
  }
  return arr;
}
