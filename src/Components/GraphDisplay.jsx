// src/components/GraphDisplay.jsx

import React from "react";

// Maintain fixed dimensions for consistent SVG scaling (Tailwind max-width will now apply to the content)
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

  // --- Styling Functions (Adapted for light theme) ---

  const isWeighted = ["Dijkstra's", "Kruskal's", "Prim's"].some((a) =>
    selectedAlgorithm.includes(a)
  );
  const isDirected = selectedAlgorithm.includes("Dijkstra's");

  const getEdgeColor = (status) => {
    switch (status) {
      case "current":
        return "#FF6B6B"; // Red/Pink (Attention)
      case "processed":
      case "mst":
      case "shortestPath":
        return "#0070F3"; // Bright Blue (Finalized/Path)
      case "visiting":
        return "#ffb86b"; // Orange (Exploring)
      case "rejected":
        return "#C23616"; // Dark Red (Rejected/Strikethrough effect)
      default:
        return "#4B5563"; // Dark Gray (Default/Unprocessed)
    }
  };

  const getNodeFillColor = (status) => {
    switch (status) {
      case "visited":
      case "final":
        return "#22C55E"; // Green (Found/Finalized)
      case "visiting":
      case "current":
        return "#FFD700"; // Gold/Yellow (Current step/Exploring)
      case "start":
        return "#FF00FF"; // Magenta (Start Node)
      default:
        return "white"; // White (Default/Unprocessed)
    }
  };

  const getNodeStrokeColor = (status) => {
    switch (status) {
      case "visited":
      case "final":
      case "visiting":
      case "current":
      case "start":
        return "black"; // Black stroke for active nodes
      default:
        return "#4B5563"; // Darker stroke for inactive nodes
    }
  };

  // --- Render Component ---

  return (
    // **Color Change:** Light Theme Container (white background, subtle border/shadow)
    <div className="w-full bg-white backdrop-blur-xl rounded-3xl border border-gray-200 shadow-lg p-6 flex flex-col h-full">
      <h3 className="text-xl font-bold mb-3 text-gray-800">
        {selectedAlgorithm} Visualization
      </h3>

      <div
        // **Color Change:** Light background for the SVG area, border back to dashed gray
        className="relative mx-auto rounded-lg bg-gray-50 border border-dashed border-gray-300"
        style={{
          height: CONTAINER_HEIGHT + "px",
          width: CONTAINER_WIDTH + "px",
          maxWidth: "100%",
          maxHeight: "100%",
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
                  {/* **Color Change:** Arrow Fill (Dark Gray for contrast on light background) */}
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#4A4A4A" />
                </marker>
              </defs>
            )}

            {/* Render Edges first */}
            {edges.map((edge, index) => {
              const p1 = getNodePos(edge.from);
              const p2 = getNodePos(edge.to);

              if (!p1 || !p2) return null;

              const strokeColor = getEdgeColor(edge.status);
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2;

              return (
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
                      fill="#4A4A4A" // **Color Change:** Dark Gray text for contrast
                      style={{
                        // **Color Change:** White background for text shadow to ensure legibility on edges
                        filter:
                          "drop-shadow(0 0 2px white) drop-shadow(0 0 2px white)",
                        fontWeight: "bold",
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

              return (
                <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`}>
                  <circle
                    r={NODE_RADIUS}
                    fill={getNodeFillColor(node.status)}
                    stroke={getNodeStrokeColor(node.status)}
                    strokeWidth="2"
                  />
                  {/* Node Value Label */}
                  <text
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="12"
                    fill="black" // **Color Change:** Black text on light node fills
                  >
                    {node.value}
                  </text>
                </g>
              );
            })}
          </svg>
        ) : (
          // **Color Change:** Placeholder text color to dark gray
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <p className="text-lg font-semibold mb-2">
              Graph Visualization Ready
            </p>
            <p className="max-w-md">
              Enter node values (e.g., 1, 2, 3) and optionally edges (e.g., 1-2,
              2-3:5) in the controller below, then click **Generate** or
              **Play** to start the visualization of **{selectedAlgorithm}**.
            </p>
          </div>
        )}
      </div>

      {/* **Color Change:** Info Bar text color to dark gray */}
      <p className="text-sm mt-4 text-gray-600 text-center">
        **Current State:** Nodes: {nodes.length}, Edges: {edges.length}. (Graph
        is scaled to fit the display area.)
      </p>
    </div>
  );
}
