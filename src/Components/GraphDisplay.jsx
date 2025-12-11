// src/components/GraphDisplay.jsx

import React from "react";

const CONTAINER_WIDTH = 950;
const CONTAINER_HEIGHT = 450;
const PADDING = 40;
const NODE_RADIUS = 15;

export default function GraphDisplay({ graphState, selectedAlgorithm }) {
  const nodes = graphState.nodes || [];
  const edges = graphState.edges || [];

  // --- Dynamic Scaling and Positioning ---
  const allX = nodes
    .map((n) => n.x)
    .filter((x) => x !== undefined && !isNaN(x));
  const allY = nodes
    .map((n) => n.y)
    .filter((y) => y !== undefined && !isNaN(y));

  // FIX: Provide robust defaults to prevent NaN in min/max and scale calculations
  const minX = allX.length > 0 ? Math.min(...allX) : 0;
  const maxX = allX.length > 0 ? Math.max(...allX) : CONTAINER_WIDTH;
  const minY = allY.length > 0 ? Math.min(...allY) : 0;
  const maxY = allY.length > 0 ? Math.max(...allY) : CONTAINER_HEIGHT;

  const dataWidth = maxX - minX;
  const dataHeight = maxY - minY;

  // FIX: Prevent division by zero if all nodes are at the same spot (dataWidth/Height will be 0)
  const scaleX =
    (CONTAINER_WIDTH - PADDING * 2) / (dataWidth > 0 ? dataWidth : 1);
  const scaleY =
    (CONTAINER_HEIGHT - PADDING * 2) / (dataHeight > 0 ? dataHeight : 1);
  const scale = Math.min(scaleX, scaleY, 1);

  const nodeMap = new Map(nodes.map((n) => [String(n.id), n]));

  const getNodePos = (nodeId) => {
    const node = nodeMap.get(String(nodeId));
    // Also check for potential NaN in stored coordinates
    if (
      !node ||
      node.x === undefined ||
      node.y === undefined ||
      isNaN(node.x) ||
      isNaN(node.y)
    )
      return null;

    // Apply Scaling and Centering offset
    const scaledX = (node.x - minX) * scale + PADDING;
    const scaledY = (node.y - minY) * scale + PADDING;

    return {
      x: scaledX,
      y: scaledY,
      status: node.status || "unprocessed",
      value: node.value,
    };
  };

  // --- Styling Functions (Simplified for reliability) ---

  const isWeighted = ["Dijkstra's", "Kruskal's", "Prim's"].some((a) =>
    selectedAlgorithm.includes(a)
  );
  const isDirected = selectedAlgorithm.includes("Dijkstra's");

  const getEdgeColor = (status) => {
    switch (status) {
      case "current":
        return "#FF6B6B";
      case "processed":
      case "mst":
      case "shortestPath":
        return "#0070F3";
      case "visiting":
        return "#ffb86b";
      case "rejected":
        return "#C23616";
      default:
        return "gray";
    }
  };

  const getNodeFillColor = (status) => {
    switch (status) {
      case "visited":
      case "final":
        return "#22C55E";
      case "visiting":
      case "current":
        return "#ffb86b";
      case "start":
        return "#FF00FF";
      default:
        return "white";
    }
  };

  // --- Render Component ---

  return (
    <div className="w-full h-full border border-black rounded-xl p-4 bg-gray-100 shadow flex flex-col">
      <h3 className="text-xl font-bold mb-2 text-gray-800">
        {selectedAlgorithm}
      </h3>
      <div
        className="flex-grow relative border border-dashed border-gray-400 rounded-lg overflow-hidden"
        style={{
          height: CONTAINER_HEIGHT + "px",
          width: CONTAINER_WIDTH + "px",
        }}
      >
        {nodes.length > 0 ? (
          <svg width="100%" height="100%">
            {/* Define Arrow Marker for Directed Edges */}
            {isDirected && (
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX={NODE_RADIUS + 5}
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#4A4A4A" />
                </marker>
              </defs>
            )}

            {/* Render Edges first */}
            {edges.map((edge, index) => {
              const p1 = getNodePos(edge.from);
              const p2 = getNodePos(edge.to);

              // Check if coordinates are valid before drawing the line
              if (!p1 || !p2) return null;

              const strokeColor = getEdgeColor(edge.status);
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;

              return (
                // FIX: Use the stable edge.id for the key
                <React.Fragment key={edge.id || index}>
                  <line
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={strokeColor}
                    strokeWidth={
                      edge.status === "mst" || edge.status === "shortestPath"
                        ? "3"
                        : "2"
                    }
                    markerEnd={isDirected ? "url(#arrow)" : ""}
                    strokeDasharray={
                      edge.status === "rejected" ? "5, 5" : "none"
                    }
                  />

                  {/* Render Weight Label */}
                  {isWeighted && edge.weight !== undefined && (
                    <text
                      x={midX}
                      y={midY - 5}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#4A4A4A"
                      style={{
                        filter:
                          "drop-shadow(0 0 1px white) drop-shadow(0 0 1px white)",
                      }}
                    >
                      {edge.weight}
                    </text>
                  )}
                </React.Fragment>
              );
            })}

            {/* Render Nodes (on top of edges) */}
            {nodes.map((node) => {
              const pos = getNodePos(node.id);
              if (!pos) return null;

              // FIX: Use the stable node.id for the key
              return (
                <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`}>
                  <circle
                    r={NODE_RADIUS}
                    fill={getNodeFillColor(node.status)}
                    stroke="black"
                    strokeWidth="2"
                  />
                  {/* Node Value Label */}
                  <text
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="12"
                    fill="black"
                  >
                    {node.value}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <p>
              Enter node values (e.g., 1, 2, 3) and optionally edges (e.g., 1-2,
              2-3:5) and click Generate/Play to start the visualization.{" "}
            </p>
          </div>
        )}
      </div>
      <p className="text-sm mt-2 text-gray-600">
        Nodes: {nodes.length}, Edges: {edges.length}. (Visualization is scaled
        to fit the container.)
      </p>
    </div>
  );
}
