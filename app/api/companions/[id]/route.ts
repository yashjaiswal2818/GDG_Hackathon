import { NextRequest, NextResponse } from "next/server";

// Static companion data for demo purposes
const staticCompanions = [
    {
        id: "1",
        name: "Science Mentor",
        subject: "science",
        topic: "Physics",
        style: "friendly",
        voice: "sarah",
        src: "/icons/science.svg",
        author: "system"
    },
    {
        id: "2",
        name: "Coding Mentor",
        subject: "coding",
        topic: "JavaScript",
        style: "professional",
        voice: "michael",
        src: "/icons/coding.svg",
        author: "system"
    },
    {
        id: "3",
        name: "Economics Mentor",
        subject: "economics",
        topic: "Microeconomics",
        style: "analytical",
        voice: "sarah",
        src: "/icons/economics.svg",
        author: "system"
    },
    {
        id: "4",
        name: "Math Mentor",
        subject: "maths",
        topic: "Calculus",
        style: "patient",
        voice: "michael",
        src: "/icons/maths.svg",
        author: "system"
    },
    {
        id: "5",
        name: "Language Mentor",
        subject: "language",
        topic: "English Grammar",
        style: "encouraging",
        voice: "sarah",
        src: "/icons/language.svg",
        author: "system"
    },
    {
        id: "6",
        name: "General Knowledge Mentor",
        subject: "general",
        topic: "World History",
        style: "engaging",
        voice: "michael",
        src: "/icons/general.svg",
        author: "system"
    }
];

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Find companion by ID
        const companion = staticCompanions.find(c => c.id === id);

        if (!companion) {
            return NextResponse.json(
                { error: 'Companion not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(companion);

    } catch (error) {
        console.error('Error fetching companion:', error);
        return NextResponse.json(
            { error: 'Failed to fetch companion' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Find companion by ID
        const companionIndex = staticCompanions.findIndex(c => c.id === id);

        if (companionIndex === -1) {
            return NextResponse.json(
                { error: 'Companion not found' },
                { status: 404 }
            );
        }

        // Update companion
        const updatedCompanion = {
            ...staticCompanions[companionIndex],
            ...body,
            id // Ensure ID doesn't change
        };

        // In a real app, you would update this in a database
        staticCompanions[companionIndex] = updatedCompanion;

        return NextResponse.json(updatedCompanion);

    } catch (error) {
        console.error('Error updating companion:', error);
        return NextResponse.json(
            { error: 'Failed to update companion' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Find companion by ID
        const companionIndex = staticCompanions.findIndex(c => c.id === id);

        if (companionIndex === -1) {
            return NextResponse.json(
                { error: 'Companion not found' },
                { status: 404 }
            );
        }

        // Remove companion
        staticCompanions.splice(companionIndex, 1);

        return NextResponse.json({ message: 'Companion deleted successfully' });

    } catch (error) {
        console.error('Error deleting companion:', error);
        return NextResponse.json(
            { error: 'Failed to delete companion' },
            { status: 500 }
        );
    }
}
