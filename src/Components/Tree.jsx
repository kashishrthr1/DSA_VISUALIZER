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
    <>
      {treeAlgos.map((algo, idx) => (
        <Card key={idx} title={algo} dark />
      ))}
    </>
  );
}
