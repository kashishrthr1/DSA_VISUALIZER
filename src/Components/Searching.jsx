import Card from "./Card";

export default function Searching() {
  const searchingAlgos = [
    "Linear Search",
    "Binary Search",
    "Jump Search",
    "Interpolation Search",
    "Exponential Search",
  ];

  return (
    <div className="bg-white mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {searchingAlgos.map((algo, idx) => (
          <Card key={idx} title={algo} dark />
        ))}
      </div>
    </div>
  );
}
