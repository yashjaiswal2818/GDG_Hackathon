import { NextRequest, NextResponse } from "next/server";

// Static companions data for demo purposes
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

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const subject = searchParams.get('subject');
        const topic = searchParams.get('topic');
        const limit = parseInt(searchParams.get('limit') || '10');
        const page = parseInt(searchParams.get('page') || '1');

        let filteredCompanions = staticCompanions;

        // Filter by subject if provided
        if (subject && subject !== 'all') {
            filteredCompanions = filteredCompanions.filter(
                companion => companion.subject === subject
            );
        }

        // Filter by topic if provided
        if (topic) {
            filteredCompanions = filteredCompanions.filter(
                companion => companion.topic.toLowerCase().includes(topic.toLowerCase())
            );
        }

        // Pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedCompanions = filteredCompanions.slice(startIndex, endIndex);

        return NextResponse.json({
            companions: paginatedCompanions,
            total: filteredCompanions.length,
            page,
            limit,
            totalPages: Math.ceil(filteredCompanions.length / limit)
        });

    } catch (error) {
        console.error('Error fetching companions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch companions' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, subject, topic, style, voice } = body;

        // Validate required fields
        if (!name || !subject || !topic || !style || !voice) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create new companion
        const newCompanion = {
            id: Date.now().toString(),
            name,
            subject,
            topic,
            style,
            voice,
            src: "/icons/general.svg", // Default icon
            author: "user"
        };

        // In a real app, you would save this to a database
        // For now, we'll just return the created companion
        return NextResponse.json(newCompanion, { status: 201 });

    } catch (error) {
        console.error('Error creating companion:', error);
        return NextResponse.json(
            { error: 'Failed to create companion' },
            { status: 500 }
        );
    }
}
