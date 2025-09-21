import { NextRequest, NextResponse } from "next/server";
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

        // Use OpenAI API for intelligent question answering
        const answer = await generateAnswerWithOpenAI(pdfText, question);

        return NextResponse.json({ answer });
    } catch (error) {
        console.error("Error processing question:", error);
        return NextResponse.json(
            { error: "Failed to process question" },
            { status: 500 }
        );
    }
}

async function generateAnswerWithOpenAI(pdfText: string, question: string): Promise<string> {
    try {
        // Initialize OpenAI with your API key
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || "",
        });

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

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that answers questions based on document content. Always be accurate and cite information from the provided document."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 500,
            temperature: 0.3,
        });

        const answer = completion.choices[0]?.message?.content || "I couldn't generate a response. Please try again.";

        return answer;
    } catch (error: any) {
        console.error("OpenAI API error:", error);

        // Check if it's a rate limit error
        if (error.message?.includes("429") || error.message?.includes("rate_limit")) {
            console.log("OpenAI rate limit reached, using basic text analysis");
            return await generateBasicAnswer(pdfText, question);
        }

        // Fallback to basic text analysis for other errors
        return await generateBasicAnswer(pdfText, question);
    }
}

async function generateBasicAnswer(pdfText: string, question: string): Promise<string> {
    const questionLower = question.toLowerCase();
    const sentences = pdfText.split(/[.!?]+/).filter(s => s.trim().length > 10);

    // Extract key terms from the question
    const questionWords = questionLower.split(/\s+/)
        .filter(word => word.length > 3)
        .filter(word => !['what', 'how', 'when', 'where', 'why', 'which', 'who', 'this', 'that', 'with', 'from', 'they', 'have', 'been', 'were', 'said', 'each', 'which', 'their', 'time', 'will', 'about', 'there', 'could', 'other', 'after', 'first', 'well', 'also', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'].includes(word));

    // Find relevant sentences based on keyword matching
    const relevantSentences = sentences.filter(sentence => {
        const sentenceLower = sentence.toLowerCase();
        return questionWords.some(word => sentenceLower.includes(word));
    });

    // If no specific matches, try broader matching
    if (relevantSentences.length === 0) {
        const broaderMatches = sentences.filter(sentence => {
            const sentenceLower = sentence.toLowerCase();
            const questionWords = questionLower.split(/\s+/).filter(word => word.length > 2);
            return questionWords.some(word => sentenceLower.includes(word));
        });

        if (broaderMatches.length > 0) {
            const answer = broaderMatches.slice(0, 2).join(". ") + ".";
            return `Based on the document, here's what I found:\n\n${answer}`;
        }
    }

    if (relevantSentences.length === 0) {
        // Provide a more intelligent response based on question type
        if (questionLower.includes('what') || questionLower.includes('about')) {
            const firstFewSentences = sentences.slice(0, 2).join(". ") + ".";
            return `Based on the document, here's what I can tell you:\n\n${firstFewSentences}\n\nThis appears to be the main content of the document. You can ask more specific questions about particular topics mentioned.`;
        } else if (questionLower.includes('how')) {
            return `The document doesn't contain specific "how-to" information for your question. However, the document covers various topics that might be related. Try asking about specific concepts or topics mentioned in the document.`;
        } else if (questionLower.includes('when') || questionLower.includes('time')) {
            return `The document doesn't contain specific time-related information for your question. The content appears to be more focused on concepts and topics rather than temporal information.`;
        } else if (questionLower.includes('where')) {
            return `The document doesn't contain specific location information for your question. The content appears to be more focused on concepts and topics rather than geographical information.`;
        } else {
            const firstFewSentences = sentences.slice(0, 2).join(". ") + ".";
            return `I couldn't find specific information about "${question}" in the document. However, here's what the document contains:\n\n${firstFewSentences}\n\nTry asking about topics mentioned in the document, or rephrase your question.`;
        }
    }

    // Return the most relevant sentences
    const answer = relevantSentences.slice(0, 3).join(". ") + ".";

    return `Based on the document, here's what I found:\n\n${answer}`;
}
