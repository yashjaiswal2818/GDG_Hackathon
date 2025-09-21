import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
    try {
        const { idea } = await request.json();

        if (!idea) {
            return NextResponse.json({ error: "Startup idea is required" }, { status: 400 });
        }

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const prompt = `As a Brand Architect Agent, create a comprehensive brand identity for this startup idea:

Startup Idea: "${idea}"

Please provide a complete brand strategy including:

1. BRAND POSITIONING
   - Brand mission and vision
   - Unique value proposition
   - Brand personality traits
   - Target audience alignment

2. VISUAL IDENTITY
   - Logo concept and design direction
   - Color palette with hex codes and psychology
   - Typography recommendations
   - Visual style guidelines

3. BRAND VOICE & MESSAGING
   - Brand voice characteristics
   - Key messaging pillars
   - Tagline suggestions
   - Communication tone

4. BRAND APPLICATIONS
   - Business card design concepts
   - Website design direction
   - Social media visual strategy
   - Marketing material guidelines

5. BRAND GUIDELINES
   - Logo usage rules
   - Color usage guidelines
   - Typography hierarchy
   - Spacing and layout principles

6. IMPLEMENTATION ROADMAP
   - Brand rollout strategy
   - Asset creation priorities
   - Brand consistency measures
   - Long-term brand evolution

Format your response as a structured brand guide with specific recommendations and actionable next steps.`;

        let brandStrategy = "Unable to generate brand strategy.";

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a Brand Architect Agent specializing in startup brand identity creation. Provide comprehensive brand strategy with specific visual and messaging recommendations."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 1500,
                temperature: 0.4,
            });

            brandStrategy = completion.choices[0]?.message?.content || "Unable to generate brand strategy.";
        } catch (openaiError) {
            console.log("OpenAI API error, using fallback brand strategy:", openaiError);
            brandStrategy = `Brand Strategy for: ${idea}

1. BRAND POSITIONING
   - Mission: To revolutionize [industry] through innovative solutions
   - Vision: To become the leading platform for [target market]
   - Unique Value Proposition: [Key differentiator]
   - Brand Personality: Innovative, Trustworthy, Approachable, Professional

2. VISUAL IDENTITY
   - Logo Concept: Modern, minimalist design with tech-forward aesthetic
   - Color Palette: Blue (#3B82F6) for trust, Orange (#F59E0B) for energy
   - Typography: Clean, modern sans-serif fonts
   - Visual Style: Clean, professional, with subtle tech elements

3. BRAND VOICE & MESSAGING
   - Tone: Professional yet approachable
   - Key Messages: Innovation, reliability, user-centric design
   - Tagline Options: "Innovation at Your Fingertips", "Transforming Ideas into Reality"
   - Communication Style: Clear, concise, benefit-focused

4. BRAND APPLICATIONS
   - Digital-first approach with mobile optimization
   - Consistent visual language across all touchpoints
   - Professional presentation materials
   - Social media presence with cohesive branding

5. IMPLEMENTATION ROADMAP
   - Phase 1: Core brand identity and logo
   - Phase 2: Website and digital presence
   - Phase 3: Marketing materials and campaigns
   - Phase 4: Brand expansion and evolution`;
        }

        // Generate logo using DALL-E
        let logoUrl = null;
        try {
            const logoPrompt = `Create a modern, professional logo for a startup: ${idea}. The logo should be clean, minimalist, and suitable for digital and print use.`;

            const logoResponse = await openai.images.generate({
                model: "dall-e-3",
                prompt: logoPrompt,
                size: "1024x1024",
                quality: "standard",
                n: 1,
            });

            logoUrl = logoResponse.data?.[0]?.url || null;
        } catch (logoError) {
            console.log("Logo generation failed:", logoError);
        }

        // Generate dynamic brand elements using AI
        let brandElements = {};
        try {
            const elementsPrompt = `Based on the startup idea "${idea}" and brand strategy, provide specific brand elements in JSON format:
            {
                "colorPalette": {
                    "primary": "#hexcode",
                    "secondary": "#hexcode", 
                    "accent": "#hexcode",
                    "neutral": "#hexcode",
                    "background": "#hexcode"
                },
                "typography": {
                    "heading": "font name",
                    "body": "font name",
                    "accent": "font name"
                },
                "brandPersonality": ["trait1", "trait2", "trait3", "trait4"],
                "taglines": ["tagline1", "tagline2", "tagline3"]
            }
            
            Choose colors and fonts that match the industry and brand personality. Provide valid hex codes and real font names.`;

            const elementsCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a brand designer. Provide specific brand elements in valid JSON format only."
                    },
                    {
                        role: "user",
                        content: elementsPrompt
                    }
                ],
                max_tokens: 300,
                temperature: 0.3,
            });

            const elementsText = elementsCompletion.choices[0]?.message?.content || "{}";
            brandElements = JSON.parse(elementsText);
        } catch (elementsError) {
            console.log("Brand elements generation failed, using defaults:", elementsError);
            brandElements = {
                colorPalette: {
                    primary: "#3B82F6",
                    secondary: "#1E40AF",
                    accent: "#F59E0B",
                    neutral: "#6B7280",
                    background: "#F9FAFB"
                },
                typography: {
                    heading: "Inter, sans-serif",
                    body: "Inter, sans-serif",
                    accent: "Playfair Display, serif"
                },
                brandPersonality: ["innovative", "trustworthy", "approachable", "professional"],
                taglines: [
                    "Innovation at your fingertips",
                    "Transforming ideas into reality",
                    "Your vision, our expertise"
                ]
            };
        }

        const brandData = {
            strategy: brandStrategy,
            logoUrl,
            ...brandElements
        };

        return NextResponse.json(brandData);
    } catch (error) {
        console.error("Brand Architect Agent error:", error);
        return NextResponse.json(
            { error: "Failed to generate brand strategy" },
            { status: 500 }
        );
    }
}
