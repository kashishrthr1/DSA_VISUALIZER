// src/algorithms/bfs.js

/**
 * Utility function to convert input array (of node IDs) to a fixed, unweighted, 
 * undirected graph structure for visualization.
 */
function generateConnectedGraph(arr) {
    const nodes = arr.map((value, index) => ({
        id: value,
        value: value,
        status: 'unvisited',
        // Calculate position (simple grid layout)
        x: 50 + (index % 5) * 150,
        y: 100 + Math.floor(index / 5) * 150,
    }));

    // Example edges for a simple connected structure (Undirected, unweighted)
    const edges = [];
    const numNodes = nodes.length;

    // Connect sequential nodes (0-1, 1-2, 2-3, ...)
    for (let i = 0; i < numNodes - 1; i++) {
        edges.push({
            id: `e${nodes[i].id}-${nodes[i+1].id}`,
            from: nodes[i].id,
            to: nodes[i+1].id,
            weight: 1,
            status: 'unprocessed'
        });
    }

    // Add a couple of cross-connections to make it interesting
    if (numNodes >= 3) {
        edges.push({
            id: `e${nodes[0].id}-${nodes[2].id}`,
            from: nodes[0].id,
            to: nodes[2].id,
            weight: 1,
            status: 'unprocessed'
        });
    }
    if (numNodes >= 4) {
        edges.push({
            id: `e${nodes[1].id}-${nodes[3].id}`,
            from: nodes[1].id,
            to: nodes[3].id,
            weight: 1,
            status: 'unprocessed'
        });
    }

    return { nodes, edges };
}

export function bfs(arr, startNodeValue) {
    const steps = [];
    // 1. Generate the graph
    let { nodes, edges } = generateConnectedGraph(arr); 
    
    const startNode = nodes.find(n => n.id === startNodeValue) || nodes[0];
    if (!startNode) return [];

    // 2. Build Adjacency List for neighbor lookup
    const adj = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
        adj[e.from].push({ neighborId: e.to, edgeId: e.id });
        adj[e.to].push({ neighborId: e.from, edgeId: e.id }); // Undirected
    });

    const queue = [startNode.id]; // line 5
    startNode.status = 'visiting';

    // Initial state step
    steps.push({
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges)),
        line: 5
    });

    while (queue.length > 0) {
        const uId = queue.shift(); // line 7
        const u = nodes.find(n => n.id === uId);
        u.status = 'visited';
        
        // Step 1: Dequeue/Visit Node
        steps.push({
            nodes: JSON.parse(JSON.stringify(nodes)),
            edges: JSON.parse(JSON.stringify(edges)),
            line: 7
        });

        // Loop through neighbors
        for (const { neighborId, edgeId } of adj[uId]) {
            const v = nodes.find(n => n.id === neighborId);
            const edge = edges.find(e => e.id === edgeId);
            
            if (v && v.status === 'unvisited') { // line 9
                v.status = 'visiting'; // line 10
                queue.push(v.id); // line 11
                
                // Highlight the edge being traversed
                steps.push({
                    nodes: JSON.parse(JSON.stringify(nodes)),
                    edges: edges.map(e => ({
                        ...e, 
                        status: e.id === edgeId ? 'current' : e.status
                    })),
                    line: 10
                });
                // Mark the edge as processed for subsequent steps
                if (edge) edge.status = 'processed'; 
            }
        }
    }
    
    // Final step: All nodes marked as visited
    steps.push({
        nodes: nodes.map(n => ({...n, status: 'visited'})),
        edges: edges.map(e => ({...e, status: e.status === 'processed' ? 'processed' : 'unprocessed'})),
        line: 13 // Corresponds to end of while loop
    });
    
    return steps;
}

// *** CRITICAL FIX: Ensure bfsCode is correctly exported! ***
export const bfsCode = `
function BFS(graph, startNode) {
  const queue = [startNode]; // line 5
  startNode.status = 'visiting';

  while (queue.length > 0) {
    const u = queue.shift(); // line 7
    u.status = 'visited';

    for (const v of u.neighbors) {
      if (v.status === 'unvisited') { // line 9
        v.status = 'visiting'; // line 10
        queue.push(v); // line 11
      }
    }
  }
  // All nodes visited (implicit return) // line 13
}
`;