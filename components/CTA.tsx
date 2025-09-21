import Image from "next/image";
import Link from "next/link";
import { Brain, Rocket, FileText, Image as ImageIcon, Sparkles } from "lucide-react";

const Cta = () => {
    return (
        <section className="cta-section max-w-4xl mx-auto">
            <div className="cta-badge">Unlock Your Potential</div>
            <h2 className="text-4xl font-bold gradient-text mb-4">
                Ready to Transform Your Ideas?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                Join thousands of users who are already building, learning, and creating with our comprehensive AI platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Link href="/companions/new" className="group">
                    <div className="glass-card p-4 text-center hover:scale-105 transition-all duration-300">
                        <Brain className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-sm font-medium">Create AI Mentor</div>
                    </div>
                </Link>
                <Link href="/startup-agent" className="group">
                    <div className="glass-card p-4 text-center hover:scale-105 transition-all duration-300">
                        <Rocket className="w-8 h-8 text-purple-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-sm font-medium">Build Startup</div>
                    </div>
                </Link>
                <Link href="/talk-to-pdf" className="group">
                    <div className="glass-card p-4 text-center hover:scale-105 transition-all duration-300">
                        <FileText className="w-8 h-8 text-green-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-sm font-medium">Analyze PDFs</div>
                    </div>
                </Link>
                <Link href="/advanced-image-generator" className="group">
                    <div className="glass-card p-4 text-center hover:scale-105 transition-all duration-300">
                        <ImageIcon className="w-8 h-8 text-pink-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <div className="text-sm font-medium">Generate Images</div>
                    </div>
                </Link>
            </div>

            <div className="flex gap-4 justify-center">
                <Link href="/companions/new">
                    <button className="btn-primary">
                        <Sparkles className="w-5 h-5" />
                        <span>Get Started Free</span>
                    </button>
                </Link>
                <Link href="/startup-agent">
                    <button className="btn-primary bg-gradient-to-r from-purple-600 to-purple-700">
                        <Rocket className="w-5 h-5" />
                        <span>Launch Your Startup</span>
                    </button>
                </Link>
            </div>
        </section>
    )
}
export default Cta
