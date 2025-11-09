import Card from "./Card";

export default function DynamicProgramming() {
  const dpAlgos = [
    "Fibonacci (DP)",
    "0/1 Knapsack Problem",
    "Longest Common Subsequence",
    "Matrix Chain Multiplication",
    "Coin Change Problem",
  ];

  return (
    <div className="bg-white mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dpAlgos.map((algo, idx) => (
          <Card key={idx} title={algo} dark />
        ))}
      </div>
    </div>
  );
}
