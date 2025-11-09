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
    <>
      {dpAlgos.map((algo, idx) => (
        <Card key={idx} title={algo} dark />
      ))}
    </>
  );
}
