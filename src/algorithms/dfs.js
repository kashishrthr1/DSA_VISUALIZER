// src/algorithms/dfs.js

import { generateGraphFromInput } from "../utils/generateGraphFromInput.js";

/**
 * Implements Depth First Search (DFS) and generates visualization steps.
 * @param {number[]} nodesArray - Array of node values.
 * @param {string} edgesString - String of edges (u-v, u-v:w).
 * @param {number} startNodeValue - The value of the starting node.
 * @returns {Object[]} An array of visualization steps.
 */
export function dfs(nodesArray, edgesString, startNodeValue) {
    const steps = [];
    
    // Use the utility to get the graph structure for visualization
    const initialGraphState = generateGraphFromInput(nodesArray, edgesString);
    let nodesMap = {};
    initialGraphState.nodes.forEach(n => {
        nodesMap[n.id] = { ...n, adj: [] }; // Create a mutable map for algorithm
    });
    
    // Re-populate adj list with references to the mutable nodesMap objects
    initialGraphState.edges.forEach(e => {
        if (nodesMap[e.from] && nodesMap[e.to]) {
            nodesMap[e.from].adj.push({ node: nodesMap[e.to], edge: e });
        }
    });

    const edges = initialGraphState.edges.map(e => ({ ...e })); // Mutable copy for status update

    const startNode = nodesMap[startNodeValue];
    if (!startNode) {
        console.warn("Invalid start node for DFS:", startNodeValue);
        return [];
    }
    
    // Find the actual start node and set its status
    startNode.status = "start";
    
    function record() {
        // Clone the current state of nodes and edges for the step
        const step = {
            bars: nodesArray, // Not used for graph, but for compatibility
            nodes: Object.values(nodesMap).map(n => ({ 
                id: n.id, 
                value: n.value, 
                x: n.x, 
                y: n.y, 
                status: n.status 
            })),
            edges: edges.map(e => ({ ...e })),
            root: null,
            // Add a meaningful message for the current step (optional)
            message: `Visiting node ${startNode.value}...`
        };
        steps.push(step);
    }

    function DFS_recursive(u) {
        u.status = "visiting"; // Mark current node as visiting
        record(); // State 1: Visiting 'u'

        // Iterate through neighbors
        for (const { node: v, edge } of u.adj) {
            // Only process unvisited neighbors
            if (v.status === "unvisited") {
                edge.status = "current"; // Mark the edge being traversed
                record(); // State 2: Highlighting edge (u -> v)
                
                DFS_recursive(v);
                
                // After DFS returns from v, mark edge as processed/done
                edge.status = "processed"; 
                // We don't need to record here unless it's a specific requirement
            } else if (v.status === "visited" && edge.status === "unprocessed") {
                // If it's a back edge to an already visited node (optional for visualization)
                edge.status = "rejected";
                // record(); 
                edge.status = "unprocessed"; // Revert to prevent clutter
            }
        }

        u.status = "visited"; // Mark node as fully visited/finished
        record(); // State 3: Node 'u' is fully visited
    }
    
    // Initial state record (all unvisited)
    record();

    // Start DFS from the target node
    DFS_recursive(startNode);
    
    return steps;
}

export const dfsCode = `
function DFS(u) {
  // If node is already visited or being visited, skip
  if (u.status !== 'unvisited') return; 

  u.status = 'visiting'; // line 5
  // Record step

  for (const { node: v, edge } of u.adj) { // line 7
    if (v.status === 'unvisited') {
      edge.status = 'current';
      // Record step
      
      DFS(v); // line 9
      
      edge.status = 'processed';
    }
  }

  u.status = 'visited'; // line 11
  // Record final step
}
`;