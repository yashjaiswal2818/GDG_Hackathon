import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        // In a real app, you would fetch user's session history from a database
        // For now, return empty array or default sessions
        const userSessions: any[] = [];

        return NextResponse.json(userSessions);

    } catch (error) {
        console.error('Error fetching user sessions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch user sessions' },
            { status: 500 }
        );
    }
}
