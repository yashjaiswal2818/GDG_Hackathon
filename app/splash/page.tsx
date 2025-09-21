"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Rocket, ArrowRight } from "lucide-react";

const SplashPage = () => {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push("/home");
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-6xl font-bold gradient-text mb-8">MentorAI</h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Your comprehensive AI platform for learning, startup development, and creative content generation
                    </p>
                    <div className="flex gap-6 justify-center">
                        <button
                            onClick={handleGetStarted}
                            className="bg-gradient-to-r from-primary to-blue-600 text-white text-xl font-semibold px-12 py-4 rounded-2xl shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 group"
                        >
                            <span className="flex items-center gap-3">
                                Get Started
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                            </span>
                        </button>
                        <Link href="/startup-agent" className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xl font-semibold px-12 py-4 rounded-2xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 group">
                            <span className="flex items-center gap-3">
                                <Rocket className="w-6 h-6" />
                                Build Your Startup
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplashPage;