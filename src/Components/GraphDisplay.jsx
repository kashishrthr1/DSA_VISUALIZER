// src/components/GraphDisplay.jsx
import React from "react";
// import "../GraphDisplay.css"; // Optional styling file

export default function GraphDisplay({ graphState, selectedAlgorithm }) {
    const nodes = graphState.nodes || [];
    const edges = graphState.edges || [];
    
    // --- Dynamic Scaling and Positioning ---
    const CONTAINER_WIDTH = 1000; // Estimated max width of the display area
    const CONTAINER_HEIGHT = 500; // Estimated max height of the display area

    // 1. Calculate max/min coordinates from algorithm steps
    const allX = nodes.map(n => n.x).filter(x => x !== undefined);
    const allY = nodes.map(n => n.y).filter(y => y !== undefined);

    const minX = Math.min(...allX, 0);
    const maxX = Math.max(...allX, CONTAINER_WIDTH);
    const minY = Math.min(...allY, 0);
    const maxY = Math.max(...allY, CONTAINER_HEIGHT);

    const dataWidth = maxX - minX;
    const dataHeight = maxY - minY;

    // 2. Determine Scale Factor (to fit data into the container)
    // Add padding (e.g., 80px) to prevent nodes from hitting the edge
    const scaleX = (CONTAINER_WIDTH - 80) / dataWidth;
    const scaleY = (CONTAINER_HEIGHT - 80) / dataHeight;
    const scale = Math.min(scaleX, scaleY, 1); // Never upscale, max scale is 1

    // 3. Define a robust function to get scaled coordinates
    const getNodePos = (nodeId) => {
        const node = nodes.find(n => String(n.id) === String(nodeId)); 
        if (!node) return { x: 0, y: 0, status: 'unprocessed', value: '?' };

        // Apply Scaling and Centering offset
        const scaledX = ((node.x - minX) * scale) + 40; // 40px left padding
        const scaledY = ((node.y - minY) * scale) + 40; // 40px top padding
        
        return {
            x: scaledX,
            y: scaledY,
            status: node.status || 'unprocessed',
            value: node.value,
        };
    };

    // --- Styling Functions (Simplified for reliability) ---

    const isWeighted = ["Dijkstra's", "Kruskal's", "Prim's"].some(a => selectedAlgorithm.includes(a));
    const isDirected = selectedAlgorithm.includes("Dijkstra's"); 

    const getEdgeColor = (status) => {
        switch (status) {
            case 'current': return '#FF6B6B';
            case 'processed':
            case 'mst': 
            case 'shortestPath': return '#0070F3';
            case 'visiting': return '#ffb86b';
            case 'rejected': return '#C23616';
            default: return 'gray';
        }
    };

    const getNodeFillColor = (status) => {
        switch (status) {
            case 'visited':
            case 'final': return '#22C55E';
            case 'visiting':
            case 'current': return '#ffb86b';
            case 'start': return '#FF00FF';
            default: return 'white';
        }
    };

    // --- Render Component ---

    return (
        <div className="w-full h-full border border-black rounded-xl p-4 bg-gray-100 shadow flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-gray-800">{selectedAlgorithm}</h3>
            <div 
                className="flex-grow relative border border-dashed border-gray-400 rounded-lg overflow-hidden" 
                // Set fixed dimensions for the SVG container using estimates
                style={{ height: CONTAINER_HEIGHT + 'px', width: CONTAINER_WIDTH + 'px' }} 
            >
                {nodes.length > 0 ? (
                    <svg width="100%" height="100%">
                        {/* Define Arrow Marker for Directed Edges */}
                        {isDirected && (
                            <defs>
                                <marker 
                                    id="arrow" 
                                    viewBox="0 0 10 10" 
                                    refX="25" refY="5" 
                                    markerWidth="6" 
                                    markerHeight="6" 
                                    orient="auto-start-reverse"
                                >
                                    <path d="M 0 0 L 10 5 L 0 10 z" fill="gray" />
                                </marker>
                            </defs>
                        )}

                        {/* Render Edges first */}
                        {edges.map(edge => {
                            const p1 = getNodePos(edge.from);
                            const p2 = getNodePos(edge.to);
                            const strokeColor = getEdgeColor(edge.status);
                            
                            // Check if coordinates are valid before drawing the line
                            if (p1.x === 0 && p1.y === 0 && p2.x === 0 && p2.y === 0) return null;

                            const midX = (p1.x + p2.x) / 2;
                            const midY = (p1.y + p2.y) / 2;

                            return (
                                <React.Fragment key={edge.id}>
                                    <line 
                                        x1={p1.x}
                                        y1={p1.y}
                                        x2={p2.x}
                                        y2={p2.y}
                                        stroke={strokeColor}
                                        strokeWidth={edge.status === 'mst' || edge.status === 'shortestPath' ? "3" : "2"}
                                        markerEnd={isDirected ? "url(#arrow)" : ""}
                                        strokeDasharray={edge.status === 'rejected' ? "5, 5" : "none"}
                                    />
                                    
                                    {/* Render Weight Label */}
                                    {isWeighted && edge.weight !== undefined && (
                                        <text
                                            x={midX}
                                            y={midY - 5}
                                            textAnchor="middle"
                                            fontSize="11"
                                            fill="#4A4A4A"
                                            style={{ filter: "drop-shadow(0 0 1px white) drop-shadow(0 0 1px white)" }}
                                        >
                                            {edge.weight}
                                        </text>
                                    )}
                                </React.Fragment>
                            );
                        })}
                        
                        {/* Render Nodes (on top of edges) */}
                        {nodes.map(node => {
                            const pos = getNodePos(node.id);
                            return (
                                <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`}>
                                    <circle 
                                        r="15" 
                                        fill={getNodeFillColor(node.status)} 
                                        stroke="black"
                                        strokeWidth="2"
                                    />
                                    {/* Node Value Label */}
                                    <text 
                                        textAnchor="middle" 
                                        dy=".3em" 
                                        fontSize="12" 
                                        fill="black"
                                    >
                                        {node.value}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        <p>Enter node values (e.g., 1, 2, 3) and click Generate/Play to start the visualization. </p>
                    </div>
                )}
            </div>
            <p className="text-sm mt-2 text-gray-600">
                Nodes: {nodes.length}, Edges: {edges.length}. (Visualization is scaled to fit the container.)
            </p>
        </div>
    );
}