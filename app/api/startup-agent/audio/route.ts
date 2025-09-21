import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
    try {
        const { idea } = await request.json();

        if (!idea) {
            return NextResponse.json({ error: "Startup idea is required" }, { status: 400 });
        }

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate audio strategy and scripts
        const prompt = `Create a comprehensive audio strategy for a startup with the idea: "${idea}". 

    Please provide:
    1. Audio Brand Strategy - How the brand should sound and communicate
    2. Voice Guidelines - Tone, pace, and personality recommendations
    3. Audio Scripts - 3 different scripts for different use cases (intro, pitch, demo)
    4. Sound Design - Background music and sound effects recommendations
    5. Audio Applications - Where audio will be used (videos, presentations, ads)
    6. Production Guidelines - Technical specifications and quality standards

    Format your response as a structured analysis with clear sections.`;

        let audioStrategy = "Unable to generate audio strategy.";

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            audioStrategy = response.text();
        } catch (geminiError) {
            console.log("Gemini API error, using fallback audio strategy:", geminiError);
            audioStrategy = `Audio Strategy for: ${idea}

    1. AUDIO BRAND STRATEGY
       - Professional yet approachable voice tone
       - Clear, confident communication style
       - Consistent brand voice across all audio content
       - Focus on clarity and engagement

    2. VOICE GUIDELINES
       - Tone: Professional, friendly, confident
       - Pace: Moderate, clear articulation
       - Personality: Innovative, trustworthy, accessible
       - Language: Simple, jargon-free, benefit-focused

    3. AUDIO SCRIPTS
       - Introduction script for company overview
       - Product demonstration script
       - Customer testimonial script
       - Marketing advertisement script

    4. SOUND DESIGN
       - Upbeat, modern background music
       - Subtle sound effects for transitions
       - Professional audio quality standards
       - Consistent audio branding elements

    5. AUDIO APPLICATIONS
       - Video presentations and demos
       - Podcast episodes and interviews
       - Social media audio content
       - Interactive voice responses

    6. PRODUCTION GUIDELINES
       - High-quality recording equipment
       - Professional editing and mixing
       - Consistent audio levels and quality
       - Accessibility compliance (transcripts)`;
        }

        // Generate sample audio scripts for different use cases
        const audioScripts = [
            {
                type: "Company Introduction",
                script: `Welcome to our innovative startup focused on ${idea.toLowerCase()}. We're revolutionizing the way people interact with technology, making complex solutions simple and accessible. Our mission is to empower users with cutting-edge tools that enhance productivity and creativity. Join us on this exciting journey as we transform ideas into reality.`,
                duration: "30-45 seconds",
                usage: "Website intro, presentation opening"
            },
            {
                type: "Product Demo",
                script: `Let me show you how ${idea.toLowerCase()} works. With just a few clicks, you can access powerful features that were previously complex and time-consuming. Our intuitive interface guides you through each step, while our advanced algorithms work behind the scenes to deliver exceptional results. Experience the future of innovation today.`,
                duration: "60-90 seconds",
                usage: "Product demonstrations, tutorials"
            },
            {
                type: "Customer Testimonial",
                script: `Since implementing ${idea.toLowerCase()}, our productivity has increased by 40%. The team loves how easy it is to use, and our customers have noticed the improvement in our service quality. It's not just a tool - it's a game-changer for our business.`,
                duration: "20-30 seconds",
                usage: "Marketing materials, case studies"
            },
            {
                type: "Call to Action",
                script: `Ready to transform your business with ${idea.toLowerCase()}? Don't wait - the future is here today. Start your free trial now and experience the difference. Visit our website or contact us directly. Your success story starts now.`,
                duration: "15-25 seconds",
                usage: "Marketing campaigns, advertisements"
            }
        ];

        const audioData = {
            strategy: audioStrategy,
            scripts: audioScripts,
            voiceGuidelines: {
                tone: "Professional, friendly, confident",
                pace: "Moderate, clear articulation",
                personality: "Innovative, trustworthy, accessible",
                language: "Simple, jargon-free, benefit-focused"
            },
            soundDesign: {
                backgroundMusic: "Upbeat, modern, instrumental",
                soundEffects: "Subtle transitions, professional quality",
                audioBranding: "Consistent jingles and signature sounds",
                quality: "High-definition, studio-quality recording"
            },
            productionSpecs: {
                sampleRate: "44.1 kHz minimum",
                bitDepth: "16-bit minimum, 24-bit preferred",
                format: "WAV for production, MP3 for distribution",
                duration: "Optimized for platform requirements"
            }
        };

        return NextResponse.json(audioData);
    } catch (error) {
        console.error("Error generating audio strategy:", error);
        return NextResponse.json({ error: "Failed to generate audio strategy" }, { status: 500 });
    }
}

