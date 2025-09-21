"use client";

import { useState, useEffect } from "react";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

// Static companions data for initial display
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
    },
    {
        id: "4",
        name: "Economics Expert",
        subject: "economics",
        topic: "Micro and Macro Economics",
        description: "Economics tutor covering microeconomics, macroeconomics, and economic theory.",
        src: "/icons/economics.svg",
        author: "system"
    },
    {
        id: "5",
        name: "Language Tutor",
        subject: "language",
        topic: "English and Communication",
        description: "Language expert focusing on English grammar, vocabulary, and communication skills.",
        src: "/icons/language.svg",
        author: "system"
    },
    {
        id: "6",
        name: "General Knowledge",
        subject: "general",
        topic: "General Studies and Current Affairs",
        description: "Comprehensive general knowledge tutor covering various subjects and current affairs.",
        src: "/icons/general.svg",
        author: "system"
    }
];

const CompanionsLibrary = ({ searchParams }: SearchParams) => {
    const [companions, setCompanions] = useState(staticCompanions);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadCompanions = async () => {
            setLoading(true);
            try {
                // Try to load dynamic companions if available
                const response = await fetch('/api/companions');
                if (response.ok) {
                    const data = await response.json();
                    setCompanions(data);
                }
            } catch (error) {
                console.log('Using static companions data');
            } finally {
                setLoading(false);
            }
        };

        loadCompanions();
    }, []);

    return (
        <main>
            <section className="flex justify-between gap-4 max-sm:flex-col">
                <h1>Mentor Library</h1>
                <div className="flex gap-4">
                    <SearchInput />
                    <SubjectFilter />
                </div>
            </section>
            <section className="companions-grid">
                {companions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
            </section>
        </main>
    )
}

export default CompanionsLibrary
