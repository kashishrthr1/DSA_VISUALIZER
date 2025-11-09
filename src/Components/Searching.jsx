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
    <>
      {searchingAlgos.map((algo, idx) => (
        <Card key={idx} title={algo} dark />
      ))}
    </>
  );
}
