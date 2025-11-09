import Card from "./Card";

export default function Other() {
  const otherAlgos = [
    "Backtracking (N-Queens)",
    "Greedy Algorithms",
    "Divide and Conquer",
    "Bit Manipulation",
    "Hashing",
  ];

  return (
    <div className="bg-white mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {otherAlgos.map((algo, idx) => (
          <Card key={idx} title={algo} dark />
        ))}
      </div>
    </div>
  );
}
