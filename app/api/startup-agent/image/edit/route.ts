import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
    try {
        const { originalImage, editPrompt, maskData } = await request.json();

        if (!originalImage || !editPrompt) {
            return NextResponse.json({ error: "Original image and edit prompt are required" }, { status: 400 });
        }

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            // First, enhance the edit prompt with Gemini
            const enhancedEditPrompt = await model.generateContent(`
                Create a detailed, professional image editing instruction for: "${editPrompt}"
                
                The instruction should be:
                - Specific and actionable
                - Professional and business-appropriate
                - Clear and easy to understand
                - Focused on the requested changes
                
                Provide a comprehensive editing instruction that can be used with any image editing tool.
            `);

            const enhancedPromptText = enhancedEditPrompt.response.text();
            console.log(`Enhanced edit prompt: ${enhancedPromptText}`);

            // Return enhanced prompt as conceptual edit
            return NextResponse.json({
                success: true,
                editedImageUrl: null,
                editPrompt: enhancedPromptText,
                method: "conceptual-edit",
                message: "Image editing is conceptual. Use the enhanced prompt with your preferred image editing tool."
            });

        } catch (geminiError) {
            console.log("Gemini prompt enhancement failed:", geminiError);
            
            // Fallback to original prompt
            return NextResponse.json({
                success: true,
                editedImageUrl: null,
                editPrompt: editPrompt,
                method: "fallback",
                message: "Using original prompt. Consider using an image editing tool with this prompt."
            });
        }

    } catch (error) {
        console.error("Image editing error:", error);
        return NextResponse.json(
            { error: "Failed to process image editing request" },
            { status: 500 }
        );
    }
}