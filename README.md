# MentorAI - AI-Powered Learning Platform

MentorAI is a comprehensive AI-powered platform that provides intelligent learning companions, document analysis, and startup assistance. Built with cutting-edge tools and frameworks, MentorAI delivers a smooth, real-time experience through conversational AI, user authentication, and scalable backend.

## 🚀 Features

### 🎓 AI Companions
- Subject-specific AI mentors for science, coding, economics, and more
- Voice-powered interaction using Vapi AI
- Personalized learning experiences

### 📄 Talk to PDF
- Upload and analyze PDF documents
- Ask questions about document content
- Generate mind maps from documents
- AI-powered document understanding

### 🚀 Startup Agent
- Complete startup package generation
- Market intelligence analysis
- Brand identity creation
- Financial projections
- Presentation and storytelling tools

### 🔐 Security & Authentication
- Secure user authentication with Clerk
- Protected API endpoints
- Environment-based configuration

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS, Custom CSS
- **Authentication**: Clerk
- **AI Services**: OpenAI GPT, Google Gemini
- **Database**: Supabase
- **Voice AI**: Vapi AI
- **Deployment**: GitHub, Vercel/Netlify

## 📋 Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# OpenAI API Key (Required for AI agents)
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini API Key (Optional - for enhanced features)
GEMINI_API_KEY=your_gemini_api_key_here

# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# AWS Configuration (Optional)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here
AWS_S3_BUCKET_NAME=mentorai-pdfs
```

## 🚀 Getting Started

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
   - Copy the environment variables above to `.env.local`
   - Add your API keys

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## 📱 Usage

### AI Companions
- Navigate to `/companions` to browse available AI mentors
- Create custom companions for specific subjects
- Use voice interaction for natural conversations

### Talk to PDF
- Go to `/talk-to-pdf` to upload documents
- Ask questions about your PDF content
- Generate visual mind maps

### Startup Agent
- Visit `/startup-agent` for startup assistance
- Generate complete business packages
- Get market analysis and financial projections

## 🔧 API Endpoints

- `/api/startup-agent/*` - Startup assistance services
- `/api/talk-to-pdf/*` - PDF analysis and Q&A
- `/api/companions/*` - AI companion management

## 🚀 Deployment

The application is configured for deployment on:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **GitHub Pages**

## 📄 License

This project is part of the GDG Hackathon and is open source.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support or questions, please open an issue in the GitHub repository.
