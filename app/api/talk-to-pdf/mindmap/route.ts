import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
    try {
        const { pdfText } = await request.json();

        if (!pdfText) {
            return NextResponse.json(
                { error: "PDF text is required" },
                { status: 400 }
            );
        }

        // Generate mind map data using Google Gemini
        const mindMap = await generateMindMapWithGemini(pdfText);

        return NextResponse.json({ mindMap });
    } catch (error) {
        console.error("Error generating mind map:", error);
        return NextResponse.json(
            { error: "Failed to generate mind map" },
            { status: 500 }
        );
    }
}

async function generateMindMapWithGemini(pdfText: string) {
    try {
        // Initialize Google Gemini AI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Analyze the following document and create a structured mind map. Extract the main concepts, key topics, and their relationships.

Document Content:
${pdfText}

Please provide a JSON response with the following structure:
{
  "nodes": [
    {"id": "main", "label": "Main Topic", "level": 0},
    {"id": "concept_1", "label": "Key Concept 1", "level": 1},
    {"id": "concept_2", "label": "Key Concept 2", "level": 1},
    {"id": "sub_1", "label": "Sub-concept 1", "level": 2}
  ],
  "edges": [
    {"source": "main", "target": "concept_1"},
    {"source": "main", "target": "concept_2"},
    {"source": "concept_1", "target": "sub_1"}
  ]
}

Guidelines:
1. Identify 1 main topic (level 0)
2. Extract 4-6 key concepts (level 1) that are directly related to the main topic
3. Add 6-8 sub-concepts (level 2) that are related to the key concepts
4. Create logical connections between concepts
5. Keep labels concise (max 3-4 words)
6. Ensure the structure represents the document's content hierarchy

Return only the JSON object, no additional text.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text() || "{}";

        // Parse the JSON response
        const mindMapData = JSON.parse(text);
        return mindMapData;
    } catch (error: any) {
        console.error("Gemini API error:", error);

        // Fallback to basic mind map generation
        console.log("Gemini API error, using basic mind map generation");
        return await generateBasicMindMap(pdfText);
    }
}

async function generateBasicMindMap(pdfText: string) {
    // Simple text analysis to extract key concepts
    const sentences = pdfText.split(/[.!?]+/).filter(s => s.trim().length > 20);

    // Extract key terms (simplified approach)
    const keyTerms = extractKeyTerms(pdfText);

    // Create nodes and edges
    const nodes: Array<{ id: string, label: string, level: number }> = [];
    const edges: Array<{ source: string, target: string }> = [];

    // Add main topic (first few words of the document)
    const mainTopic = pdfText.split(/\s+/).slice(0, 5).join(" ");
    nodes.push({
        id: "main",
        label: mainTopic,
        level: 0
    });

    // Add key concepts as level 1 nodes
    keyTerms.slice(0, 6).forEach((term, index) => {
        const nodeId = `concept_${index}`;
        nodes.push({
            id: nodeId,
            label: term,
            level: 1
        });

        // Connect to main topic
        edges.push({
            source: "main",
            target: nodeId
        });
    });

    // Add sub-concepts as level 2 nodes
    keyTerms.slice(6, 12).forEach((term, index) => {
        const nodeId = `sub_${index}`;
        const parentIndex = index % 3; // Distribute among first 3 concepts

        nodes.push({
            id: nodeId,
            label: term,
            level: 2
        });

        edges.push({
            source: `concept_${parentIndex}`,
            target: nodeId
        });
    });

    return {
        nodes,
        edges
    };
}

function extractKeyTerms(text: string): string[] {
    // Simple keyword extraction
    const words = text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 4);

    // Count word frequency
    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Get most frequent words
    const sortedWords = Object.entries(wordCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 15)
        .map(([word]) => word);

    return sortedWords;
}