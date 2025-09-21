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

        const prompt = `As a Presentation Agent, create a comprehensive pitch deck structure and design for this startup idea:

Startup Idea: "${idea}"

Please provide detailed presentation strategy including:

1. SLIDE STRUCTURE & FLOW
   - Title slide with compelling headline
   - Problem statement with emotional impact
   - Solution overview with key features
   - Market opportunity and size
   - Business model and revenue streams
   - Traction and milestones achieved
   - Team and advisory board
   - Financial projections and metrics
   - Funding ask and use of funds
   - Contact information and next steps

2. DESIGN GUIDELINES
   - Visual hierarchy and layout principles
   - Color scheme and branding integration
   - Typography and readability standards
   - Image and icon usage guidelines
   - Data visualization best practices
   - Slide transition and animation suggestions

3. CONTENT OPTIMIZATION
   - Key messaging for each slide
   - Bullet point optimization
   - Data presentation techniques
   - Story flow and narrative connection
   - Call-to-action placement
   - Q&A preparation slides

4. AUDIENCE ADAPTATION
   - VC-focused presentation version
   - Angel investor presentation
   - Customer demo presentation
   - Team and employee presentation
   - Media and press presentation

5. INTERACTIVE ELEMENTS
   - Demo integration points
   - Live data visualization
   - Interactive Q&A sections
   - Feedback collection mechanisms
   - Follow-up material links

6. MULTI-FORMAT OUTPUT
   - PowerPoint template structure
   - PDF export specifications
   - HTML presentation version
   - Mobile-optimized format
   - Print-friendly version

Format your response as a comprehensive presentation guide with specific slide content, design recommendations, and implementation strategies.`;

        let presentationStrategy = "Unable to generate presentation strategy.";

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a Presentation Agent specializing in startup pitch deck creation. Provide detailed slide structure, content, and design recommendations for maximum impact."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 1500,
                temperature: 0.3,
            });

            presentationStrategy = completion.choices[0]?.message?.content || "Unable to generate presentation strategy.";
        } catch (openaiError) {
            console.log("OpenAI API error, using fallback presentation strategy:", openaiError);
            presentationStrategy = `Presentation Strategy for: ${idea}

1. SLIDE STRUCTURE & FLOW
   - Title Slide: Company name, tagline, founder info
   - Problem: Market pain point with emotional impact
   - Solution: Product overview and key features
   - Market: Size, opportunity, and growth potential
   - Business Model: Revenue streams and pricing
   - Traction: Key metrics and achievements
   - Team: Founder backgrounds and expertise
   - Financials: Projections and funding needs
   - Ask: Clear funding request and use of funds
   - Contact: Next steps and contact information

2. DESIGN GUIDELINES
   - Visual Hierarchy: Clear headings and bullet points
   - Color Scheme: Professional, branded colors
   - Typography: Clean, readable fonts
   - Images: High-quality, relevant visuals
   - Data Visualization: Clear charts and graphs
   - White Space: Generous spacing for readability

3. CONTENT OPTIMIZATION
   - Key Messages: 3-5 main points per slide
   - Bullet Points: Maximum 5 per slide
   - Data Presentation: Visual charts over text
   - Story Flow: Logical progression between slides
   - Call-to-Action: Clear next steps

4. AUDIENCE ADAPTATION
   - VC Focus: Market size, scalability, returns
   - Angel Focus: Personal connection, social impact
   - Customer Focus: Benefits, ease of use
   - Team Focus: Growth opportunities, mission

5. INTERACTIVE ELEMENTS
   - Demo Integration: Live product demonstration
   - Q&A Preparation: Anticipated questions and answers
   - Follow-up Materials: Additional resources
   - Contact Information: Multiple ways to connect

6. MULTI-FORMAT OUTPUT
   - PowerPoint: Professional presentation format
   - PDF: Print-ready, high-resolution version
   - HTML: Interactive, web-optimized version
   - Mobile: Responsive, touch-friendly format`;
        }

        const presentationData = {
            strategy: presentationStrategy,
            slideStructure: [
                {
                    slide: 1,
                    title: "Title Slide",
                    content: "Company Name & Tagline\nFounder Name & Title\nDate & Contact Info",
                    design: "Clean, branded layout with logo prominence"
                },
                {
                    slide: 2,
                    title: "The Problem",
                    content: "Clear problem statement\nMarket pain points\nCurrent solution gaps",
                    design: "Problem-focused imagery with emotional impact"
                },
                {
                    slide: 3,
                    title: "Our Solution",
                    content: "Product overview\nKey features and benefits\nUnique value proposition",
                    design: "Solution visualization with product mockups"
                },
                {
                    slide: 4,
                    title: "Market Opportunity",
                    content: "Total Addressable Market (TAM)\nServiceable Addressable Market (SAM)\nMarket growth trends",
                    design: "Data visualization with charts and graphs"
                },
                {
                    slide: 5,
                    title: "Business Model",
                    content: "Revenue streams\nPricing strategy\nUnit economics",
                    design: "Business model canvas or flow diagram"
                },
                {
                    slide: 6,
                    title: "Traction",
                    content: "Key metrics and milestones\nUser growth and engagement\nPartnerships and achievements",
                    design: "Growth charts and success metrics"
                },
                {
                    slide: 7,
                    title: "Team",
                    content: "Founder backgrounds\nKey team members\nAdvisory board",
                    design: "Professional headshots with credentials"
                },
                {
                    slide: 8,
                    title: "Financial Projections",
                    content: "Revenue forecasts\nKey financial metrics\nBreak-even analysis",
                    design: "Financial charts and projections"
                },
                {
                    slide: 9,
                    title: "Funding Ask",
                    content: "Amount needed\nUse of funds\nExpected outcomes",
                    design: "Clear ask with fund allocation breakdown"
                },
                {
                    slide: 10,
                    title: "Next Steps",
                    content: "Timeline and milestones\nPartnership opportunities\nContact information",
                    design: "Call-to-action with clear next steps"
                }
            ],
            designGuidelines: {
                colors: {
                    primary: "#3B82F6",
                    secondary: "#1E40AF",
                    accent: "#F59E0B",
                    text: "#1F2937",
                    background: "#FFFFFF"
                },
                typography: {
                    heading: "Inter Bold, 32px",
                    subheading: "Inter SemiBold, 24px",
                    body: "Inter Regular, 18px",
                    caption: "Inter Regular, 14px"
                },
                layout: {
                    maxBullets: 5,
                    maxWordsPerSlide: 25,
                    imageToTextRatio: "60/40",
                    whiteSpace: "generous"
                }
            },
            formats: {
                powerpoint: "16:9 aspect ratio, branded template",
                pdf: "Print-ready, high resolution",
                html: "Interactive, web-optimized",
                mobile: "Responsive, touch-friendly"
            }
        };

        return NextResponse.json(presentationData);
    } catch (error) {
        console.error("Presentation Agent error:", error);
        return NextResponse.json(
            { error: "Failed to generate presentation strategy" },
            { status: 500 }
        );
    }
}
