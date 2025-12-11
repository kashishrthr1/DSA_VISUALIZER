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
 * @param {number[]} nodesArray - Array of node values.
 * @param {string} edgesString - String of edges (u-v:w).
 * @param {number} startNodeValue - The value of the starting node.
 * @returns {Object[]} An array of visualization steps.
 */
export function dijkstra(nodesArray, edgesString, startNodeValue) {
    const steps = [];
    const { graphMap } = generateGraphFromInput(nodesArray, edgesString);
    
    // Mutable copies (dist stores the shortest distance found so far)
    const nodes = Object.values(graphMap).map(n => ({ ...n, dist: Infinity, prev: null }));
    const edges = generateGraphFromInput(nodesArray, edgesString).edges.map(e => ({ ...e }));

    const startNode = nodes.find(n => n.value === startNodeValue);
    if (!startNode) return [];

    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    function record() {
        // Highlight shortest path edges based on the 'prev' pointer
        const pathEdges = new Set();
        nodes.forEach(n => {
            if (n.prev) {
                const edgeKey = `${n.prev.id}-${n.id}`;
                pathEdges.add(edgeKey);
            }
        });

        // Update status for edges on the shortest path tree
        const stepEdges = edges.map(e => {
            const isPathEdge = pathEdges.has(`${e.from}-${e.to}`);
            return {
                ...e,
                status: isPathEdge ? 'shortestPath' : (e.status === 'shortestPath' ? 'shortestPath' : e.status)
            };
        });
        
        const step = {
            bars: nodesArray, 
            nodes: nodes.map(n => ({ ...n })),
            edges: stepEdges, // Use stepEdges to reflect shortest path
            root: null,
        };
        steps.push(step);
    }

    // --- Dijkstra's Implementation ---

    const pq = new PriorityQueue();
    
    startNode.dist = 0;
    pq.enqueue(startNode, 0);
    startNode.status = "start";
    record();
    startNode.status = "unvisited";

    while (!pq.isEmpty()) {
        const { element: u, priority: currentDist } = pq.dequeue();
        
        const currentU = nodeMap.get(u.id);

        if (currentU.status === "visited") continue;

        currentU.status = "current";
        record();

        // Mark as visited (distance finalized)
        currentU.status = "visited";

        // Examine adjacent edges (using graphMap)
        const adjList = graphMap[u.value].adj;

        for (const { node: v_ref, edge: edge_ref } of adjList) {
            const v = nodeMap.get(v_ref.id);
            const currentEdge = edges.find(e => e.id === edge_ref.id);
            
            if (currentU.dist + edge_ref.weight < v.dist) {
                // Relaxation: Found a shorter path!
                if (currentEdge) currentEdge.status = "visiting";
                record();

                v.dist = currentU.dist + edge_ref.weight;
                v.prev = currentU; // Update parent pointer for shortest path tracing
                v.status = "candidate"; // Mark as having a new, better distance
                pq.enqueue(v, v.dist);
                
                if (currentEdge) currentEdge.status = "processed";
                record();
            } else if (currentEdge) {
                // Not a shorter path
                currentEdge.status = "rejected";
                record();
                currentEdge.status = "processed";
            }
        }
        
        record(); // Final state after processing U
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
    // Record step (Node u finalized)

    for (const { node: v, edge } of u.adj) {
      if (u.dist + edge.weight < v.dist) {
        // Relaxation: Found a shorter path
        edge.status = 'visiting';
        // Record step (Edge u->v is active)
        
        v.dist = u.dist + edge.weight;
        v.prev = u;
        v.status = 'candidate';
        pq.enqueue(v, v.dist);
        
        edge.status = 'processed';
      } else {
        edge.status = 'rejected';
        // Record step (Path not shorter, rejected)
        edge.status = 'processed';
      }
    }
  }
}
`;