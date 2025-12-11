// src/algorithms/kruskal.js

/**
 * Utility function to convert input array (of node IDs) to a fixed, weighted, 
 * undirected graph structure for visualization. (Same as Prim's for consistent testing)
 */
function generateEdgeListGraph(arr) {
    // 1. Create nodes with visualization coordinates
    const nodes = arr.map((value, index) => ({
        id: value,
        value: value,
        status: 'unprocessed',
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

export function kruskal(arr) {
    const steps = [];
    let { nodes, edges } = generateEdgeListGraph(arr);

    // Sort all edges by weight (line 5)
    edges.sort((a, b) => a.weight - b.weight);

    // Union-Find structure (Simulated Disjoint Set)
    const parent = {};
    nodes.forEach(n => parent[n.id] = n.id);

    function find(i) {
        if (parent[i] === i) return i;
        // Path compression
        parent[i] = find(parent[i]);
        return parent[i];
    }

    function union(i, j) {
        const rootI = find(i);
        const rootJ = find(j);
        if (rootI !== rootJ) {
            // Union by rank/size (simple implementation)
            parent[rootI] = rootJ;
            return true;
        }
        return false;
    }

    let mstEdges = [];
    let edgeIndex = 0;
    
    // Initial state (line 5: sorting done)
    steps.push({
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: edges.map(e => ({...e, status: 'unprocessed'})),
        line: 5
    });

    while (mstEdges.length < nodes.length - 1 && edgeIndex < edges.length) {
        const edge = edges[edgeIndex]; // Get the next lightest edge (line 8)
        edgeIndex++;

        // Step 1: Highlight current edge for consideration
        const currentEdgesStep = edges.map(e => ({...e, status: e.id === edge.id ? 'current' : e.status}));
        steps.push({
            nodes: JSON.parse(JSON.stringify(nodes)),
            edges: currentEdgesStep,
            line: 8
        });

        // Check if adding this edge creates a cycle (line 9)
        if (find(edge.from) !== find(edge.to)) { 
            union(edge.from, edge.to); // Add edge to MST (line 11)
            mstEdges.push(edge);
            
            // Mark edge as part of MST for visualization
            const edgeInMasterList = edges.find(e => e.id === edge.id);
            if(edgeInMasterList) edgeInMasterList.status = 'mst';
            
            // Mark nodes as 'visited' (part of the growing forest/MST)
            nodes.find(n => n.id === edge.from).status = 'visited';
            nodes.find(n => n.id === edge.to).status = 'visited';


            // Step 2: Edge added to MST (no cycle)
            steps.push({
                nodes: JSON.parse(JSON.stringify(nodes)),
                edges: JSON.parse(JSON.stringify(edges)),
                line: 11
            });
        } else {
            // Edge rejected (cycle created)
            steps.push({
                nodes: JSON.parse(JSON.stringify(nodes)),
                edges: currentEdgesStep.map(e => ({...e, status: e.id === edge.id ? 'rejected' : e.status})),
                line: 9
            });
            // Reset the rejected edge's status in the visualization list
            const edgeInMasterList = edges.find(e => e.id === edge.id);
            if(edgeInMasterList) edgeInMasterList.status = 'unprocessed'; 
        }
    }
    
    // Final step (line 13)
    steps.push({
        nodes: nodes.map(n => ({...n, status: 'visited'})),
        edges: edges.map(e => ({...e, status: e.status === 'mst' ? 'mst' : 'unprocessed'})),
        line: 13
    });

    return steps;
}

export const kruskalCode = `
function Kruskal(graph) {
  // 1. Create a Disjoint Set Union (DSU) structure
  // 2. Sort all edges by weight, w
  const sortedEdges = sort(graph.edges); // line 5

  const MST = [];

  for (const edge of sortedEdges) { // line 8
    if (find(edge.u) !== find(edge.v)) { // line 9 (No Cycle)
      union(edge.u, edge.v); // line 11
      MST.push(edge);
    }
  }

  return MST; // line 13
}
`;
//