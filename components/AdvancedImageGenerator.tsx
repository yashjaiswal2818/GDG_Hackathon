"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ImageCanvas from './ImageCanvas';
import { 
  Image, 
  Upload, 
  Download, 
  Trash2,
  Sparkles
} from "lucide-react";

interface GeneratedImage {
    id: string;
    prompt: string;
    imageUrl: string;
    timestamp: Date;
    variants?: GeneratedImage[];
    parentId?: string;
}

interface AdvancedImageGeneratorProps {
    startupIdea: string;
}

export default function AdvancedImageGenerator({ startupIdea }: AdvancedImageGeneratorProps) {
    const [prompt, setPrompt] = useState('');
    const [referenceImages, setReferenceImages] = useState<File[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [lastEnhancedPrompt, setLastEnhancedPrompt] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Generate image with Gemini
    const generateImage = async () => {
        if (!prompt.trim()) return;

        setIsGenerating(true);
        try {
            const response = await fetch('/api/startup-agent/image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idea: startupIdea,
                    prompt: prompt,
                    referenceImages: referenceImages.map(file => file.name)
                })
            });

            const data = await response.json();

        if (data.imagePrompts && data.imagePrompts[0]) {
        const imageData = data.imagePrompts[0];
        
        // Show the enhanced prompt
        console.log('Enhanced prompt generated:', imageData.revisedPrompt);
        setLastEnhancedPrompt(imageData.revisedPrompt);
      }
        } catch (error) {
            console.error('Error generating image:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    // Edit image with conversational prompts
    const editImage = async () => {
        if (!selectedImage || !editPrompt.trim()) return;

        setIsGenerating(true);
        try {
            const response = await fetch('/api/startup-agent/image/edit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    originalImage: selectedImage.imageUrl,
                    editPrompt: editPrompt,
                    maskData: maskData
                })
            });

            const data = await response.json();

            if (data.editedImage) {
                const editedImage: GeneratedImage = {
                    id: Date.now().toString(),
                    prompt: `${selectedImage.prompt} + ${editPrompt}`,
                    imageUrl: data.editedImage,
                    timestamp: new Date(),
                    parentId: selectedImage.id
                };

                setGeneratedImages(prev => [editedImage, ...prev]);
                setSelectedImage(editedImage);
                setEditPrompt('');
                setMaskData(null);
            }
        } catch (error) {
            console.error('Error editing image:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    // Handle reference image upload
    const handleReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setReferenceImages(prev => [...prev, ...files].slice(0, 2)); // Max 2 reference images
    };


    // Download image
    const downloadImage = (image: GeneratedImage) => {
        const link = document.createElement('a');
        link.href = image.imageUrl;
        link.download = `generated-image-${image.id}.png`;
        link.click();
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Advanced Image Generator</h2>
                    <p className="text-gray-300">Create and edit images with AI-powered tools</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel - Controls */}
                <div className="space-y-6">
                    {/* Generation Panel */}
                        <Card className="bg-white/10 border-white/20">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Image className="w-5 h-5" />
                                    Generate Image
                                </CardTitle>
                                <CardDescription className="text-gray-300">
                                    Create images from text descriptions
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                                        Image Prompt
                                    </label>
                                    <Textarea
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        placeholder="Describe the image you want to generate..."
                                        className="min-h-[100px] bg-white/5 border-white/20 text-white placeholder-gray-400"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                                        Reference Images (Optional)
                                    </label>
                                    <div className="space-y-2">
                                        {referenceImages.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded border border-white/20">
                                                <span className="text-sm text-gray-300">{file.name}</span>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setReferenceImages(prev => prev.filter((_, i) => i !== index))}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        {referenceImages.length < 2 && (
                                            <Button
                                                variant="outline"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="w-full"
                                            >
                                                <Upload className="w-4 h-4 mr-2" />
                                                Upload Reference
                                            </Button>
                                        )}
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleReferenceUpload}
                                        className="hidden"
                                    />
                                </div>

                                <Button
                                    onClick={generateImage}
                                    disabled={isGenerating || !prompt.trim()}
                                    className="w-full"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Image className="w-4 h-4 mr-2" />
                                            Generate Image
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>

                </div>

                {/* Center Panel - Enhanced Prompt Display */}
                <div className="lg:col-span-2">
                    {lastEnhancedPrompt ? (
                        <Card className="bg-white/10 border-white/20">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-yellow-400" />
                                    Enhanced Prompt Generated
                                </CardTitle>
                                <CardDescription className="text-gray-300">
                                    Use this enhanced prompt with any AI image generator for better results
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-white/5 rounded-lg p-6 border border-white/20">
                                    <p className="text-gray-300 leading-relaxed text-lg">{lastEnhancedPrompt}</p>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <Button
                                        variant="default"
                                        size="lg"
                                        onClick={() => {
                                            navigator.clipboard.writeText(lastEnhancedPrompt);
                                            // You could add a toast notification here
                                        }}
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Copy Prompt
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => setLastEnhancedPrompt(null)}
                                    >
                                        Generate New
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="bg-white/10 border-white/20">
                            <CardContent className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-400 opacity-50" />
                                    <p className="text-gray-400 text-lg">Ready to generate enhanced prompts</p>
                                    <p className="text-sm text-gray-500">Enter a description and click Generate</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
