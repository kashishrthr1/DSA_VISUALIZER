export default function generateArray(size, max = 100){
    return Array.from({ length: size }, () =>
      Math.floor(Math.random() * max) + 1
    );
  }