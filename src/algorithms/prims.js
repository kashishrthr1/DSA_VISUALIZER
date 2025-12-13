// src/algorithms/prims.js

import { generateGraphFromInput } from "../utils/generateGraphFromInput.js";

// Simple Priority Queue implementation for demonstration
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    enqueue(element, priority) {
        this.items.push({ element, priority });
        this.items.sort((a, b) => a.priority - b.priority);
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
 */
export function prims(nodesArray, edgesString, startNodeValue) {
    const steps = [];
    const { graphMap } = generateGraphFromInput(nodesArray, edgesString);

    const nodes = Object.values(graphMap).map(n => ({
        ...n,
        minCost: Infinity,
        parentEdge: null,
        status: "unvisited",
    }));

    const edges = generateGraphFromInput(nodesArray, edgesString).edges.map(e => ({ ...e }));

    const startNode = nodes.find(n => n.value === startNodeValue);
    if (!startNode) return [];

    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    function record(line = null) {
        steps.push({
            bars: nodesArray,
            nodes: nodes.map(n => ({ ...n })),
            edges: edges.map(e => ({ ...e })),
            root: null,
            line,
        });
    }

    // --- Prim's Implementation (with line numbers) ---

    const pq = new PriorityQueue();          // line 3
    record(3);

    startNode.minCost = 0;                  // line 4
    record(4);

    pq.enqueue(startNode, 0);               // line 5
    record(5);

    while (!pq.isEmpty()) {                 // line 7
        record(7);

        const { element: u } = pq.dequeue(); // line 8
        record(8);

        const currentU = nodeMap.get(u.id);

        if (currentU.status === "visited") { // line 9
            record(9);
            continue;
        }

        currentU.status = "current";        // line 11
        record(11);

        if (currentU.parentEdge) {          // line 13
            record(13);

            const mstEdge = edges.find(e => e.id === currentU.parentEdge.id);
            if (mstEdge) mstEdge.status = "mst"; // line 14
            record(14);
        }

        currentU.status = "visited";        // line 16
        record(16);

        const adjList = graphMap[u.value].adj;

        for (const { node: v_ref, edge: edge_ref } of adjList) { // line 18
            record(18);

            const v = nodeMap.get(v_ref.id);
            const currentEdge = edges.find(e => e.id === edge_ref.id);
            const isReverse = edge_ref.id.endsWith("-r");

            if (v.status !== "visited" && edge_ref.weight < v.minCost && !isReverse) { // line 19
                record(19);

                if (currentEdge) currentEdge.status = "visiting"; // line 20
                record(20);

                v.minCost = edge_ref.weight; // line 22
                record(22);

                v.parentEdge = currentEdge;  // line 23
                record(23);

                v.status = "candidate";      // line 24
                record(24);

                pq.enqueue(v, v.minCost);    // line 25
                record(25);

                if (currentEdge) currentEdge.status = "processed"; // line 27
                record(27);
            } else if (v.status !== "visited" && !isReverse) { // line 28
                record(28);

                if (currentEdge) currentEdge.status = "rejected"; // line 29
                record(29);

                if (currentEdge) currentEdge.status = "processed"; // line 30
                record(30);
            }
        }
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

    if (u.parentEdge) {
      u.parentEdge.status = 'mst'; 
    }
    u.status = 'visited';
    
    for (const { node: v, edge } of u.adj) {
      if (v.status !== 'visited' && edge.weight < v.minCost) {
        edge.status = 'visiting';

        v.minCost = edge.weight;
        v.parentEdge = edge;
        v.status = 'candidate';
        pq.enqueue(v, v.minCost);
        
        edge.status = 'processed';
      } else if (v.status !== 'visited') {
        edge.status = 'rejected';
        edge.status = 'processed';
      }
    }
  }
}
`;
