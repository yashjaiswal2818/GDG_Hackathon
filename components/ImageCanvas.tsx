"use client";

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Line } from 'react-konva';
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Move, Brush, Eraser } from "lucide-react";

interface ImageCanvasProps {
    imageUrl: string;
    mode: 'generate' | 'edit' | 'select';
    brushSize: number;
    onMaskChange: (maskData: string | null) => void;
}

export default function ImageCanvas({ imageUrl, mode, brushSize, onMaskChange }: ImageCanvasProps) {
    const stageRef = useRef<any>(null);
    const imageRef = useRef<any>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [lines, setLines] = useState<any[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Load image
    useEffect(() => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            setImage(img);
        };
        img.src = imageUrl;
    }, [imageUrl]);

    // Handle drawing
    const handleMouseDown = useCallback((e: any) => {
        if (mode !== 'select') return;

        setIsDrawing(true);
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    }, [mode, lines, tool]);

    const handleMouseMove = useCallback((e: any) => {
        if (!isDrawing || mode !== 'select') return;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();

        const lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        setLines([...lines.slice(0, -1), lastLine]);
    }, [isDrawing, mode, lines]);

    const handleMouseUp = useCallback(() => {
        setIsDrawing(false);
        // Convert lines to mask data
        if (lines.length > 0) {
            const stage = stageRef.current;
            if (stage) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    canvas.width = stage.width();
                    canvas.height = stage.height();

                    lines.forEach((line) => {
                        ctx.strokeStyle = line.tool === 'brush' ? 'white' : 'black';
                        ctx.lineWidth = brushSize;
                        ctx.lineCap = 'round';
                        ctx.lineJoin = 'round';

                        ctx.beginPath();
                        ctx.moveTo(line.points[0], line.points[1]);
                        for (let i = 2; i < line.points.length; i += 2) {
                            ctx.lineTo(line.points[i], line.points[i + 1]);
                        }
                        ctx.stroke();
                    });

                    const maskData = canvas.toDataURL();
                    onMaskChange(maskData);
                }
            }
        }
    }, [isDrawing, lines, brushSize, onMaskChange]);

    // Zoom functions
    const handleZoomIn = () => {
        setScale(prev => Math.min(prev * 1.2, 3));
    };

    const handleZoomOut = () => {
        setScale(prev => Math.max(prev / 1.2, 0.5));
    };

    const handleReset = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
        setLines([]);
        onMaskChange(null);
    };

    // Pan functionality
    const handleDragEnd = (e: any) => {
        setPosition({
            x: e.target.x(),
            y: e.target.y(),
        });
    };

    return (
        <div className="space-y-4">
            {/* Canvas Controls */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleZoomOut}>
                        <ZoomOut className="w-4 h-4" />
                    </Button>
                    <span className="text-sm text-gray-300 min-w-[60px] text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <Button variant="outline" size="sm" onClick={handleZoomIn}>
                        <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>

                {mode === 'select' && (
                    <div className="flex items-center gap-2">
                        <Button
                            variant={tool === 'brush' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTool('brush')}
                        >
                            <Brush className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={tool === 'eraser' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTool('eraser')}
                        >
                            <Eraser className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>

            {/* Canvas */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-white/20">
                <Stage
                    width={800}
                    height={600}
                    ref={stageRef}
                    onMouseDown={handleMouseDown}
                    onMousemove={handleMouseMove}
                    onMouseup={handleMouseUp}
                    scaleX={scale}
                    scaleY={scale}
                    x={position.x}
                    y={position.y}
                    draggable={mode !== 'select'}
                    onDragEnd={handleDragEnd}
                >
                    <Layer>
                        {image && (
                            <KonvaImage
                                ref={imageRef}
                                image={image}
                                width={800}
                                height={600}
                                draggable={false}
                            />
                        )}
                    </Layer>

                    {mode === 'select' && (
                        <Layer>
                            {lines.map((line, i) => (
                                <Line
                                    key={i}
                                    points={line.points}
                                    stroke={line.tool === 'brush' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}
                                    strokeWidth={brushSize}
                                    tension={0.5}
                                    lineCap="round"
                                    lineJoin="round"
                                    globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                                />
                            ))}
                        </Layer>
                    )}
                </Stage>

                {/* Instructions */}
                {mode === 'select' && (
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
                        <p>Paint with <Brush className="w-4 h-4 inline mx-1" /> to select areas</p>
                        <p>Use <Eraser className="w-4 h-4 inline mx-1" /> to remove selections</p>
                    </div>
                )}
            </div>
        </div>
    );
}

