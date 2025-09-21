import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
    try {
        const { idea } = await request.json();

        if (!idea) {
            return NextResponse.json({ error: "Startup idea is required" }, { status: 400 });
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const prompt = `As a Storytelling Agent, create compelling narratives and pitch content for this startup idea:

Startup Idea: "${idea}"

Please provide comprehensive storytelling strategy including:

1. NARRATIVE ARC
   - Problem identification and emotional hook
   - Solution presentation and value proposition
   - Market opportunity and timing
   - Team credibility and execution plan
   - Vision and future impact

2. PITCH FRAMEWORK
   - Elevator pitch (30 seconds)
   - Problem-solution fit narrative
   - Market opportunity story
   - Business model explanation
   - Traction and milestones
   - Ask and next steps

3. AUDIENCE-SPECIFIC MESSAGING
   - VC pitch narrative
   - Angel investor messaging
   - Customer presentation
   - Team and employee story
   - Media and PR narrative

4. EMOTIONAL RESONANCE
   - Personal founder story
   - Customer success stories
   - Social impact narrative
   - Innovation and disruption story
   - Future vision storytelling

5. CONTENT ADAPTATION
   - Slide-by-slide narrative flow
   - Key talking points for each section
   - Transition phrases and connectors
   - Call-to-action messaging
   - Q&A preparation

6. STORYTELLING TECHNIQUES
   - Data storytelling integration
   - Visual narrative elements
   - Interactive story elements
   - Multi-media story components
   - Follow-up story sequences

Format your response as a structured storytelling guide with specific narratives, talking points, and presentation flow recommendations.`;

        let storytellingStrategy = "Unable to generate storytelling strategy.";

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a Storytelling Agent specializing in startup pitch narratives. Create compelling, emotionally resonant stories that connect with different audiences and drive action."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 1500,
                temperature: 0.5,
            });

            storytellingStrategy = completion.choices[0]?.message?.content || "Unable to generate storytelling strategy.";
        } catch (openaiError) {
            console.log("OpenAI API error, using fallback storytelling strategy:", openaiError);
            storytellingStrategy = `Storytelling Strategy for: ${idea}

1. NARRATIVE ARC
   - Problem: Clear identification of market pain point
   - Solution: Innovative approach to solving the problem
   - Opportunity: Large market with growth potential
   - Team: Experienced founders with relevant expertise
   - Vision: Future impact and scalability

2. PITCH FRAMEWORK
   - Elevator Pitch: 30-second compelling summary
   - Problem-Solution Fit: Clear connection between problem and solution
   - Market Opportunity: Size and growth potential
   - Business Model: How revenue is generated
   - Traction: Current progress and milestones
   - Ask: Clear funding request and next steps

3. AUDIENCE-SPECIFIC MESSAGING
   - VCs: Focus on market size, scalability, and returns
   - Angels: Emphasize personal connection and social impact
   - Customers: Highlight benefits and ease of use
   - Team: Show growth opportunities and mission alignment

4. EMOTIONAL RESONANCE
   - Founder story: Personal motivation and journey
   - Customer impact: How the solution changes lives
   - Social mission: Broader purpose and vision
   - Innovation: Cutting-edge technology and approach

5. KEY MESSAGES
   - Clear problem identification with emotional impact
   - Unique solution with competitive advantages
   - Large market opportunity with growth potential
   - Experienced team with execution capability
   - Strong traction and clear path to scale`;
        }

        const storytellingData = {
            strategy: storytellingStrategy,
            narratives: {
                elevatorPitch: `We're building ${idea.toLowerCase()} to solve a critical problem in the market. Our solution addresses the pain points that current alternatives miss, creating a $X billion opportunity.`,
                problemStory: "Every day, millions of people struggle with [specific problem]. Current solutions are inadequate because [key issues]. This creates frustration, inefficiency, and lost opportunities.",
                solutionStory: "Our platform revolutionizes how people [core action] by [unique approach]. We've built technology that [key differentiator], making it [benefit] for users.",
                visionStory: "In 5 years, we envision a world where [future state]. Our platform will be the foundation that enables [broader impact], transforming [industry/market]."
            },
            keyMessages: [
                "Clear problem identification with emotional impact",
                "Unique solution with competitive advantages",
                "Large market opportunity with growth potential",
                "Experienced team with execution capability",
                "Strong traction and clear path to scale"
            ],
            audienceAdaptations: {
                vc: "Focus on market size, scalability, and return potential",
                angel: "Emphasize personal connection, social impact, and founder story",
                customer: "Highlight benefits, ease of use, and immediate value",
                team: "Show growth opportunities, mission alignment, and culture"
            },
            presentationFlow: [
                "Hook with compelling problem statement",
                "Present solution with clear value proposition",
                "Demonstrate market opportunity and timing",
                "Show team credibility and execution plan",
                "Share traction and future milestones",
                "Make clear ask and next steps"
            ]
        };

        return NextResponse.json(storytellingData);
    } catch (error) {
        console.error("Storytelling Agent error:", error);
        return NextResponse.json(
            { error: "Failed to generate storytelling strategy" },
            { status: 500 }
        );
    }
}
