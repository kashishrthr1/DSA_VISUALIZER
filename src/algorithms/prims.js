// src/algorithms/prims.js

import { generateGraphFromInput } from "../utils/generateGraphFromInput.js";

// Simple Priority Queue implementation for demonstration
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    enqueue(element, priority) {
        this.items.push({ element, priority });
        this.items.sort((a, b) => a.priority - b.priority); // Sort by priority
    }
    dequeue() {
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length === 0;
    }
}

/**
 * Implements Prim's Algorithm and generates visualization steps.
 * @param {number[]} nodesArray - Array of node values.
 * @param {string} edgesString - String of edges (u-v:w).
 * @param {number} startNodeValue - The value of the starting node.
 * @returns {Object[]} An array of visualization steps.
 */
export function prims(nodesArray, edgesString, startNodeValue) {
    const steps = [];
    const { graphMap } = generateGraphFromInput(nodesArray, edgesString);
    
    // Mutable copies
    const nodes = Object.values(graphMap).map(n => ({ ...n, minCost: Infinity, parentEdge: null }));
    const edges = generateGraphFromInput(nodesArray, edgesString).edges.map(e => ({ ...e }));

    const startNode = nodes.find(n => n.value === startNodeValue);
    if (!startNode) return [];

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

    // --- Prim's Implementation ---
    
    const pq = new PriorityQueue();
    startNode.minCost = 0;
    pq.enqueue(startNode, 0);
    startNode.status = "start";
    record();

    while (!pq.isEmpty()) {
        const { element: u, priority: cost } = pq.dequeue();
        
        // Find the node in the mutable array
        const currentU = nodeMap.get(u.id);

        if (currentU.status === "visited") continue;

        currentU.status = "current"; 
        record(); 
        
        // Add the edge that brought us here to the MST (if it exists)
        if (currentU.parentEdge) {
            const mstEdge = edges.find(e => e.id === currentU.parentEdge.id);
            if (mstEdge) mstEdge.status = "mst";
        }
        record(); // Show the MST edge selection

        // Mark as visited and part of the MST
        currentU.status = "visited";

        // Examine adjacent edges (using graphMap which holds the adjacency list)
        const adjList = graphMap[u.value].adj;

        for (const { node: v_ref, edge: edge_ref } of adjList) {
            const v = nodeMap.get(v_ref.id);
            const currentEdge = edges.find(e => e.id === edge_ref.id);
            const isReverse = edge_ref.id.endsWith("-r"); // Ignore reverse edges to avoid double-processing

            if (v.status !== "visited" && edge_ref.weight < v.minCost && !isReverse) {
                // Found a cheaper edge!
                if (currentEdge) currentEdge.status = "visiting"; // Candidate edge
                record();

                v.minCost = edge_ref.weight;
                v.parentEdge = currentEdge; 
                v.status = "candidate"; // Mark as a strong candidate
                pq.enqueue(v, v.minCost);

                if (currentEdge) currentEdge.status = "processed"; // Edge added to PQ
                record();
            } else if (v.status !== "visited" && !isReverse) {
                 // Checked but not cheaper
                 if (currentEdge) currentEdge.status = "rejected"; 
                 record();
                 if (currentEdge) currentEdge.status = "processed"; 
            }
        }
        
        record(); // Final state after processing U
    }
    
    return steps;
}

export const primsCode = `
function Prims(startNode) {
  const pq = new PriorityQueue();
  startNode.minCost = 0;
  pq.enqueue(startNode, 0);

  while (!pq.isEmpty()) {
    const u = pq.dequeue();
    if (u.status === 'visited') continue;
    
    u.status = 'current';
    // Record step (Current node u selected)

    if (u.parentEdge) {
      u.parentEdge.status = 'mst'; 
      // Record step (Edge is added to MST)
    }
    u.status = 'visited';
    
    for (const { node: v, edge } of u.adj) {
      if (v.status !== 'visited' && edge.weight < v.minCost) {
        edge.status = 'visiting';
        // Record step (Found a better edge)

        v.minCost = edge.weight;
        v.parentEdge = edge;
        v.status = 'candidate';
        pq.enqueue(v, v.minCost);
        
        edge.status = 'processed';
      } else if (v.status !== 'visited') {
        edge.status = 'rejected';
        // Record step (Edge not better, rejected)
        edge.status = 'processed';
      }
    }
  }
}
`;