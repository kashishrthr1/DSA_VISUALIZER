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
        nodesMap[n.id] = { ...n, adj: [], status: "unvisited" }; // Ensure initial status is 'unvisited'
    });
    
    // Re-populate adj list with references to the mutable nodesMap objects
    initialGraphState.edges.forEach(e => {
        if (nodesMap[e.from] && nodesMap[e.to]) {
            // Note: Since node references are used, 'adj' holds the mutable node objects
            const v_ref = nodesMap[e.to];
            const edge_ref = initialGraphState.edges.find(ie => ie.id === e.id);
            if (edge_ref) {
                 nodesMap[e.from].adj.push({ node: v_ref, edge: { ...edge_ref } }); // Use a copy of edge for mutation
            }
        }
    });

    // Extract mutable edges list from the map's adjacency structure for state recording
    // This is complex due to the graph generation utility; we'll use a simplified mutable edges array
    const edges = initialGraphState.edges.map(e => ({ ...e }));
    const edgeIdMap = new Map(edges.map(e => [e.id, e]));

    const startNode = Object.values(nodesMap).find(n => n.value === startNodeValue);
    if (!startNode) {
        console.warn("Invalid start node for DFS:", startNodeValue);
        return [];
    }
    
    // Find the actual start node and set its status
    startNode.status = "start";
    
    // FIX: Added 'line' parameter
    function record(line = null) {
        // Clone the current state of nodes and edges for the step
        const step = {
            bars: nodesArray, 
            nodes: Object.values(nodesMap).map(n => ({ 
                id: n.id, 
                value: n.value, 
                x: n.x, 
                y: n.y, 
                status: n.status 
            })),
            edges: edges.map(e => ({ ...e })),
            root: null,
            line: line, // LINE FIX
        };
        steps.push(step);
    }

    function DFS_recursive(u) {

        // line 4
        u.status = "visiting";
        record(6);
    
        for (const { node: v, edge: initialEdge } of u.adj) {
            // line 6
            record(9);
    
            const mutableEdge = edgeIdMap.get(initialEdge.id);
    
            // line 7
            record(10);
            if (v.status === "unvisited") {
    
                // line 8
                if (mutableEdge) mutableEdge.status = "current";
                record(11);
    
                // line 10
                DFS_recursive(v);
                record(14);
    
                // line 12
                if (mutableEdge) mutableEdge.status = "processed";
                record(16);
            }
        }
    
        // line 16
        u.status = "visited";
        record(20);
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
    if (v.status === 'unvisited') { // line 8
      edge.status = 'current';
      // Record step // line 10
      
      DFS(v); // line 12
      
      edge.status = 'processed'; // line 14
    }
  }

  u.status = 'visited'; // line 17
  // Record final step
}
`;