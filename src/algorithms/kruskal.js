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
            return true;
        }
        return false;
    }
}

/**
 * Implements Kruskal's Algorithm and generates visualization steps.
 */
export function kruskal(nodesArray, edgesString) {
    const steps = [];
    const { nodes: initialNodes, edges: initialEdges } =
        generateGraphFromInput(nodesArray, edgesString);

    const nodes = initialNodes.map(n => ({ ...n, status: "unvisited" }));
    const edges = initialEdges.map(e => ({ ...e }));

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

    // --- Kruskal's Implementation (with line numbers) ---

    const uniqueEdges = edges
        .filter(e => !e.id.endsWith("-r"))
        .sort((a, b) => a.weight - b.weight); // line 3
    record(3);

    const dsu = new DSU(nodes);              // line 4
    record(4);

    // Initial state
    record();

    for (const edge of uniqueEdges) {        // line 7
        record(7);

        const u = edge.from;                 // line 8
        record(8);

        const v = edge.to;                   // line 9
        record(9);

        const forwardEdge = edges.find(e => e.id === edge.id);
        const reverseEdge = edges.find(
            e => e.id === `${v}-${u}-${edge.id.split("-").pop()}-r`
        );

        if (forwardEdge) forwardEdge.status = "current";
        if (reverseEdge) reverseEdge.status = "current";
        nodeMap.get(u).status = "current";
        nodeMap.get(v).status = "current";   // line 11
        record(11);

        if (dsu.find(u) !== dsu.find(v)) {   // line 13
            record(13);

            dsu.union(u, v);                 // line 14
            record(14);

            if (forwardEdge) forwardEdge.status = "mst";
            if (reverseEdge) reverseEdge.status = "mst"; // line 16
            record(16);
        } else {
            if (forwardEdge) forwardEdge.status = "rejected";
            if (reverseEdge) reverseEdge.status = "rejected"; // line 18
            record(18);
        }

        nodeMap.get(u).status = "visited";
        nodeMap.get(v).status = "visited";

        if (forwardEdge)
            forwardEdge.status =
                forwardEdge.status === "mst" ? "mst" : "processed";
        if (reverseEdge)
            reverseEdge.status =
                reverseEdge.status === "mst" ? "mst" : "processed"; // line 20
        record(20);
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

    if (dsu.find(u) !== dsu.find(v)) {
      dsu.union(u, v);
      mst.push(edge);
      edge.status = 'mst';
    } else {
      edge.status = 'rejected';
    }
    edge.status = 'processed';
  }
  return mst;
}
`;
