import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        remotePatterns: [
            { hostname: 'img.clerk.com' },
            { hostname: 'oaidalleapiprodscus.blob.core.windows.net' },
            { hostname: 'generativelanguage.googleapis.com' }
        ]
    },
    // Disable Sentry for Netlify deployment
    serverExternalPackages: ['@sentry/nextjs']
};

export default nextConfig;
