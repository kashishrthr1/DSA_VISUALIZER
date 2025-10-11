
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
    <div className="bg-white mb-16"> {/* 👈 added mb-16 for space */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* <Card title="Selection Sorting" dark /> */}
        {sortingAlgos.map((algo, idx) => (
          <Card key={idx} title={algo} dark/>
        ))}
      </div>
    </div>
  );
}
