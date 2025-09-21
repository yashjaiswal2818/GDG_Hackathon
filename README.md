# 🚀 MentorAI - AI-Powered Learning Platform

**MentorAI** is a comprehensive AI-powered learning platform that combines mentorship, startup building, and document analysis capabilities. Built with cutting-edge AI models and modern web technologies, MentorAI delivers an intelligent, interactive learning experience.

🌐 **Live Demo:** [mentorai1.netlify.app](https://mentorai1.netlify.app)

## ✨ Key Features

### 🎓 **AI Learning Companions**
- **Subject-Specific Mentors** - AI companions for Science, Coding, Economics, Mathematics, and more
- **Voice-Powered Interaction** - Real-time voice conversations using VAPI AI
- **Personalized Learning** - Customized learning paths and content
- **Session History** - Track your learning progress and conversations

### 🏗️ **Startup Agent Suite**
- **Market Analysis** - AI-powered market research and competitive analysis
- **Brand Strategy** - Logo concepts, color palettes, typography, and brand personality
- **Financial Planning** - Revenue projections, expense analysis, and funding strategies
- **Visual Assets** - AI-generated images and marketing materials using DALL-E 3 & Gemini
- **Audio Strategy** - Voice guidelines, scripts, and production specifications
- **Storytelling** - Compelling narratives and presentation strategies

### 📄 **PDF Analysis & Mind Mapping**
- **Document Processing** - Upload and analyze PDF documents
- **AI-Powered Q&A** - Ask questions about your documents
- **Mind Map Generation** - Visual representation of document content
- **Knowledge Extraction** - Intelligent content summarization

### 🎨 **Advanced Image Generation**
- **Multi-Model Support** - DALL-E 3 and Google Gemini integration
- **Fallback Mechanisms** - Robust error handling and alternative generation
- **Prompt Enhancement** - AI-improved prompts for better results
- **Visual Asset Creation** - Marketing materials, logos, and illustrations

## 🤖 AI Models & Technologies

### **AI Models**
- **OpenAI GPT-4** - Text generation, analysis, and content creation
- **DALL-E 3** - High-quality image generation
- **Google Gemini 1.5 Flash** - Audio strategies and content generation
- **Google Gemini 2.5 Flash** - Advanced image generation and prompt enhancement
- **VAPI AI** - Voice interaction and real-time conversations

### **Tech Stack**
- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Supabase
- **Authentication:** Clerk AI
- **Deployment:** Netlify
- **Monitoring:** Sentry
- **Icons:** Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn
- API Keys (see setup instructions below)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yashjaiswal2818/GDG_Hackathon.git
   cd GDG_Hackathon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys to `.env.local`:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   GEMINI_API_KEY=your_gemini_api_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 API Keys Setup

For full functionality, you'll need the following API keys:

- **OpenAI API Key** - For GPT-4 and DALL-E 3 access
- **Google Gemini API Key** - For Gemini models and image generation
- **Clerk API Keys** - For user authentication

See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for detailed setup guide.

## 🏗️ Project Structure

```
mentorai/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── startup-agent/ # Startup building endpoints
│   │   └── talk-to-pdf/   # PDF analysis endpoints
│   ├── companions/        # AI companion pages
│   ├── startup-agent/     # Startup builder interface
│   └── splash/           # Feature showcase
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions and configurations
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🎯 Core Features Breakdown

### **Startup Agent**
- **Market Research** - Industry analysis, target audience identification
- **Brand Development** - Logo concepts, color schemes, brand voice
- **Financial Modeling** - Revenue projections, expense tracking, funding strategies
- **Visual Assets** - AI-generated marketing materials and presentations
- **Audio Strategy** - Voice guidelines and production specifications

### **Learning Companions**
- **Multi-Subject Support** - Science, Coding, Economics, Mathematics, Languages
- **Voice Interaction** - Natural conversation with AI mentors
- **Progress Tracking** - Session history and learning analytics
- **Personalized Content** - Adaptive learning based on user preferences

### **PDF Analysis**
- **Document Upload** - Secure PDF processing
- **Intelligent Q&A** - Ask questions about document content
- **Mind Mapping** - Visual representation of key concepts
- **Content Summarization** - AI-powered document insights

## 🚀 Deployment

### **Netlify Deployment**
The project is configured for easy deployment on Netlify:

1. **Connect your GitHub repository** to Netlify
2. **Set environment variables** in Netlify dashboard
3. **Deploy automatically** on every push to main branch

### **Build Commands**
```bash
# Development
npm run dev

# Production build
npm run build

# Netlify build
npm run build:netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Developer Groups** - For hosting the hackathon
- **OpenAI** - For GPT-4 and DALL-E 3 APIs
- **Google** - For Gemini AI models
- **VAPI** - For voice AI capabilities
- **Clerk** - For authentication services
- **Netlify** - For hosting and deployment

## 📞 Support

For support, email support@mentorai.com or create an issue in this repository.

---

**Built with ❤️ for the GDG Hackathon 2024**