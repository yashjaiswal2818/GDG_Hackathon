# MentorAI - Production Setup Instructions

## 🚀 Quick Start for Judges

### 1. Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# OpenAI API Key (Required for all AI agents)
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini API Key (Optional - for enhanced image generation)
GEMINI_API_KEY=your_gemini_api_key_here

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 2. API Keys Required

#### OpenAI API Key (Required)
- **Purpose**: Powers all 7 AI agents (Market Intelligence, Brand Architect, Financial Strategist, Storytelling, Presentation, Image Generator, Audio Generator)
- **Get it from**: https://platform.openai.com/api-keys
- **Cost**: ~$0.50-2.00 per complete startup package generation
- **Models used**: GPT-3.5-turbo, DALL-E 3

#### Google Gemini API Key (Optional)
- **Purpose**: Enhanced image generation and text analysis
- **Get it from**: https://makersuite.google.com/app/apikey
- **Cost**: Free tier available
- **Models used**: Gemini 1.5 Flash, Gemini 2.5 Flash Image Preview

### 3. Installation & Running

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Open in browser
http://localhost:3000
```

### 4. Testing the Startup Agent

1. Go to `http://localhost:3000/startup-agent`
2. Enter any startup idea (e.g., "AI-powered fitness app for seniors")
3. Click "Generate Complete Package"
4. Watch as 7 AI agents work in parallel to create:
   - Market Intelligence Analysis
   - Brand Identity & Logo
   - Financial Projections
   - Storytelling Strategy
   - Presentation Structure
   - Visual Content
   - Audio Strategy

### 5. Production Features

#### ✅ Fully Dynamic AI Generation
- **No preloaded data** - everything is generated in real-time
- **Industry-specific analysis** based on the startup idea
- **Realistic financial projections** tailored to the business model
- **Custom brand elements** including colors, fonts, and taglines
- **Actual logo generation** using DALL-E 3

#### ✅ Error Handling
- Graceful fallbacks if API calls fail
- Clear error messages for missing API keys
- Robust JSON parsing with fallback data

#### ✅ Security
- No hardcoded API keys
- Environment variable validation
- Secure API key handling

### 6. Cost Estimation

For a complete startup package generation:
- **OpenAI GPT-3.5-turbo**: ~$0.10-0.30
- **DALL-E 3 Logo Generation**: ~$0.04-0.08
- **Total per package**: ~$0.15-0.40

### 7. Troubleshooting

#### "OpenAI API key not configured" Error
- Ensure `.env.local` file exists in root directory
- Verify `OPENAI_API_KEY` is set correctly
- Restart the development server after adding environment variables

#### "Failed to generate" Errors
- Check API key validity
- Ensure sufficient OpenAI credits
- Check internet connection

#### Image Generation Issues
- DALL-E 3 may have content policy restrictions
- Some prompts may be rejected
- Fallback to enhanced prompts is provided

### 8. Demo Ideas for Judges

Try these startup ideas to showcase different capabilities:

1. **"AI-powered mental health app for teenagers"**
   - Shows healthcare industry analysis
   - Generates appropriate brand colors (calming blues/greens)
   - Creates relevant financial projections

2. **"Blockchain-based supply chain tracking for small businesses"**
   - Demonstrates B2B market analysis
   - Generates professional brand identity
   - Shows enterprise-focused financial models

3. **"VR fitness platform for home workouts"**
   - Shows emerging technology market analysis
   - Generates energetic brand colors
   - Creates consumer-focused projections

### 9. Technical Architecture

- **Frontend**: Next.js 14 with TypeScript
- **AI Integration**: OpenAI API, Google Gemini API
- **Styling**: Tailwind CSS with custom dark blue theme
- **State Management**: React hooks
- **Error Handling**: Comprehensive try-catch blocks
- **Performance**: Parallel AI agent execution

### 10. Contact & Support

For technical issues during judging:
- Check the browser console for detailed error messages
- Ensure all environment variables are properly set
- Verify API keys have sufficient credits
- Restart the development server if needed

---

**Ready to impress the judges! 🎉**

The MentorAI platform is now fully production-ready with real AI-generated content for any startup idea the judges can input.
