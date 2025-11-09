import Card from "./Card";

export default function Graph() {
  const graphAlgos = [
    "Depth First Search (DFS)",
    "Breadth First Search (BFS)",
    "Dijkstra’s Algorithm",
    "Kruskal’s Algorithm",
    "Prim’s Algorithm",
  ];

  return (
    <div className="bg-white mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {graphAlgos.map((algo, idx) => (
          <Card key={idx} title={algo} dark />
        ))}
      </div>
    </div>
  );
}
