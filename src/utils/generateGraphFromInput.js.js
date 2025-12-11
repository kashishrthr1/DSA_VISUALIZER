// src/utils/generateGraphFromInput.js

/**
 * Parses user input (nodes and edges) into a structured graph object
 * suitable for visualization. Assigns unique IDs and random coordinates.
 * @param {number[]} nodesArray - Array of node values (e.g., [1, 2, 3]).
 * @param {string} edgesString - String of edges (e.g., "1-2, 2-3:5, 1-3").
 * @returns {{nodes: Object[], edges: Object[]}} Structured graph state.
 */
export function generateGraphFromInput(nodesArray, edgesString) {
    const graphNodes = {};
    const nodes = [];
    const edges = [];
    let uniqueIdCounter = 0;
    
    // 1. Create Nodes with Unique ID and Random Positions
    nodesArray.forEach((value, index) => {
        // Use an internal unique ID for React keys and algorithm tracking
        const id = uniqueIdCounter++; 
        
        // Simple random positioning for unformatted input
        const x = 50 + Math.floor(Math.random() * 800); // 50 to 850
        const y = 50 + Math.floor(Math.random() * 350); // 50 to 400

        const newNode = {
            id: id,
            value: value, // The value the user entered (e.g., '1')
            x: x,
            y: y,
            status: "unvisited",
            adj: [] // Adjacency list by internal node object reference
        };
        // Map based on the user's input value (since start node is selected by value)
        graphNodes[value] = newNode; 
        nodes.push(newNode);
    });

    // 2. Parse Edges
    if (edgesString && edgesString.trim()) {
        const edgePairs = edgesString.split(",").map(s => s.trim()).filter(s => s);
        
        edgePairs.forEach((edgeStr, index) => {
            let [pair, weightStr] = edgeStr.split(":");
            let weight = weightStr ? Number(weightStr.trim()) : 1;
            
            const [uStr, vStr] = pair.split("-");
            const u = Number(uStr.trim());
            const v = Number(vStr.trim());
            
            // Look up nodes by their user-defined value
            const nodeU = graphNodes[u];
            const nodeV = graphNodes[v];

            if (nodeU && nodeV) {
                const newEdge = {
                    id: `${nodeU.id}-${nodeV.id}-${index}`, // Unique edge ID using internal IDs
                    from: nodeU.id, // Use internal ID for drawing
                    to: nodeV.id,   // Use internal ID for drawing
                    weight: weight,
                    status: "unprocessed"
                };
                
                edges.push(newEdge);
                
                // For adjacency list, store the target node object and the edge reference
                nodeU.adj.push({ node: nodeV, edge: newEdge });
                
                // Undirected edge (for BFS/DFS/Kruskal/Prims)
                const reverseEdge = {
                    id: `${nodeV.id}-${nodeU.id}-${index}-r`, // Unique ID for reverse edge
                    from: nodeV.id,
                    to: nodeU.id,
                    weight: weight,
                    status: "unprocessed"
                };
                edges.push(reverseEdge);
                nodeV.adj.push({ node: nodeU, edge: reverseEdge });
            }
        });
    }

    // Return the full structured state for the visualization
    return { 
        // Remove circular reference and ensure only necessary props are passed
        nodes: nodes.map(n => ({ 
            id: n.id, 
            value: n.value, 
            x: n.x, 
            y: n.y, 
            status: n.status 
        })), 
        edges: edges,
        // Also return the graph map structure needed by the algorithms (using value as key for lookup)
        graphMap: graphNodes
    };
}