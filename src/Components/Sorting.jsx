import Card from "./Card";

export default function Sorting() {
  const sortingAlgos = [
    "Selection Sort",
    "Bubble Sort",
    "Insertion Sort",
    "Merge Sort",
    "Quick Sort",
    "Heap Sort",
    "Radix Sort",
  ];

  return (
    <>
      {sortingAlgos.map((algo, idx) => (
        <Card key={idx} title={algo} dark />
      ))}
    </>
  );
}
