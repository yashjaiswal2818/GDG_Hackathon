import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
    try {
        const { pdfText, question } = await request.json();

        if (!pdfText || !question) {
            return NextResponse.json(
                { error: "PDF text and question are required" },
                { status: 400 }
            );
        }

        // Use Google Gemini API for intelligent question answering
        const answer = await generateAnswerWithGemini(pdfText, question);

        return NextResponse.json({ answer });
    } catch (error) {
        console.error("Error processing question:", error);
        return NextResponse.json(
            { error: "Failed to process question" },
            { status: 500 }
        );
    }
}

async function generateAnswerWithGemini(pdfText: string, question: string): Promise<string> {
    try {
        // Initialize Google Gemini AI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Create a comprehensive prompt for the AI
        const prompt = `You are an intelligent assistant that answers questions based on the provided document content. 

Document Content:
${pdfText}

Question: ${question}

Instructions:
1. Answer the question based ONLY on the information provided in the document
2. If the document doesn't contain enough information to answer the question, say so clearly
3. Provide specific quotes or references from the document when possible
4. Be concise but comprehensive in your response
5. If the question is unclear, ask for clarification
6. Maintain a helpful and professional tone

Answer:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const answer = response.text() || "I couldn't generate a response. Please try again.";

        return answer;
    } catch (error: any) {
        console.error("Gemini API error:", error);

        // Fallback to basic text analysis for any errors
        console.log("Gemini API error, using enhanced text analysis");
        return await generateBasicAnswer(pdfText, question);
    }
}

async function generateBasicAnswer(pdfText: string, question: string): Promise<string> {
    const questionLower = question.toLowerCase();

    // Split text into sentences and clean them
    const sentences = pdfText.split(/[.!?]+/)
        .map(s => s.trim())
        .filter(s => s.length > 10)
        .filter(s => !s.match(/^\d+$/)); // Remove pure numbers

    // Extract meaningful keywords from the question
    const stopWords = ['what', 'how', 'when', 'where', 'why', 'which', 'who', 'this', 'that', 'with', 'from', 'they', 'have', 'been', 'were', 'said', 'each', 'their', 'time', 'will', 'about', 'there', 'could', 'other', 'after', 'first', 'well', 'also', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'can', 'you', 'your', 'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'man', 'oil', 'sit', 'yes', 'yet'];

    const questionWords = questionLower.split(/\s+/)
        .filter(word => word.length > 2)
        .filter(word => !stopWords.includes(word))
        .filter(word => !word.match(/^\d+$/));

    // Find sentences that contain question keywords
    const relevantSentences = sentences.filter(sentence => {
        const sentenceLower = sentence.toLowerCase();
        return questionWords.some(word => sentenceLower.includes(word));
    });

    // If we found relevant sentences, return them
    if (relevantSentences.length > 0) {
        const answer = relevantSentences.slice(0, 3).join(". ") + ".";
        return `Based on the document, here's what I found:\n\n${answer}`;
    }

    // Try broader matching with shorter words
    const broaderMatches = sentences.filter(sentence => {
        const sentenceLower = sentence.toLowerCase();
        const shortWords = questionLower.split(/\s+/).filter(word => word.length > 1);
        return shortWords.some(word => sentenceLower.includes(word));
    });

    if (broaderMatches.length > 0) {
        const answer = broaderMatches.slice(0, 2).join(". ") + ".";
        return `Based on the document, here's what I found:\n\n${answer}`;
    }

    // If still no matches, provide intelligent responses based on question type
    if (questionLower.includes('what') || questionLower.includes('about')) {
        const firstFewSentences = sentences.slice(0, 3).join(". ") + ".";
        return `Based on the document, here's what I can tell you:\n\n${firstFewSentences}\n\nThis appears to be the main content of the document. You can ask more specific questions about particular topics mentioned.`;
    }

    if (questionLower.includes('summary') || questionLower.includes('summarize')) {
        const keySentences = sentences.slice(0, 4).join(". ") + ".";
        return `Here's a summary of the document:\n\n${keySentences}`;
    }

    if (questionLower.includes('main') || questionLower.includes('key') || questionLower.includes('important')) {
        const keySentences = sentences.slice(0, 3).join(". ") + ".";
        return `The main points from the document are:\n\n${keySentences}`;
    }

    if (questionLower.includes('how')) {
        return `The document doesn't contain specific "how-to" information for your question. However, the document covers various topics that might be related. Try asking about specific concepts or topics mentioned in the document.`;
    }

    if (questionLower.includes('when') || questionLower.includes('time')) {
        return `The document doesn't contain specific time-related information for your question. The content appears to be more focused on concepts and topics rather than temporal information.`;
    }

    if (questionLower.includes('where')) {
        return `The document doesn't contain specific location information for your question. The content appears to be more focused on concepts and topics rather than geographical information.`;
    }

    // Default response with document content
    const firstFewSentences = sentences.slice(0, 3).join(". ") + ".";
    return `I couldn't find specific information about "${question}" in the document. However, here's what the document contains:\n\n${firstFewSentences}\n\nTry asking about topics mentioned in the document, or rephrase your question.`;
}
