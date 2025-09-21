"use client";

import { useEffect, useRef } from "react";

interface MindMapData {
    nodes: Array<{
        id: string;
        label: string;
        level: number;
    }>;
    edges: Array<{
        source: string;
        target: string;
    }>;
}

interface MindMapGeneratorProps {
    data: MindMapData;
}

const MindMapGenerator = ({ data }: MindMapGeneratorProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !data) return;

        const svg = svgRef.current;
        const width = 800;
        const height = 600;

        // Clear previous content
        svg.innerHTML = "";

        // Set up SVG
        svg.setAttribute("width", width.toString());
        svg.setAttribute("height", height.toString());
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

        // Create a group for the mind map
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("transform", "translate(50, 50)");

        // Calculate positions for nodes
        const nodePositions: { [key: string]: { x: number; y: number } } = {};
        const levelNodes: { [key: number]: string[] } = {};

        // Group nodes by level
        data.nodes.forEach(node => {
            if (!levelNodes[node.level]) {
                levelNodes[node.level] = [];
            }
            levelNodes[node.level].push(node.id);
        });

        // Position nodes
        Object.keys(levelNodes).forEach(levelStr => {
            const level = parseInt(levelStr);
            const nodes = levelNodes[level];
            const ySpacing = height / (nodes.length + 1);

            nodes.forEach((nodeId, index) => {
                const x = level * 200 + 100;
                const y = (index + 1) * ySpacing;
                nodePositions[nodeId] = { x, y };
            });
        });

        // Draw edges first (so they appear behind nodes)
        data.edges.forEach(edge => {
            const sourcePos = nodePositions[edge.source];
            const targetPos = nodePositions[edge.target];

            if (sourcePos && targetPos) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", sourcePos.x.toString());
                line.setAttribute("y1", sourcePos.y.toString());
                line.setAttribute("x2", targetPos.x.toString());
                line.setAttribute("y2", targetPos.y.toString());
                line.setAttribute("stroke", "#64748b");
                line.setAttribute("stroke-width", "2");
                line.setAttribute("opacity", "0.6");
                group.appendChild(line);
            }
        });

        // Draw nodes
        data.nodes.forEach(node => {
            const pos = nodePositions[node.id];
            if (!pos) return;

            // Create node circle
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", pos.x.toString());
            circle.setAttribute("cy", pos.y.toString());
            circle.setAttribute("r", "30");

            // Color based on level
            const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];
            const color = colors[node.level % colors.length];
            circle.setAttribute("fill", color);
            circle.setAttribute("stroke", "#ffffff");
            circle.setAttribute("stroke-width", "2");
            circle.setAttribute("opacity", "0.9");

            group.appendChild(circle);

            // Create text
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", pos.x.toString());
            text.setAttribute("y", pos.y.toString());
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("fill", "#ffffff");
            text.setAttribute("font-size", "12");
            text.setAttribute("font-weight", "bold");
            text.setAttribute("font-family", "system-ui, sans-serif");

            // Truncate long labels
            const label = node.label.length > 15 ? node.label.substring(0, 15) + "..." : node.label;
            text.textContent = label;

            group.appendChild(text);
        });

        svg.appendChild(group);
    }, [data]);

    return (
        <div className="w-full bg-card/30 rounded-lg p-4 border border-border/50">
            <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Generated Mind Map</h3>
                <p className="text-sm text-muted-foreground">
                    Visual representation of your PDF content structure
                </p>
            </div>

            <div className="flex justify-center">
                <svg
                    ref={svgRef}
                    className="border border-border/30 rounded-lg bg-background/50"
                />
            </div>

            <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                    {data.nodes.length} concepts • {data.edges.length} connections
                </p>
            </div>
        </div>
    );
};

export default MindMapGenerator;

