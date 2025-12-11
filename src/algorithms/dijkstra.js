function generateShortestPathGraph(arr) {
    const nodes = arr.map((value, index) => ({
        id: value,
        value: value,
        status: 'unprocessed',
        distance: Infinity, // Key for Dijkstra's
        parent: null,
        x: 50 + (index % 5) * 150,
        y: 100 + Math.floor(index / 5) * 150,
    }));

    const edges = [];
    const numNodes = nodes.length;

    // Simple fixed directed weighted edges
    if (numNodes >= 2) edges.push({ id: 'e1', from: nodes[0].id, to: nodes[1].id, weight: 10, status: 'unprocessed' });
    if (numNodes >= 3) edges.push({ id: 'e2', from: nodes[0].id, to: nodes[2].id, weight: 3, status: 'unprocessed' });
    if (numNodes >= 4) edges.push({ id: 'e3', from: nodes[1].id, to: nodes[3].id, weight: 4, status: 'unprocessed' });
    if (numNodes >= 4) edges.push({ id: 'e4', from: nodes[2].id, to: nodes[3].id, weight: 5, status: 'unprocessed' });
    
    return { nodes, edges };
}

export function dijkstra(arr, startNodeValue) {
    const steps = [];
    let { nodes, edges } = generateShortestPathGraph(arr);

    const startNode = nodes.find(n => n.id === startNodeValue) || nodes[0];
    if (!startNode) return [];

    startNode.distance = 0;
    startNode.status = 'visiting';

    // Adjacency List Map (node.id -> [{neighborId, weight, edgeId}, ...])
    const adj = {};
    nodes.forEach(n => adj[n.id] = []);
    edges.forEach(e => {
        adj[e.from].push({ neighborId: e.to, weight: e.weight, edgeId: e.id });
    });

    let unprocessedNodes = [...nodes];
    
    // Initial state
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

        u.status = 'visited'; // Mark as having final shortest distance

        // Step 1: Extract minimum node
        steps.push({
            nodes: JSON.parse(JSON.stringify(nodes)),
            edges: JSON.parse(JSON.stringify(edges)),
            line: 8 
        });


        // Update neighbors
        for (const { neighborId, weight, edgeId } of adj[u.id]) {
            const v = nodes.find(n => n.id === neighborId);
            const edge = edges.find(e => e.id === edgeId);
            
            // Relaxation step
            if (v && u.distance + weight < v.distance) { // line 11
                v.distance = u.distance + weight;
                v.parent = u.id;
                v.status = 'visiting'; 
                
                // Mark node status update
                if(v.distance !== Infinity) {
                    v.value = `${v.id} (D:${v.distance})`; // Optional: Update display value
                }

                // Mark edge as current for comparison
                edge.status = 'current';

                // Step 2: Relaxation/update neighbor
                steps.push({
                    nodes: JSON.parse(JSON.stringify(nodes)),
                    edges: JSON.parse(JSON.stringify(edges)),
                    line: 12
                });
                edge.status = 'unprocessed'; // Reset edge color
            }
        }
        
        // Remove processed node from unprocessed list for the next iteration
        unprocessedNodes = unprocessedNodes.filter(n => n.id !== u.id);
    }
    
    // Final step: highlight shortest paths
    edges.forEach(e => {
        if(nodes.find(n => n.id === e.to)?.parent === e.from) {
            e.status = 'mst'; // Using 'mst' color for final shortest path
        }
    });

    steps.push({
        nodes: nodes.map(n => ({...n, status: 'visited'})),
        edges: JSON.parse(JSON.stringify(edges)),
        line: 14 
    });

    return steps;
}

export const dijkstraCode = `
function Dijkstra(graph, startNode) {
  // Initialize distances, set startNode distance to 0 // line 5
  const distances = initializeDistances(graph);
  
  while (unvisitedNodes is not empty) {
    const u = extractMin(unvisitedNodes); // line 8
    u.status = 'visited';

    for (const edge(u, v) of u.neighbors) {
      // Relaxation
      if (distances[u] + edge.weight < distances[v]) { // line 11
        distances[v] = distances[u] + edge.weight; // line 12
        v.parent = u;
      }
    }
  }

  return distances; // line 14
}
`;