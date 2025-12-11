// src/algorithms/kruskal.js

import { generateGraphFromInput } from "../utils/generateGraphFromInput.js";

// Simple Disjoint Set Union (DSU) implementation
class DSU {
    constructor(nodes) {
        this.parent = new Map();
        nodes.forEach(node => this.parent.set(node.id, node.id));
    }
    find(i) {
        if (this.parent.get(i) === i) return i;
        const root = this.find(this.parent.get(i));
        this.parent.set(i, root);
        return root;
    }
    union(i, j) {
        const rootI = this.find(i);
        const rootJ = this.find(j);
        if (rootI !== rootJ) {
            this.parent.set(rootI, rootJ);
            return true; // Union successful (they were in different sets)
        }
        return false; // Already in the same set (would create a cycle)
    }
}

/**
 * Implements Kruskal's Algorithm and generates visualization steps.
 * @param {number[]} nodesArray - Array of node values.
 * @param {string} edgesString - String of edges (u-v:w).
 * @returns {Object[]} An array of visualization steps.
 */
export function kruskal(nodesArray, edgesString) {
    const steps = [];
    const { nodes: initialNodes, edges: initialEdges } = generateGraphFromInput(nodesArray, edgesString);
    
    // Mutable copies
    const nodes = initialNodes.map(n => ({ ...n, status: "unvisited" }));
    const edges = initialEdges.map(e => ({ ...e }));

    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    
    function record() {
        const step = {
            bars: nodesArray, 
            nodes: nodes.map(n => ({ ...n })),
            edges: edges.map(e => ({ ...e })),
            root: null,
        };
        steps.push(step);
    }

    // --- Kruskal's Implementation ---

    // 1. Sort all unique edges by weight
    const uniqueEdges = edges
        .filter(e => !e.id.endsWith("-r")) // Only keep one direction for undirected edges
        .sort((a, b) => a.weight - b.weight);

    const dsu = new DSU(nodes);
    
    // Initial state
    record();

    // 2. Iterate through sorted edges
    for (const edge of uniqueEdges) {
        const u = edge.from;
        const v = edge.to;
        
        // Find all representations of this edge (forward and reverse)
        const forwardEdge = edges.find(e => e.id === edge.id);
        const reverseEdge = edges.find(e => e.id === `${v}-${u}-${edge.id.split('-').pop()}-r`);
        
        if (forwardEdge) forwardEdge.status = "current";
        if (reverseEdge) reverseEdge.status = "current";
        nodeMap.get(u).status = "current";
        nodeMap.get(v).status = "current";
        record();

        // Check for cycle using DSU
        if (dsu.union(u, v)) {
            // No cycle: include edge in MST
            if (forwardEdge) forwardEdge.status = "mst";
            if (reverseEdge) reverseEdge.status = "mst";
        } else {
            // Cycle: reject edge
            if (forwardEdge) forwardEdge.status = "rejected";
            if (reverseEdge) reverseEdge.status = "rejected";
        }
        
        // Mark nodes as processed
        nodeMap.get(u).status = "visited";
        nodeMap.get(v).status = "visited";
        record();
        
        // Mark edge status as final processed
        if (forwardEdge) forwardEdge.status = forwardEdge.status === "mst" ? "mst" : "processed";
        if (reverseEdge) reverseEdge.status = reverseEdge.status === "mst" ? "mst" : "processed";
        record();
    }
    
    return steps;
}

export const kruskalCode = `
function Kruskals(nodes, edges) {
  edges.sort((a, b) => a.weight - b.weight);
  const dsu = new DSU(nodes);
  const mst = [];

  for (const edge of edges) {
    const u = edge.from;
    const v = edge.to;
    
    edge.status = 'current';
    // Record step (Edge u-v is being checked)

    if (dsu.find(u) !== dsu.find(v)) {
      // No cycle: include edge
      dsu.union(u, v);
      mst.push(edge);
      edge.status = 'mst';
      // Record step (Edge added to MST)
    } else {
      // Cycle: reject edge
      edge.status = 'rejected';
      // Record step (Edge rejected due to cycle)
    }
    edge.status = 'processed'; // or 'mst'
  }
  return mst;
}
`;