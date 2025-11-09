import Card from "./Card";

export default function Tree() {
  const treeAlgos = [
    "Binary Tree Traversal",
    "Binary Search Tree",
    "AVL Tree",
    "Segment Tree",
    "Trie",
  ];

  return (
    <div className="bg-white mb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {treeAlgos.map((algo, idx) => (
          <Card key={idx} title={algo} dark />
        ))}
      </div>
    </div>
  );
}
