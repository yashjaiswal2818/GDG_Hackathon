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

        const prompt = `As a Financial Strategist Agent, create comprehensive financial projections and strategy for this startup idea:

Startup Idea: "${idea}"

Please provide detailed financial analysis including:

1. REVENUE MODEL
   - Primary revenue streams
   - Pricing strategy and tiers
   - Revenue projections by year (5 years)
   - Customer acquisition cost (CAC)
   - Customer lifetime value (LTV)

2. FINANCIAL PROJECTIONS
   - Year 1-5 revenue forecasts
   - Monthly burn rate analysis
   - Break-even analysis
   - Cash flow projections
   - Profit and loss statements

3. FUNDING REQUIREMENTS
   - Total funding needed
   - Funding milestones and use of funds
   - Runway calculations
   - Funding timeline and stages
   - Investor return projections

4. KEY METRICS & KPIs
   - Monthly Recurring Revenue (MRR)
   - Annual Recurring Revenue (ARR)
   - Churn rate projections
   - Growth rate targets
   - Unit economics

5. COST STRUCTURE
   - Fixed costs breakdown
   - Variable costs analysis
   - Operational expenses
   - Technology and infrastructure costs
   - Marketing and sales expenses

6. FINANCIAL SCENARIOS
   - Conservative scenario
   - Optimistic scenario
   - Pessimistic scenario
   - Sensitivity analysis

7. FUNDING STRATEGY
   - Recommended funding sources
   - Valuation methodology
   - Equity structure
   - Exit strategy and timeline

Format your response with specific numbers, percentages, and actionable financial insights.`;

        let financialAnalysis = "Unable to generate financial analysis.";

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a Financial Strategist Agent specializing in startup financial planning. Provide detailed financial projections with realistic assumptions and specific numbers."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 1500,
                temperature: 0.2,
            });

            financialAnalysis = completion.choices[0]?.message?.content || "Unable to generate financial analysis.";
        } catch (openaiError) {
            console.log("OpenAI API error, using fallback financial analysis:", openaiError);
            financialAnalysis = `Financial Analysis for: ${idea}

1. REVENUE MODEL
   - Primary Revenue Stream: Subscription-based model
   - Secondary Revenue: Transaction fees and premium features
   - Pricing Strategy: Freemium with paid tiers
   - Customer Acquisition Cost (CAC): $50-100
   - Customer Lifetime Value (LTV): $500-1000

2. FINANCIAL PROJECTIONS
   - Year 1: $100K revenue, $200K expenses
   - Year 2: $500K revenue, $400K expenses
   - Year 3: $2M revenue, $1.5M expenses
   - Break-even: Month 18-24
   - Monthly burn rate: $15K-25K

3. FUNDING REQUIREMENTS
   - Total funding needed: $500K-1M
   - Use of funds: 40% product development, 30% marketing, 20% operations, 10% legal/admin
   - Runway: 18-24 months
   - Funding stages: Seed round, Series A

4. KEY METRICS
   - Monthly Recurring Revenue (MRR) growth: 20-30%
   - Customer churn rate: 5-10% monthly
   - Gross margin: 70-80%
   - Unit economics: Positive by month 12

5. COST STRUCTURE
   - Technology and infrastructure: 30%
   - Marketing and sales: 40%
   - Operations: 20%
   - General and administrative: 10%

6. FINANCIAL SCENARIOS
   - Conservative: Slower growth, higher costs
   - Optimistic: Fast growth, efficient operations
   - Base case: Moderate growth with steady progress`;
        }

        // Generate realistic financial projections using AI
        let financialProjections = {};
        try {
            const projectionsPrompt = `Based on the startup idea "${idea}", provide specific financial projections in JSON format:
            {
                "projections": {
                    "year1": {
                        "revenue": number,
                        "expenses": number,
                        "users": number
                    },
                    "year2": {
                        "revenue": number,
                        "expenses": number,
                        "users": number
                    },
                    "year3": {
                        "revenue": number,
                        "expenses": number,
                        "users": number
                    }
                },
                "funding": {
                    "totalNeeded": number,
                    "runway": number,
                    "valuation": number
                },
                "metrics": {
                    "cac": number,
                    "ltv": number,
                    "churnRate": number,
                    "grossMargin": number
                }
            }
            
            Provide realistic financial projections based on the industry, market size, and business model. Use appropriate numbers for the startup's stage and industry.`;

            const projectionsCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a financial analyst. Provide realistic financial projections in valid JSON format only."
                    },
                    {
                        role: "user",
                        content: projectionsPrompt
                    }
                ],
                max_tokens: 400,
                temperature: 0.2,
            });

            const projectionsText = projectionsCompletion.choices[0]?.message?.content || "{}";
            financialProjections = JSON.parse(projectionsText);
        } catch (projectionsError) {
            console.log("Financial projections generation failed, using defaults:", projectionsError);
            financialProjections = {
                projections: {
                    year1: {
                        revenue: 150000,
                        expenses: 300000,
                        users: 2000
                    },
                    year2: {
                        revenue: 800000,
                        expenses: 1200000,
                        users: 15000
                    },
                    year3: {
                        revenue: 3000000,
                        expenses: 2500000,
                        users: 50000
                    }
                },
                funding: {
                    totalNeeded: 750000,
                    runway: 18,
                    valuation: 5000000
                },
                metrics: {
                    cac: 75,
                    ltv: 800,
                    churnRate: 7.5,
                    grossMargin: 72.5
                }
            };
        }

        const financialData = {
            analysis: financialAnalysis,
            ...financialProjections
        };

        return NextResponse.json(financialData);
    } catch (error) {
        console.error("Financial Strategist Agent error:", error);
        return NextResponse.json(
            { error: "Failed to generate financial analysis" },
            { status: 500 }
        );
    }
}
