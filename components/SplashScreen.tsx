"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface SplashScreenProps {
    onGetStarted?: () => void;
}

const SplashScreen = ({ onGetStarted }: SplashScreenProps) => {
    const [currentFeature, setCurrentFeature] = useState(0);
    const router = useRouter();

    const features = [
        {
            icon: "/icons/mic-on.svg",
            title: "AI Companions",
            description: "Interactive AI mentors for personalized learning across 10+ subjects with voice conversations."
        },
        {
            icon: "/icons/cap.svg",
            title: "TalkToPDF",
            description: "Upload PDFs, ask questions, and generate mind maps with advanced AI analysis."
        },
        {
            icon: "/icons/coding.svg",
            title: "Startup Agent",
            description: "7 specialized AI agents create complete startup packages including market research and financial projections."
        },
        {
            icon: "/icons/check.svg",
            title: "Image Generator",
            description: "Advanced AI image generation with editing capabilities and professional prompt enhancement."
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [features.length]);

    const handleGetStarted = () => {
        if (onGetStarted) {
            onGetStarted();
        } else {
            router.push("/");
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-blue-600/5 to-blue-800/10"></div>
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-10 w-24 h-24 bg-blue-800/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Logo and Title */}
                <div className="mb-12">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <Image
                            src="/images/logo.svg"
                            alt="MentorAI Logo"
                            width={60}
                            height={56}
                            className="floating-animation"
                        />
                        <h1 className="text-6xl font-bold gradient-text">MentorAI</h1>
                    </div>
                    <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
                        Your comprehensive AI platform for learning, startup development, and creative content generation
                    </p>
                </div>

                {/* Features Showcase */}
                <div className="mb-16">
                    <div className="bg-card/30 backdrop-blur-xl rounded-3xl p-8 border border-border/50 shadow-2xl">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Feature Display */}
                            <div className="text-left">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl flex items-center justify-center">
                                        <Image
                                            src={features[currentFeature].icon}
                                            alt={features[currentFeature].title}
                                            width={32}
                                            height={32}
                                            className="text-white"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">
                                        {features[currentFeature].title}
                                    </h3>
                                </div>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {features[currentFeature].description}
                                </p>
                            </div>

                            {/* Feature Indicators */}
                            <div className="space-y-4">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 cursor-pointer ${index === currentFeature
                                            ? "bg-primary/20 border border-primary/50"
                                            : "bg-card/50 border border-border/30 hover:bg-card/70"
                                            }`}
                                        onClick={() => setCurrentFeature(index)}
                                    >
                                        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentFeature ? "bg-primary" : "bg-muted-foreground/50"
                                            }`}></div>
                                        <span className={`font-medium transition-colors duration-300 ${index === currentFeature ? "text-primary" : "text-muted-foreground"
                                            }`}>
                                            {feature.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Benefits */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 gradient-text">Why Choose MentorAI?</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-6 border border-border/30">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <Image src="/icons/clock.svg" alt="24/7" width={24} height={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Available 24/7</h3>
                            <p className="text-muted-foreground">Learn anytime, anywhere with AI mentors that never sleep.</p>
                        </div>
                        <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-6 border border-border/30">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <Image src="/icons/history.svg" alt="Adaptive" width={24} height={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">7 AI Agents</h3>
                            <p className="text-muted-foreground">Specialized agents for market research, branding, and financial planning.</p>
                        </div>
                        <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-6 border border-border/30">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <Image src="/icons/bookmark.svg" alt="Personalized" width={24} height={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">All-in-One</h3>
                            <p className="text-muted-foreground">Learning, startup development, and creative tools in one platform.</p>
                        </div>
                        <div className="bg-card/20 backdrop-blur-sm rounded-2xl p-6 border border-border/30">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <Image src="/icons/check.svg" alt="Advanced" width={24} height={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Advanced AI</h3>
                            <p className="text-muted-foreground">Cutting-edge AI technology for the best learning and creation experience.</p>
                        </div>
                    </div>
                </div>

                {/* Get Started Button */}
                <div className="mb-8">
                    <button
                        onClick={handleGetStarted}
                        className="bg-gradient-to-r from-primary to-blue-600 text-white text-xl font-semibold px-12 py-4 rounded-2xl shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 group"
                    >
                        <span className="flex items-center gap-3">
                            Get Started
                            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </button>
                </div>

                {/* Footer */}
                <div className="text-muted-foreground">
                    <p>Join thousands of learners already using MentorAI</p>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
