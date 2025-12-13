// src/algorithms/dijkstra.js

import { generateGraphFromInput } from "../utils/generateGraphFromInput.js";

// Reusing the PriorityQueue from Prims
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
 * Implements Dijkstra's Algorithm and generates visualization steps.
 */
export function dijkstra(nodesArray, edgesString, startNodeValue) {
    const steps = [];
    const { graphMap } = generateGraphFromInput(nodesArray, edgesString);

    const nodes = Object.values(graphMap).map(n => ({
        ...n,
        dist: Infinity,
        prev: null,
        status: "unvisited",
    }));

    const edges = generateGraphFromInput(nodesArray, edgesString).edges.map(e => ({ ...e }));

    const startNode = nodes.find(n => n.value === startNodeValue);
    if (!startNode) return [];

    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    function record(line = null) {
        const pathEdges = new Set();
        nodes.forEach(n => {
            if (n.prev) pathEdges.add(`${n.prev.id}-${n.id}`);
        });

        const stepEdges = edges.map(e => ({
            ...e,
            status: pathEdges.has(`${e.from}-${e.to}`)
                ? "shortestPath"
                : e.status,
        }));

        steps.push({
            bars: nodesArray,
            nodes: nodes.map(n => ({ ...n })),
            edges: stepEdges,
            root: null,
            line,
        });
    }

    // --- Dijkstra's Implementation (with line numbers) ---

    const pq = new PriorityQueue();          // line 3
record(3);

startNode.dist = 0;                      // line 4
record(4);

pq.enqueue(startNode, 0);                // line 5
record(5);

while (!pq.isEmpty()) {                  // line 7
    record(7);

    const { element: u } = pq.dequeue(); // line 8
    record(8);

    const currentU = nodeMap.get(u.id);

    if (currentU.status === "visited") { // line 9
        record(9);
        continue;
    }

    currentU.status = "visited";         // line 11
    record(11);

    const adjList = graphMap[u.value].adj;

    for (const { node: v_ref, edge: edge_ref } of adjList) { // line 13
        record(13);

        const v = nodeMap.get(v_ref.id);
        const currentEdge = edges.find(e => e.id === edge_ref.id);

        if (currentU.dist + edge_ref.weight < v.dist) { // line 14
            record(14);

            if (currentEdge) currentEdge.status = "visiting"; // line 16
            record(15);

            v.dist = currentU.dist + edge_ref.weight; // line 18
            record(17);

            v.prev = currentU;                        // line 19
            record(18);

            v.status = "candidate";                   // line 20
            record(19);

            pq.enqueue(v, v.dist);                    // line 21
            record(20);

            if (currentEdge) currentEdge.status = "processed"; // line 23
            record(22);
        } else {
            if (currentEdge) currentEdge.status = "rejected";  // line 25
            record(24);

            if (currentEdge) currentEdge.status = "processed"; // line 26
            record(25);
        }
    }
}



    return steps;
}

export const dijkstraCode = `
function Dijkstras(startNode) {
  const pq = new PriorityQueue();
  startNode.dist = 0;
  pq.enqueue(startNode, 0);

  while (!pq.isEmpty()) {
    const u = pq.dequeue();
    if (u.status === 'visited') continue;
    
    u.status = 'visited'; // Distance finalized

    for (const { node: v, edge } of u.adj) {
      if (u.dist + edge.weight < v.dist) {
        edge.status = 'visiting';
        
        v.dist = u.dist + edge.weight;
        v.prev = u;
        v.status = 'candidate';
        pq.enqueue(v, v.dist);
        
        edge.status = 'processed';
      } else {
        edge.status = 'rejected';
        edge.status = 'processed';
      }
    }
  }
}
`;
