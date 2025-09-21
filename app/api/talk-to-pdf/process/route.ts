import { NextRequest, NextResponse } from "next/server";
import { createId } from "@paralleldrive/cuid2";

export async function POST(request: NextRequest) {
    try {
        const { pdfText, fileName } = await request.json();

        if (!pdfText) {
            return NextResponse.json({ error: "PDF text is required" }, { status: 400 });
        }

        // Process the PDF text into chunks for better analysis
        const chunks = await processTextIntoChunks(pdfText);

        // Generate a summary of the document
        const summary = await generateDocumentSummary(pdfText);

        // Extract key topics
        const topics = await extractKeyTopics(pdfText);

        return NextResponse.json({
            chunks,
            summary,
            topics,
            fileId: createId(),
        });
    } catch (error) {
        console.error("Error processing PDF:", error);
        return NextResponse.json(
            { error: "Failed to process PDF" },
            { status: 500 }
        );
    }
}

async function processTextIntoChunks(text: string): Promise<string[]> {
    // Split text into meaningful chunks
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const chunks: string[] = [];

    let currentChunk = "";
    let chunkSize = 0;
    const maxChunkSize = 500; // characters

    for (const sentence of sentences) {
        if (chunkSize + sentence.length > maxChunkSize && currentChunk) {
            chunks.push(currentChunk.trim());
            currentChunk = sentence;
            chunkSize = sentence.length;
        } else {
            currentChunk += sentence + ". ";
            chunkSize += sentence.length + 2;
        }
    }

    if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
    }

    return chunks;
}

async function generateDocumentSummary(text: string): Promise<string> {
    // Simple summary generation
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const firstFewSentences = sentences.slice(0, 3).join(". ") + ".";

    return `Document Summary: ${firstFewSentences}`;
}

async function extractKeyTopics(text: string): Promise<string[]> {
    // Simple topic extraction
    const words = text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 4);

    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    const sortedWords = Object.entries(wordCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([word]) => word);

    return sortedWords;
}

