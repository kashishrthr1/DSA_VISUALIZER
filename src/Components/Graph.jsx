import Card from "./Card";

export default function Graph() {
  const graphAlgos = [
    "Depth First Search",
    "Breadth First Search",
    "Dijkstra’s Algorithm",
    "Kruskal’s Algorithm",
    "Prim’s Algorithm",
  ];

  return (
    <>
      {graphAlgos.map((algo, idx) => (
        <Card key={idx} title={algo} dark />
      ))}
    </>
  );
}
