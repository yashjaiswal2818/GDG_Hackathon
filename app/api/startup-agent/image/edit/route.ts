import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: NextRequest) {
    try {
        const { originalImage, editPrompt, maskData } = await request.json();

        if (!originalImage || !editPrompt) {
            return NextResponse.json({ error: "Original image and edit prompt are required" }, { status: 400 });
        }

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Initialize Gemini Image Generation Client
        const geminiImageClient = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY || ""
        });

        try {
            // First, enhance the edit prompt with Gemini
            const enhancedEditPrompt = await model.generateContent(`
                Create a detailed, professional image editing instruction for: "${editPrompt}"
                
                The instruction should be:
                - Specific and actionable
                - Professional and business-appropriate
                - Clear about what changes to make
                - Suitable for AI image editing
                
                Return only the enhanced editing instruction, no explanations.
            `);

            const enhancedPromptText = enhancedEditPrompt.response.text();
            console.log(`Enhanced edit prompt: ${enhancedPromptText}`);

            // Try to generate edited image with Gemini
            try {
                console.log("Attempting to generate edited image with Gemini");
                const imageModel = geminiImageClient.getGenerativeModel({
                    model: "gemini-2.5-flash-image-preview"
                });

                // Create a comprehensive prompt for image editing
                const fullEditPrompt = `
                    Edit this image with the following changes: ${enhancedPromptText}
                    
                    Maintain the original style and quality while applying the requested modifications.
                    Ensure the result is professional and suitable for business use.
                `;

                const imageResponse = await imageModel.generateContent(fullEditPrompt);

                // Extract image data from response
                const imageParts = imageResponse.response.candidates?.[0]?.content?.parts?.filter(
                    (part: any) => part.inline_data
                );

                if (imageParts && imageParts.length > 0) {
                    // Convert base64 to data URL
                    const imageData = imageParts[0].inline_data.data;
                    const imageUrl = `data:image/png;base64,${imageData}`;

                    console.log("Gemini image editing success");
                    return NextResponse.json({
                        editedImage: imageUrl,
                        enhancedPrompt: enhancedPromptText,
                        source: "Gemini 2.5 Flash"
                    });
                }
            } catch (imageGenError) {
                console.log("Gemini image editing failed:", imageGenError.message);
            }

            // If image generation fails, return enhanced prompt for manual editing
            return NextResponse.json({
                editedImage: null,
                enhancedPrompt: enhancedPromptText,
                source: "Gemini Enhanced",
                error: "Use enhanced prompt with any AI image editor"
            });

        } catch (error) {
            console.error("Error in image editing:", error);
            return NextResponse.json({ error: "Failed to process image edit" }, { status: 500 });
        }

    } catch (error) {
        console.error("Error in image edit API:", error);
        return NextResponse.json({ error: "Failed to edit image" }, { status: 500 });
    }
}
