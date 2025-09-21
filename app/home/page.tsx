import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import { getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import { Users, Sparkles, ArrowRight } from "lucide-react";

// Static data for home page to enable static generation
const staticCompanions = [
    {
        id: "1",
        name: "Math Mentor",
        subject: "maths",
        topic: "Algebra and Calculus",
        description: "Expert in mathematics with focus on algebra, calculus, and problem-solving techniques.",
        src: "/icons/maths.svg",
        author: "system"
    },
    {
        id: "2",
        name: "Science Guide",
        subject: "science",
        topic: "Physics and Chemistry",
        description: "Comprehensive science tutor covering physics, chemistry, and scientific methodology.",
        src: "/icons/science.svg",
        author: "system"
    },
    {
        id: "3",
        name: "Coding Coach",
        subject: "coding",
        topic: "Programming and Development",
        description: "Programming mentor specializing in web development, algorithms, and software engineering.",
        src: "/icons/coding.svg",
        author: "system"
    }
];

const HomePage = () => {
    const companions = staticCompanions;
    const recentSessionsCompanions = recentSessions;

    return (
        <main className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-6xl font-bold mb-6">
                        Welcome to <span className="gradient-text">MentorAI</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Your personal AI learning companion for mastering any subject
                    </p>
                    <div className="flex gap-6 justify-center">
                        <Link href="/companions" className="btn-primary text-lg px-8 py-4">
                            <Users className="w-6 h-6" />
                            Start Learning
                        </Link>
                        <Link href="/features" className="btn-primary bg-gradient-to-r from-purple-600 to-purple-700 text-lg px-8 py-4">
                            <Sparkles className="w-6 h-6" />
                            Explore Features
                        </Link>
                    </div>
                </div>
            </section>

            {/* Popular Mentors Section */}
            <section>
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        Popular <span className="gradient-text">AI Mentors</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Start your learning journey with our most popular AI mentors across various subjects.
                    </p>
                </div>

                <div className="companions-grid">
                    {companions.map((companion) => (
                        <CompanionCard
                            key={companion.id}
                            {...companion}
                            color={getSubjectColor(companion.subject)}
                        />
                    ))}
                </div>
            </section>

            {/* Recent Sessions Section */}
            <section>
                <CompanionsList
                    title="Recent Sessions"
                    companions={recentSessionsCompanions}
                    classNames="w-full"
                />
            </section>

            {/* CTA Section */}
            <section className="py-12">
                <div className="flex justify-center">
                    <CTA />
                </div>
            </section>
        </main>
    );
};

export default HomePage;