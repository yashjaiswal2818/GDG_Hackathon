"use client";

import Link from "next/link";
import {
    Brain,
    FileText,
    Rocket,
    Image as ImageIcon,
    ArrowRight,
    Users,
    Sparkles
} from "lucide-react";

const FeaturesPage = () => {
    const features = [
        {
            icon: Brain,
            title: "AI Companions",
            description: "Interactive AI mentors for personalized learning across 10+ subjects with voice conversations.",
            href: "/companions",
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: FileText,
            title: "TalkToPDF",
            description: "Upload PDFs, ask questions, and generate mind maps with advanced AI analysis.",
            href: "/talk-to-pdf",
            color: "from-green-500 to-green-600"
        },
        {
            icon: Rocket,
            title: "Startup Agent",
            description: "7 specialized AI agents create complete startup packages including market research and financial projections.",
            href: "/startup-agent",
            color: "from-purple-500 to-purple-600"
        },
        {
            icon: ImageIcon,
            title: "Image Generator",
            description: "Advanced AI image generation with editing capabilities and professional prompt enhancement.",
            href: "/advanced-image-generator",
            color: "from-pink-500 to-pink-600"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-blue-600/5 to-blue-800/10"></div>
                <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 max-w-6xl mx-auto text-center">
                    <h1 className="text-6xl font-bold mb-6 gradient-text">MentorAI Features</h1>
                    <p className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-12">
                        Discover our comprehensive suite of AI-powered tools designed to accelerate your learning and business success
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6">
                            Core <span className="gradient-text">Features</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Four powerful platforms working together to provide comprehensive AI-powered solutions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <Link
                                key={index}
                                href={feature.href}
                                className="group glass-card p-8 hover:scale-105 transition-all duration-300"
                            >
                                <div className="flex items-start gap-6">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                                        <p className="text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
                                        <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-sm font-medium">Explore</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="glass-card p-12">
                        <h2 className="text-4xl font-bold mb-6 gradient-text">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Choose your path and start your AI-powered journey today
                        </p>
                        <div className="flex gap-6 justify-center">
                            <Link href="/companions" className="btn-primary text-lg px-8 py-4">
                                <Users className="w-6 h-6" />
                                Start Learning
                            </Link>
                            <Link href="/startup-agent" className="btn-primary bg-gradient-to-r from-purple-600 to-purple-700 text-lg px-8 py-4">
                                <Rocket className="w-6 h-6" />
                                Build Your Startup
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeaturesPage;