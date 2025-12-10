import React, { useRef, useEffect, useState } from "react";

// Attach parent references to every node
function attachParents(node, parent = null) {
  if (!node) return;
  node.parent = parent;
  attachParents(node.left, node);
  attachParents(node.right, node);
}

// --- CORRECTED TREE LAYOUT WITH PARENT INFO ---
const calculateNodePositions = (
  node,
  depth = 0,
  xOffset = 0,
  spacingX = 60,
  spacingY = 80
) => {
  if (!node) {
    return { positions: [], width: 0, height: 0 };
  }

  const left = calculateNodePositions(
    node.left,
    depth + 1,
    xOffset,
    spacingX,
    spacingY
  );

  const right = calculateNodePositions(
    node.right,
    depth + 1,
    xOffset + left.width + spacingX,
    spacingX,
    spacingY
  );

  const x = xOffset + left.width;
  const y = depth * spacingY;

  return {
    positions: [
      ...left.positions,
      ...right.positions,
      { value: node.value, x, y, parent: node.parent?.value },
    ],
    width: left.width + right.width + spacingX,
    height: y,
  };
};

// --- NODE STATUS COLORING ---
const getNodeStatus = (node, treeState) => {
  let colorClass = "bg-gray-700";
  let ringClass = "ring-gray-400";
  let pathClass = "stroke-gray-400";

  if (node.value === treeState.visiting) {
    colorClass = "bg-[#ffb86b]";
    ringClass = "ring-4 ring-[#ffb86b]";
  } else if (treeState.path?.includes(node.value)) {
    colorClass = "bg-[#22C55E]";
    ringClass = "ring-2 ring-[#22C55E]";
    pathClass = "stroke-[#22C55E]";
  } else if (treeState.comparing?.includes(node.value)) {
    colorClass = "bg-[#ff6b6b]";
    ringClass = "ring-4 ring-[#ff6b6b]";
  }

  return { colorClass, ringClass, pathClass };
};

export default function TreeDisplay({ treeState, selectedAlgorithm }) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState({
    positions: [],
    width: 0,
    height: 0,
    offsetX: 0,
  });

  const root = treeState.root;

  useEffect(() => {
    if (!root) {
      setLayout({ positions: [], width: 0, height: 0, offsetX: 0 });
      return;
    }

    // Attach parent references before layout
    attachParents(root);

    const spacingX = 60;
    const spacingY = 80;

    const { positions, width } = calculateNodePositions(
      root,
      0,
      0,
      spacingX,
      spacingY
    );
    const maxY = positions.reduce((max, p) => Math.max(max, p.y), 0);
    const height = maxY + 80;

    const containerWidth = containerRef.current?.offsetWidth || 1000;
    const offsetX = Math.max(0, (containerWidth - width) / 2);

    setLayout({ positions, width, height, offsetX });
  }, [root, selectedAlgorithm]);

  const nodes = layout.positions;

  return (
    <div
      ref={containerRef}
      className="flex-1 min-w-0 flex justify-center items-start h-[450px] p-4 bg-gray-50 rounded-xl shadow-inner relative overflow-auto"
    >
      {root ? (
        <div
          style={{
            position: "relative",
            width: layout.width + layout.offsetX * 2,
            height: layout.height + 20,
            minWidth: "100%",
          }}
        >
          {/* --- SVG LINES --- */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {nodes.map((node) => {
              if (!node.parent) return null;

              const parent = nodes.find((p) => p.value === node.parent);
              if (!parent) return null;

              const startX = parent.x + layout.offsetX + 20;
              const startY = parent.y + 40;
              const endX = node.x + layout.offsetX + 20;
              const endY = node.y;
              const { pathClass } = getNodeStatus(node, treeState);

              return (
                <line
                  key={`${parent.value}-${node.value}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  className={`${pathClass}`}
                  strokeWidth="2"
                  strokeDasharray={
                    selectedAlgorithm === "Segment Tree Build" ? "4 4" : "none"
                  }
                />
              );
            })}
          </svg>

          {/* --- NODES --- */}
          {nodes.map((node) => {
            const { colorClass, ringClass } = getNodeStatus(node, treeState);
            const isRoot = node.value === root.value;

            return (
              <div
                key={node.value}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-mono shadow-md absolute transition-all duration-300 ease-out ${colorClass} ${ringClass} ${
                  isRoot ? "ring-2 ring-blue-500" : "ring-1"
                }`}
                style={{
                  left: node.x + layout.offsetX,
                  top: node.y,
                  transform: "translate(-50%, 0)",
                }}
              >
                {node.value}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 mt-20">
          Select a tree algorithm and press Generate to visualize.
        </p>
      )}
    </div>
  );
}
