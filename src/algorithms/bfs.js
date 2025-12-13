// src/algorithms/bfs.js

import { generateGraphFromInput } from "../utils/generateGraphFromInput.js";

/**
 * Implements Breadth First Search (BFS) and generates visualization steps.
 * @param {number[]} nodesArray - Array of node values.
 * @param {string} edgesString - String of edges (u-v).
 * @param {number} startNodeValue - The value of the starting node (e.g., 1).
 * @returns {Object[]} An array of visualization steps.
 */
export function bfs(nodesArray, edgesString, startNodeValue) {
    const steps = [];
    
    // Get the structured graph state and the internal map
    const { graphMap } = generateGraphFromInput(nodesArray, edgesString);
    
    // Create mutable copies of nodes and edges for tracking status
    const nodes = Object.values(graphMap).map(n => ({ ...n }));
    const edges = generateGraphFromInput(nodesArray, edgesString).edges.map(e => ({ ...e }));

    const startNode = nodes.find(n => n.value === startNodeValue);
    
    if (!startNode) {
        console.warn("Invalid start node for BFS:", startNodeValue);
        return [];
    }

    // Map internal node IDs to node objects for quick look-up
    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    
    // Helper function to create a visualization step
    function record() {
        // Clone the current state of nodes and edges for the step
        const step = {
            bars: nodesArray, 
            nodes: nodes.map(n => ({ ...n })),
            edges: edges.map(e => ({ ...e })),
            root: null,
        };
        steps.push(step);
    }

    // --- BFS Implementation ---
    
    // Initialization
const queue = [];

startNode.status = "visiting";   // line 3
record(3);

queue.push(startNode);           // line 4
record(4);

// Main loop
while (queue.length > 0) {       // line 6
    record(6);

    const u = queue.shift();     // line 7
    record(7);

    u.status = "current";        // line 8
    record(8);

    const adjList = graphMap[u.value].adj;

    for (const { node: v_ref, edge: edge_ref } of adjList) { // line 10
        record(10);

        const v = nodeMap.get(v_ref.id);
        const currentEdge = edges.find(e => e.id === edge_ref.id);

        if (v.status === "unvisited") {   // line 11
            record(11);

            if (currentEdge) currentEdge.status = "current"; // line 12
            record(12);

            v.status = "visiting";         // line 14
            record(14);

            queue.push(v);                 // line 15
            record(15);

            if (currentEdge) currentEdge.status = "processed"; // line 17
            record(17);
        }
    }

    u.status = "visited";        // line 21
    record(21);
}

    
    return steps;
}

export const bfsCode = `
function BFS(startNode) {
  const queue = [];
  startNode.status = 'visiting';
  queue.push(startNode);

  while (queue.length > 0) {
    const u = queue.shift();
    u.status = 'current'; 
    // Record step (Node u is currently active)

    for (const { node: v, edge } of u.adj) {
      if (v.status === 'unvisited') {
        edge.status = 'current';
        // Record step (Edge u->v is active)
        
        v.status = 'visiting';
        queue.push(v);
        
        edge.status = 'processed';
        // Record step (Edge u->v is processed)
      }
    }

    u.status = 'visited';
    // Record final step (Node u is finished)
  }
}
`;