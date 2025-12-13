import React from "react";

export default function ColorLegend({ selectedAlgorithm, selectedType }) {
  const sortItems = [
    { color: "bg-[#ffb86b]", label: "Comparing" },
    { color: "bg-[#22C55E]", label: "Sorted" },
    { color: "bg-[#ff6b6b]", label: "Swapping" },
  ];

  const linearItems = [
    { color: "bg-[#ffb86b]", label: "Checking" },
    { color: "bg-[#22C55E]", label: "Found" },
    { color: "bg-[#ff6b6b]", label: "Not Found" },
  ];

  const binaryItems = [
    { color: "bg-[#ffb86b]", label: "Start Pointer" },
    { color: "bg-[#FFF56B]", label: "End Pointer" },
    { color: "bg-[#6B8EFF]", label: "Mid Pointer" },
    { color: "bg-[#22C55E]", label: "Found" },
    { color: "bg-[#FF6B6B]", label: "Not Found" },
  ];

  const treeItems = [
    { color: "bg-[#ffb86b]", label: "Visiting Node" },
    { color: "bg-[#22C55E]", label: "Processed" },
    { color: "bg-[#ff6b6b]", label: "Not Found" },
    { color: "bg-gray-700", label: "Unvisited" },
  ];

  // --- NEW GRAPH LEGENDS ---

  // For BFS/DFS Traversal
  const traversalItems = [
    { color: "bg-[#ffb86b]", label: "Visiting " },
    { color: "bg-[#22C55E]", label: "Visited/Processed" },
    { color: "bg-[#FF6B6B]", label: "Current Edge" },
    { color: "bg-white", label: "Unvisited" },
  ];

  // For Dijkstra/Kruskal/Prim's (MST/Shortest Path)
  const mstSptItems = [
    { color: "bg-[#ffb86b]", label: "Current Node/Edge (Min)" },
    { color: "bg-[#6B8EFF]", label: "Shortest Path Found" },
    { color: "bg-[#22C55E]", label: "Part of MST/Final Path" },
    { color: "bg-white", label: "Unprocessed" },
  ];
  // -------------------------

  const renderList = (items) => (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-3">
          <span
            className={`w-4 h-4 rounded-sm border border-black ${item.color}`}
          ></span>
          <span className="text-sm font-['IBM_Plex_Mono'] text-black">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );

  const isTraversal = ["Breadth First Search", "Depth First Search"].includes(
    selectedAlgorithm
  );

  return (
    <div className="w-full border border-black rounded-xl p-4 bg-white shadow">
      <h3 className="text-lg font-semibold mb-4 font-['IBM_Plex_Mono']">
        Color Legend
      </h3>

      {selectedType === "Sorting" && renderList(sortItems)}

      {selectedType === "Searching" &&
        selectedAlgorithm === "Linear Search" &&
        renderList(linearItems)}

      {selectedType === "Searching" &&
        selectedAlgorithm === "Binary Search" &&
        renderList(binaryItems)}

      {selectedType === "Tree" && renderList(treeItems)}

      {/* --- NEW GRAPH RENDERING --- */}
      {selectedType === "Graph" &&
        (isTraversal ? renderList(traversalItems) : renderList(mstSptItems))}
      {/* --------------------------- */}
    </div>
  );
}
