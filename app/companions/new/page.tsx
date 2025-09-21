"use client";

import CompanionForm from "@/components/CompanionForm";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const NewCompanion = () => {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !user) {
            router.push('/sign-in');
        }
    }, [user, isLoaded, router]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    //const canCreateCompanion = await newCompanionPermissions();

    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">

            <article className="w-full flex flex-col gap-4">

                <h1>Mentor builder</h1>

                <CompanionForm />

            </article>
        </main>
    )
}

export default NewCompanion
