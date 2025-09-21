"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import CompanionComponent from "@/components/CompanionComponent";
import { useState, useEffect } from "react";

const CompanionSession = () => {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [companion, setCompanion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded && !user) {
            router.push('/sign-in');
            return;
        }

        if (user && id) {
            loadCompanion();
        }
    }, [user, isLoaded, id, router]);

    const loadCompanion = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/companions/${id}`);
            if (response.ok) {
                const data = await response.json();
                setCompanion(data);
            } else {
                // Fallback to static companion data
                setCompanion({
                    id,
                    name: "AI Mentor",
                    subject: "general",
                    title: "General AI Assistant",
                    topic: "General Knowledge and Learning",
                    duration: 30,
                    description: "A helpful AI mentor ready to assist with your learning journey."
                });
            }
        } catch (error) {
            console.log('Using fallback companion data');
            setCompanion({
                id,
                name: "AI Mentor",
                subject: "general",
                title: "General AI Assistant",
                topic: "General Knowledge and Learning",
                duration: 30,
                description: "A helpful AI mentor ready to assist with your learning journey."
            });
        } finally {
            setLoading(false);
        }
    };

    if (!isLoaded || loading) {
        return <main>Loading...</main>;
    }

    if (!user || !companion) {
        return null;
    }

    const { name, subject, title, topic, duration } = companion;

    return (
        <main>
            <article className="flex rounded-border justify-between p-6 max-md:flex-col">
                <div className="flex items-center gap-2">
                    <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(subject)}}>
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p className="font-bold text-2xl">
                                {name}
                            </p>
                            <div className="subject-badge max-sm:hidden">
                                {subject}
                            </div>
                        </div>
                        <p className="text-lg">{topic}</p>
                    </div>
                </div>
                <div className="items-start text-2xl max-md:hidden">
                    {duration} minutes
                </div>
            </article>

            <CompanionComponent
                {...companion}
                companionId={id}
                userName={user.firstName!}
                userImage={user.imageUrl!}
            />
        </main>
    )
}

export default CompanionSession
