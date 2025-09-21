"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdvancedImageGenerator from '@/components/AdvancedImageGenerator';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles, Image, Edit3, Brush, History } from "lucide-react";

export default function AdvancedImageGeneratorPage() {
    const router = useRouter();
    const [startupIdea, setStartupIdea] = useState('');

    const handleStartGeneration = () => {
        if (!startupIdea.trim()) return;
        // The AdvancedImageGenerator component will handle the rest
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="p-6">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="text-white hover:bg-white/10 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                </div>

                {/* Hero Section */}
                <div className="text-center px-6 mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="w-8 h-8 text-purple-400" />
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            Advanced Image Generator
                        </h1>
                        <Sparkles className="w-8 h-8 text-pink-400" />
                    </div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Create, edit, and refine images with AI-powered tools. Generate professional visuals for your startup with advanced editing capabilities.
                    </p>

                    {/* Notice */}
                    <div className="max-w-4xl mx-auto mb-6">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <h4 className="font-semibold text-yellow-800">Image Generation Notice</h4>
                            </div>
                            <p className="text-sm text-yellow-700">
                                Currently, actual image generation is unavailable due to API limitations. However, you can still use the advanced interface to create detailed, professional prompts that work excellently with any AI image generator like Midjourney, DALL-E, or Stable Diffusion.
                            </p>
                        </div>
                    </div>

                    {/* Startup Idea Input */}
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="flex gap-4">
                            <Input
                                value={startupIdea}
                                onChange={(e) => setStartupIdea(e.target.value)}
                                placeholder="Enter your startup idea to get started..."
                                className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
                            />
                            <Button
                                onClick={handleStartGeneration}
                                disabled={!startupIdea.trim()}
                                className="px-8"
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Start Creating
                            </Button>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <Image className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-white mb-2">Generate</h3>
                            <p className="text-sm text-gray-300">Create images from text descriptions with reference image support</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <Edit3 className="w-8 h-8 text-green-400 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-white mb-2">Edit</h3>
                            <p className="text-sm text-gray-300">Modify images using natural language instructions</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <Brush className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-white mb-2">Select</h3>
                            <p className="text-sm text-gray-300">Paint masks to target specific areas for editing</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <History className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-white mb-2">History</h3>
                            <p className="text-sm text-gray-300">Track all your creations and compare variants</p>
                        </div>
                    </div>
                </div>

                {/* Advanced Image Generator Component */}
                {startupIdea.trim() && (
                    <AdvancedImageGenerator startupIdea={startupIdea} />
                )}

                {/* Instructions */}
                {!startupIdea.trim() && (
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">How to Use</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Image className="w-5 h-5 text-blue-400" />
                                        Generation Mode
                                    </h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li>• Enter a detailed description of your desired image</li>
                                        <li>• Upload up to 2 reference images for style guidance</li>
                                        <li>• Click Generate to create an enhanced prompt</li>
                                        <li>• Copy the enhanced prompt for use with any AI image generator</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Edit3 className="w-5 h-5 text-green-400" />
                                        Editing Mode
                                    </h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li>• Select an image from your history</li>
                                        <li>• Describe the changes you want to make</li>
                                        <li>• Use natural language like "make it more colorful"</li>
                                        <li>• Get enhanced editing prompts for any AI image editor</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Brush className="w-5 h-5 text-purple-400" />
                                        Selection Mode
                                    </h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li>• Paint masks on specific areas of the image</li>
                                        <li>• Adjust brush size for precise selection</li>
                                        <li>• Target only the areas you want to edit</li>
                                        <li>• Combine with editing mode for precise control</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <History className="w-5 h-5 text-orange-400" />
                                        History & Variants
                                    </h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li>• View all your generated and edited images</li>
                                        <li>• Compare different versions side-by-side</li>
                                        <li>• Download high-quality PNG files</li>
                                        <li>• Track the evolution of your designs</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
