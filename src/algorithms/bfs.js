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
    
    // 1. Initialization
    const queue = [];
    
    startNode.status = "start";
    record(); // Initial state: start node highlighted
    
    startNode.status = "visiting";
    queue.push(startNode);
    record();

    // 2. Main Loop
    while (queue.length > 0) {
        const u = queue.shift(); // Dequeue
        u.status = "current"; // Node being processed
        record();
        
        // Find neighbors from the adjacency list (stored in graphMap)
        const adjList = graphMap[u.value].adj;

        for (const { node: v_ref, edge: edge_ref } of adjList) {
            // Find the current mutable node and edge objects by ID
            const v = nodeMap.get(v_ref.id);
            const currentEdge = edges.find(e => e.id === edge_ref.id);

            // Check if the neighbor has been visited (status is not default 'unvisited')
            if (v.status === "unvisited") {
                if (currentEdge) currentEdge.status = "current"; // Edge is active
                record();

                v.status = "visiting"; // Mark as visiting
                queue.push(v);
                
                if (currentEdge) currentEdge.status = "processed"; // Edge processed
                record();
            } else if (currentEdge) {
                // Mark edge as rejected/checked if already visited, for visualization
                currentEdge.status = "rejected"; 
                record();
                currentEdge.status = "processed";
            }
        }
        
        u.status = "visited"; // Node is finished
        record();
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