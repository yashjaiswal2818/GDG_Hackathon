import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
    try {
        const { idea } = await request.json();

        if (!idea) {
            return NextResponse.json({ error: "Startup idea is required" }, { status: 400 });
        }

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Note: Direct image generation with Gemini requires different approach
        // For now, we'll use enhanced prompts

        // Generate image prompts and visual strategy
        const prompt = `Create a comprehensive visual strategy for a startup with the idea: "${idea}". 

    Please provide:
    1. Visual Brand Strategy - How the brand should look and feel
    2. Key Visual Elements - Icons, graphics, and design elements needed
    3. Image Prompts - 5 detailed prompts for generating images that represent the startup
    4. Color Psychology - How colors should be used to convey the brand message
    5. Visual Applications - Where and how images will be used (website, social media, presentations)
    6. Style Guidelines - Visual style recommendations

    Format your response as a structured analysis with clear sections.`;

        let visualStrategy = "Unable to generate visual strategy.";

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            visualStrategy = response.text();
        } catch (geminiError) {
            console.log("Gemini API error, using fallback visual strategy:", geminiError);
            visualStrategy = `Visual Strategy for: ${idea}

1. Visual Brand Strategy
   The brand should project a feeling of positive empowerment, playful motivation, and achievable progress, rather than harsh judgment or guilt. The visual style should be clean, modern, and optimistic, avoiding overly serious or clinical aesthetics often associated with productivity tools. We want to feel inspired and encouraged, not intimidated. The overall tone should be friendly, approachable, and subtly energetic.

2. Key Visual Elements
   Hero images showcasing the product/service in action
   Iconography that represents core features and benefits
   Infographics for data visualization and progress tracking
   Lifestyle imagery connecting with target audience emotions
   User interface mockups with clean, intuitive design

3. Image Prompts
   Modern startup office with team collaboration, clean design, natural lighting
   Professional product mockup with sleek interface design
   Diverse team members working together on innovative project
   Customer using the product with satisfaction and ease
   Data visualization and analytics dashboard with modern UI

4. Color Psychology
   Blue: Trust, reliability, technology and stability
   Green: Growth, success, sustainability and progress
   Purple: Innovation, creativity, premium quality
   Orange: Energy, enthusiasm, approachability and warmth

5. Visual Applications
   Website hero sections and feature showcases
   Social media content and advertising campaigns
   Presentation slides and pitch deck materials
   Marketing materials and promotional brochures

6. Style Guidelines
   High-quality, professional photography with natural lighting
   Consistent lighting and composition across all visuals
   Modern, minimalist design approach with clean lines
   Accessibility-compliant color contrasts and readable typography`;
        }

        // Generate sample image prompts for different use cases
        const imagePrompts = [
            {
                type: "Hero Image",
                prompt: `Professional startup team working on ${idea.toLowerCase()}, modern office environment, clean design, natural lighting, diverse team, collaborative atmosphere`,
                usage: "Website hero section, landing page"
            },
            {
                type: "Product Showcase",
                prompt: `Sleek product interface for ${idea.toLowerCase()}, modern UI design, clean layout, professional mockup, high-quality rendering`,
                usage: "Product pages, feature showcases"
            },
            {
                type: "Team Photo",
                prompt: `Diverse startup team members in modern office, professional attire, collaborative workspace, natural expressions, high-quality photography`,
                usage: "About page, team section"
            },
            {
                type: "Customer Success",
                prompt: `Happy customer using ${idea.toLowerCase()}, satisfied expression, modern environment, professional lifestyle, authentic moment`,
                usage: "Testimonials, case studies"
            },
            {
                type: "Data Visualization",
                prompt: `Modern analytics dashboard for ${idea.toLowerCase()}, clean charts and graphs, professional data visualization, sleek interface design`,
                usage: "Analytics pages, reports"
            }
        ];

        // Generate actual images using DALL-E 3 with Gemini fallback
        const generatedImages = [];
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || ""
        });

        // Function to generate image with Gemini as fallback
        const generateImageWithFallback = async (prompt: any) => {
            // Try DALL-E 3 first
            try {
                console.log(`Trying DALL-E 3 for: ${prompt.type}`);
                const imageResponse = await openai.images.generate({
                    model: "dall-e-3",
                    prompt: prompt.prompt,
                    n: 1,
                    size: "1024x1024",
                    quality: "standard",
                    style: "natural"
                });

                if (imageResponse.data && imageResponse.data[0]) {
                    console.log(`DALL-E 3 success for ${prompt.type}: ${imageResponse.data[0].url}`);
                    return {
                        type: prompt.type,
                        prompt: prompt.prompt,
                        usage: prompt.usage,
                        imageUrl: imageResponse.data[0].url,
                        revisedPrompt: imageResponse.data[0].revised_prompt || prompt.prompt,
                        source: "DALL-E 3"
                    };
                }
            } catch (dalleError) {
                console.log(`DALL-E 3 failed for ${prompt.type}, trying Gemini:`, dalleError.message);

                // Try Gemini image generation as fallback
                try {
                    console.log(`Trying Gemini image generation for: ${prompt.type}`);

                    // First enhance the prompt with Gemini
                    const enhancedPrompt = await model.generateContent(`
                        Create a detailed, professional image prompt for: "${prompt.prompt}"
                        
                        Make it specific, professional, and suitable for business use. Include:
                        - Style: professional, clean, modern
                        - Quality: high-resolution, detailed
                        - Mood: positive, inspiring, business-appropriate
                        - Composition: well-balanced, visually appealing
                        
                        Return only the enhanced prompt, no explanations.
                    `);

                    const enhancedPromptText = enhancedPrompt.response.text();
                    console.log(`Enhanced prompt for ${prompt.type}: ${enhancedPromptText}`);

                    // Return enhanced prompt (image generation not available)
                    console.log(`Returning enhanced prompt for: ${prompt.type}`);

                        // Extract image data from response
                        const imageParts = imageResponse.response.candidates?.[0]?.content?.parts?.filter(
                            (part: any) => part.inline_data
                        );

                        if (imageParts && imageParts.length > 0) {
                            // Convert base64 to data URL
                            const imageData = imageParts[0].inline_data.data;
                            const imageUrl = `data:image/png;base64,${imageData}`;

                            console.log(`Gemini image generation success for ${prompt.type}`);
                            return {
                                type: prompt.type,
                                prompt: prompt.prompt,
                                usage: prompt.usage,
                                imageUrl: imageUrl,
                                revisedPrompt: enhancedPromptText,
                                source: "Gemini 2.5 Flash"
                            };
                        }
                    } catch (imageGenError) {
                        console.log(`Gemini image generation failed for ${prompt.type}:`, imageGenError.message);
                    }

                    // If image generation fails, return enhanced prompt
                    return {
                        type: prompt.type,
                        prompt: prompt.prompt,
                        usage: prompt.usage,
                        imageUrl: null,
                        revisedPrompt: enhancedPromptText,
                        source: "Gemini Enhanced",
                        error: "Use enhanced prompt with any AI image generator"
                    };

                } catch (geminiError) {
                    console.log(`Gemini fallback also failed for ${prompt.type}:`, geminiError.message);
                }
            }

            // If both fail, return with error
            return {
                type: prompt.type,
                prompt: prompt.prompt,
                usage: prompt.usage,
                imageUrl: null,
                revisedPrompt: prompt.prompt,
                source: "Fallback",
                error: "Generation failed - use prompt with any AI image generator"
            };
        };

        try {
            console.log("Starting image generation with DALL-E 3 and Gemini fallback...");
            // Generate images for the first 3 prompts (to avoid rate limits)
            for (let i = 0; i < Math.min(3, imagePrompts.length); i++) {
                const prompt = imagePrompts[i];
                console.log(`Generating image ${i + 1}/3 for: ${prompt.type}`);

                const result = await generateImageWithFallback(prompt);
                generatedImages.push(result);
            }

            // Add remaining prompts with Gemini enhancement
            for (let i = 3; i < imagePrompts.length; i++) {
                const prompt = imagePrompts[i];
                console.log(`Enhancing prompt ${i + 1}/${imagePrompts.length} for: ${prompt.type}`);

                try {
                    const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                    const enhancedPrompt = await geminiModel.generateContent(`
                        Create a detailed, professional image prompt for: "${prompt.prompt}"
                        
                        Make it specific, professional, and suitable for business use. Include:
                        - Style: professional, clean, modern
                        - Quality: high-resolution, detailed
                        - Mood: positive, inspiring, business-appropriate
                        - Composition: well-balanced, visually appealing
                        
                        Return only the enhanced prompt, no explanations.
                    `);

                    generatedImages.push({
                        type: prompt.type,
                        prompt: prompt.prompt,
                        usage: prompt.usage,
                        imageUrl: null,
                        revisedPrompt: enhancedPrompt.response.text(),
                        source: "Gemini Enhanced"
                    });
                } catch (error) {
                    console.log(`Gemini enhancement failed for ${prompt.type}, using original prompt`);
                    generatedImages.push({
                        type: prompt.type,
                        prompt: prompt.prompt,
                        usage: prompt.usage,
                        imageUrl: null,
                        revisedPrompt: prompt.prompt,
                        source: "Original"
                    });
                }
            }
        } catch (openaiError) {
            console.log("OpenAI API error, using prompts without images:", openaiError);

            // Check if it's a billing error
            const isBillingError = openaiError.message &&
                (openaiError.message.includes('billing') ||
                    openaiError.message.includes('limit') ||
                    openaiError.message.includes('quota'));

            if (isBillingError) {
                console.log("OpenAI billing limit reached - using fallback image generation");
            }

            // Fallback to prompts without images
            generatedImages.push(...imagePrompts.map(prompt => ({
                type: prompt.type,
                prompt: prompt.prompt,
                usage: prompt.usage,
                imageUrl: null,
                revisedPrompt: prompt.prompt,
                error: isBillingError ? "Billing limit reached" : "Generation failed"
            })));
        }

        const visualData = {
            strategy: visualStrategy,
            imagePrompts: generatedImages,
            colorRecommendations: {
                primary: "#3B82F6",
                secondary: "#10B981",
                accent: "#8B5CF6",
                neutral: "#6B7280"
            },
            styleGuidelines: {
                photography: "High-quality, professional, natural lighting",
                graphics: "Clean, modern, minimalist design",
                typography: "Clear, readable, professional fonts",
                composition: "Balanced, focused, purposeful layouts"
            }
        };

        return NextResponse.json(visualData);
    } catch (error) {
        console.error("Error generating visual strategy:", error);
        return NextResponse.json({ error: "Failed to generate visual strategy" }, { status: 500 });
    }
}
