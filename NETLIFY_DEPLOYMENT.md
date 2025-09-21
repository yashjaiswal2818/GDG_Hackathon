# Netlify Deployment Guide

## 🚀 Quick Deployment Steps

### 1. **Connect Repository to Netlify**
- Go to [Netlify](https://netlify.com)
- Click "New site from Git"
- Connect your GitHub repository: `yashjaiswal2818/GDG_Hackathon`
- Select the `main` branch

### 2. **Build Settings**
- **Build command**: `npm run build:netlify`
- **Publish directory**: `.next`
- **Node version**: 18

### 3. **Environment Variables**
Add these in Netlify Dashboard > Site settings > Environment variables:

```
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
```

### 4. **Deploy**
- Click "Deploy site"
- Wait for build to complete

## 🔧 Troubleshooting

### **Build Failures**
If the build fails, try these solutions:

1. **Clear Netlify Cache**
   - Go to Site settings > Build & deploy > Post processing
   - Clear cache and retry

2. **Check Environment Variables**
   - Ensure all required environment variables are set
   - Verify API keys are valid

3. **Node Version Issues**
   - Set Node version to 18 in build settings
   - Or add `.nvmrc` file with `18` content

### **Common Issues**

#### **Sentry Configuration Error**
- The build uses `next.config.netlify.ts` which disables Sentry
- This prevents Sentry-related build failures

#### **Missing Dependencies**
- All dependencies are included in `package.json`
- Netlify will install them automatically

#### **API Key Issues**
- Make sure to add environment variables in Netlify dashboard
- Don't commit API keys to the repository

## 📋 Required Environment Variables

### **Essential (for basic functionality)**
- `OPENAI_API_KEY` - Required for Startup Agent
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - For authentication
- `CLERK_SECRET_KEY` - For authentication

### **Optional (for enhanced features)**
- `GEMINI_API_KEY` - For enhanced image generation
- `NEXT_PUBLIC_SUPABASE_URL` - For database features
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - For database features
- `NEXT_PUBLIC_VAPI_PUBLIC_KEY` - For voice features

## 🎯 Features Available After Deployment

### **Without API Keys**
- ✅ Basic UI and navigation
- ✅ Feature showcase pages
- ❌ AI-powered features (will show fallback messages)

### **With OpenAI API Key**
- ✅ Complete Startup Agent functionality
- ✅ All 7 AI agents working
- ✅ Real-time AI generation

### **With All API Keys**
- ✅ Full platform functionality
- ✅ Voice conversations
- ✅ Image generation
- ✅ Document processing

## 🔗 Post-Deployment

1. **Test the deployment**
   - Visit your Netlify URL
   - Test all features
   - Check console for errors

2. **Custom Domain (Optional)**
   - Add custom domain in Netlify settings
   - Update Clerk domain settings

3. **Monitor Performance**
   - Check Netlify analytics
   - Monitor API usage

## 📞 Support

If you encounter issues:
1. Check Netlify build logs
2. Verify environment variables
3. Test locally with `npm run build:netlify`
4. Check the GitHub repository for updates
