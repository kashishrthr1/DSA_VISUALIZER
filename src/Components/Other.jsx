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
    <>
      {otherAlgos.map((algo, idx) => (
        <Card key={idx} title={algo} dark />
      ))}
    </>
  );
}
