// src/algorithms/prims.js

/**
 * Utility function to convert input array (of node IDs) to a fixed, weighted, 
 * undirected graph structure for visualization.
 */
function generateWeightedGraph(arr) {
    // 1. Create nodes with visualization coordinates and initial state
    const nodes = arr.map((value, index) => ({
        id: value,
        value: value,
        status: 'unprocessed',
        distance: Infinity, // Key for Prim's
        parent: null,
        // Calculate position (simple grid layout)
        x: 50 + (index % 5) * 150,
        y: 100 + Math.floor(index / 5) * 150,
    }));

    // 2. Define fixed weighted edges based on node IDs
    const edges = [];
    if (nodes.length >= 5) {
        // IDs must match values in arr (e.g., if arr = [1, 2, 3, 4, 5])
        edges.push({ id: 'e1', from: nodes[0].id, to: nodes[1].id, weight: 10, status: 'unprocessed' });
        edges.push({ id: 'e2', from: nodes[0].id, to: nodes[2].id, weight: 6, status: 'unprocessed' });
        edges.push({ id: 'e3', from: nodes[1].id, to: nodes[3].id, weight: 4, status: 'unprocessed' });
        edges.push({ id: 'e4', from: nodes[2].id, to: nodes[3].id, weight: 12, status: 'unprocessed' });
        edges.push({ id: 'e5', from: nodes[1].id, to: nodes[4].id, weight: 3, status: 'unprocessed' });
        edges.push({ id: 'e6', from: nodes[3].id, to: nodes[4].id, weight: 8, status: 'unprocessed' });
    } else {
        // Fallback for smaller arrays (less complex, but connected)
        for (let i = 0; i < nodes.length - 1; i++) {
             edges.push({ id: `e${i}`, from: nodes[i].id, to: nodes[i+1].id, weight: 1 + i, status: 'unprocessed' });
        }
    }
    
    return { nodes, edges };
}

export function prims(arr, startNodeValue) {
    const steps = [];
    let { nodes, edges } = generateWeightedGraph(arr); // Use the fixed graph generator

    const startNode = nodes.find(n => n.id === startNodeValue) || nodes[0];
    if (!startNode) return [];

    startNode.distance = 0; // Starting node has key 0
    startNode.status = 'visiting';

    // Build Adjacency List for efficient neighbor lookup
    const adj = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
        adj[e.from].push({ neighborId: e.to, weight: e.weight, edgeId: e.id });
        adj[e.to].push({ neighborId: e.from, weight: e.weight, edgeId: e.id }); // Undirected
    });

    let unprocessedNodes = [...nodes];

    // Initial state (line 5: initialization)
    steps.push({
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges)),
        line: 5
    });

    while (unprocessedNodes.length > 0) {
        // Find the unprocessed node with the minimum distance (Simulate Priority Queue)
        unprocessedNodes.sort((a, b) => a.distance - b.distance);
        const u = unprocessedNodes.shift(); // line 8

        if (u.distance === Infinity) break;

        u.status = 'visited'; // Mark as part of MST

        // Step 1: Select minimum node
        // The edge that added 'u' to the MST should be marked 'mst' here.
        if (u.parent) {
             const mstEdge = edges.find(e => (e.from === u.id && e.to === u.parent) || (e.from === u.parent && e.to === u.id));
             if (mstEdge) mstEdge.status = 'mst';
        }
        steps.push({
            nodes: JSON.parse(JSON.stringify(nodes)),
            edges: JSON.parse(JSON.stringify(edges)),
            line: 8 
        });
        
        // Update neighbors
        for (const { neighborId, weight, edgeId } of adj[u.id]) {
            const v = nodes.find(n => n.id === neighborId);
            const edge = edges.find(e => e.id === edgeId);
            
            if (v && v.status !== 'visited' && weight < v.distance) { // line 11 (Relaxation check)
                v.distance = weight;
                v.parent = u.id; // Record the edge to MST
                v.status = 'visiting'; // Potential candidate
                
                // Step 2: Relaxation/update neighbor
                steps.push({
                    nodes: JSON.parse(JSON.stringify(nodes)),
                    edges: edges.map(e => ({
                        ...e, 
                        status: e.id === edgeId ? 'current' : e.status
                    })),
                    line: 12
                });
            }
        }
        
        // Remove processed node from unprocessed list for the next iteration
        unprocessedNodes = unprocessedNodes.filter(n => n.id !== u.id);
    }
    
    // Final step
    steps.push({
        nodes: JSON.parse(JSON.stringify(nodes.map(n => ({...n, status: 'visited'})))),
        edges: edges.map(e => ({...e, status: e.status === 'mst' ? 'mst' : 'unprocessed'})),
        line: 14 
    });

    return steps;
}

export const primsCode = `
function Prims(graph, startNode) {
  // Initialize distances, set startNode distance to 0 // line 5

  while (unprocessedNodes is not empty) {
    const u = extractMin(unprocessedNodes); // line 8
    u.status = 'visited';

    for (const edge(u, v) of u.neighbors) {
      if (v.status !== 'visited' && edge.weight < v.distance) { // line 11
        v.distance = edge.weight; // line 12
        v.parent = u;
      }
    }
  }
  // MST is the set of edges (v.parent, v) for all v != startNode // line 14
}
`;
//