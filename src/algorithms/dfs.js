// src/algorithms/dfs.js

/**
 * Utility function to convert input array to a simple graph structure.
 * This is a placeholder and should be replaced with a robust graph generator.
 */
function generateGraphFromInput(arr) {
    const nodes = arr.map((value, index) => ({
        id: value,
        value: value,
        status: 'unvisited',
        x: 50 + (index % 5) * 150,
        y: 100 + Math.floor(index / 5) * 150,
    }));

    // Example edges for a simple connected structure
    const edges = [];
    for (let i = 0; i < nodes.length - 1; i++) {
        edges.push({
            id: `${nodes[i].id}-${nodes[i+1].id}`,
            from: nodes[i].id,
            to: nodes[i+1].id,
            weight: 1,
            status: 'unprocessed'
        });
    }

    return { nodes, edges };
}

export function dfs(arr, startNodeValue) {
    const steps = [];
    let { nodes, edges } = generateGraphFromInput(arr);
    
    // Find the starting node
    const startNode = nodes.find(n => n.id === startNodeValue) || nodes[0];
    if (!startNode) return [];

    // Map for easy neighbor lookup (Adjacency List simulation)
    const adj = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
        adj[e.from].push(e.to);
        adj[e.to].push(e.from); // For undirected graph
    });

    function dfsRecursive(uId) {
        let u = nodes.find(n => n.id === uId);
        if (!u || u.status === 'visited') return;

        u.status = 'visiting'; // Mark as currently visiting/on the stack
        
        // Step 1: Visiting the node
        steps.push({
            nodes: JSON.parse(JSON.stringify(nodes)),
            edges: edges.map(e => ({...e, status: e.status === 'current' ? 'unprocessed' : e.status})),
            line: 5 
        });

        // Loop through neighbors
        for (const vId of adj[uId]) {
            let v = nodes.find(n => n.id === vId);
            
            // Highlight the edge being traversed
            const edgeId = `${Math.min(uId, vId)}-${Math.max(uId, vId)}`;
            const currentEdges = edges.map(e => ({
                ...e, 
                status: (e.from === uId && e.to === vId) || (e.from === vId && e.to === uId) ? 'current' : e.status
            }));

            steps.push({
                nodes: JSON.parse(JSON.stringify(nodes)),
                edges: currentEdges,
                line: 7
            });
            
            if (v && v.status === 'unvisited') {
                dfsRecursive(vId); // Recursive call

                // Backtracking step
                steps.push({
                    nodes: JSON.parse(JSON.stringify(nodes)),
                    edges: currentEdges.map(e => ({...e, status: e.status === 'current' ? 'processed' : e.status})),
                    line: 9
                });
            }
        }
        
        u.status = 'visited'; // Mark as fully processed
        
        // Step 2: Fully visited
        steps.push({
            nodes: JSON.parse(JSON.stringify(nodes)),
            edges: JSON.parse(JSON.stringify(edges)),
            line: 11
        });
    }

    dfsRecursive(startNode.id);
    return steps;
}

export const dfsCode = `
function DFS(graph, u) {
  if (u.status === 'visited') return; 

  u.status = 'visiting'; // line 5

  for (const v of u.neighbors) { // line 7
    if (v.status === 'unvisited') {
      DFS(graph, v); // line 9
    }
  }

  u.status = 'visited'; // line 11
}
`;