"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Lightbulb,
    TrendingUp,
    Palette,
    Calculator,
    FileText,
    Presentation,
    Sparkles,
    Clock,
    CheckCircle,
    Loader2,
    BarChart3,
    PieChart,
    TrendingDown,
    Users,
    DollarSign,
    Target,
    ChevronDown,
    ChevronRight,
    Eye,
    Download,
    Activity,
    Zap,
    Image,
    Mic
} from "lucide-react";

interface StartupIdea {
    description: string;
    industry?: string;
    targetMarket?: string;
}

interface AgentStatus {
    id: string;
    name: string;
    icon: React.ReactNode;
    status: 'pending' | 'running' | 'completed' | 'error';
    progress: number;
    result?: any;
}

// Helper function to render formatted agent results
const renderAgentResults = (agentId: string, result: any) => {
    switch (agentId) {
        case 'market':
            return <MarketIntelligenceResults result={result} />;
        case 'brand':
            return <BrandArchitectResults result={result} />;
        case 'financial':
            return <FinancialStrategistResults result={result} />;
        case 'storytelling':
            return <StorytellingResults result={result} />;
        case 'presentation':
            return <PresentationResults result={result} />;
        case 'image':
            return <ImageGeneratorResults result={result} />;
        case 'audio':
            return <AudioGeneratorResults result={result} />;
        default:
            return <div className="text-muted-foreground">No results available</div>;
    }
};

// Market Intelligence Results Component
const MarketIntelligenceResults = ({ result }: { result: any }) => {
    const formatAnalysis = (analysis: string) => {
        // Clean up the analysis text and format it properly
        const cleanAnalysis = analysis
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
            .replace(/\n\n/g, '\n') // Remove double line breaks
            .trim();

        const sections = cleanAnalysis.split(/\d+\.\s+/).filter(section => section.trim().length > 0);

        return sections.map((section, index) => {
            const lines = section.split('\n').filter(line => line.trim().length > 0);
            const title = lines[0]?.replace(/^[:\s]*/, '') || `Section ${index + 1}`;
            const content = lines.slice(1);

            return (
                <div key={index} className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        {title}
                    </h3>
                    <div className="text-gray-700 leading-relaxed">
                        {content.length > 0 ? (
                            <ul className="space-y-2 ml-4">
                                {content.map((line, lineIndex) => (
                                    <li key={lineIndex} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                        <span>{line.replace(/^[-•]\s*/, '').trim()}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 italic">No additional details available</p>
                        )}
                    </div>
                </div>
            );
        });
    };

    // Generate sample data for charts
    const marketSizeData = [
        { name: 'TAM', value: 85, color: '#3B82F6', amount: '$2.5B' },
        { name: 'SAM', value: 60, color: '#10B981', amount: '$180M' },
        { name: 'SOM', value: 25, color: '#F59E0B', amount: '$45M' }
    ];

    const searchTrendsData = [
        { month: 'Jan', searches: 1200 },
        { month: 'Feb', searches: 1350 },
        { month: 'Mar', searches: 1500 },
        { month: 'Apr', searches: 1800 },
        { month: 'May', searches: 2200 },
        { month: 'Jun', searches: 2500 }
    ];

    return (
        <div className="space-y-6">
            {/* Analysis */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                {formatAnalysis(result.analysis)}
            </div>

            {/* Enhanced Charts and Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Search Trends Chart */}
                <Card className="bg-white/10 border-white/20 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-gray-900">Search Trends</h4>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Monthly Searches</span>
                            <span className="font-semibold text-gray-900">{result.searchTrends?.monthlySearches?.toLocaleString() || '7,506'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Trend</span>
                            <span className={`font-semibold ${result.searchTrends?.trendDirection === 'increasing' ? 'text-green-600' : 'text-gray-500'}`}>
                                {result.searchTrends?.trendDirection || 'increasing'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Peak Season</span>
                            <span className="font-semibold text-gray-900">{result.searchTrends?.peakSeason || 'Q4'}</span>
                        </div>
                        {/* Mini Bar Chart */}
                        <div className="mt-4">
                            <div className="flex items-end gap-1 h-16">
                                {searchTrendsData.map((data, index) => (
                                    <div key={index} className="flex flex-col items-center flex-1">
                                        <div
                                            className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t w-full transition-all duration-500"
                                            style={{ height: `${(data.searches / 2500) * 100}%` }}
                                        />
                                        <span className="text-xs text-gray-600 mt-1">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Market Overview */}
                <Card className="bg-white/10 border-white/20 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">Market Overview</h4>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Competitors</span>
                            <span className="font-semibold text-gray-900">{result.competitorCount || '16'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Market Maturity</span>
                            <span className="font-semibold text-gray-900 capitalize">{result.marketMaturity || 'emerging'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Barriers to Entry</span>
                            <span className="font-semibold text-gray-900 capitalize">{result.barriersToEntry || 'low'}</span>
                        </div>
                        {/* Competitor Bar */}
                        <div className="mt-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm text-gray-600">Market Competition</span>
                                <span className="text-sm text-gray-900 font-medium">Medium</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Market Size Pie Chart */}
                <Card className="bg-white/10 border-white/20 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <PieChart className="w-5 h-5 text-purple-600" />
                        <h4 className="font-semibold text-gray-900">Market Size</h4>
                    </div>
                    <div className="space-y-3">
                        {marketSizeData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-sm text-gray-600">{item.name}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-gray-900">{item.amount}</div>
                                    <div className="text-xs text-gray-500">{item.value}%</div>
                                </div>
                            </div>
                        ))}
                        {/* Enhanced Visual Pie Representation */}
                        <div className="mt-4 flex justify-center">
                            <div className="relative w-24 h-24">
                                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="8"
                                        strokeDasharray={`${85 * 2.51} 251`} strokeDashoffset="0" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="8"
                                        strokeDasharray={`${60 * 2.51} 251`} strokeDashoffset={`-${85 * 2.51}`} />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="8"
                                        strokeDasharray={`${25 * 2.51} 251`} strokeDashoffset={`-${145 * 2.51}`} />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Additional Market Analysis Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Competitor Analysis Pie Chart */}
                <Card className="bg-white/10 border-white/20 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <PieChart className="w-5 h-5 text-red-600" />
                        <h4 className="font-semibold text-gray-900">Competitor Market Share</h4>
                    </div>
                    <div className="space-y-3">
                        {[
                            { name: 'Market Leader', value: 35, color: '#EF4444', amount: '35%' },
                            { name: 'Major Players', value: 25, color: '#F59E0B', amount: '25%' },
                            { name: 'Emerging Startups', value: 20, color: '#3B82F6', amount: '20%' },
                            { name: 'Others', value: 20, color: '#6B7280', amount: '20%' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-sm text-gray-600">{item.name}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-gray-900">{item.amount}</div>
                                </div>
                            </div>
                        ))}
                        {/* Competitor Pie Chart */}
                        <div className="mt-4 flex justify-center">
                            <div className="relative w-24 h-24">
                                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#EF4444" strokeWidth="8"
                                        strokeDasharray={`${35 * 2.51} 251`} strokeDashoffset="0" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="8"
                                        strokeDasharray={`${25 * 2.51} 251`} strokeDashoffset={`-${35 * 2.51}`} />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="8"
                                        strokeDasharray={`${20 * 2.51} 251`} strokeDashoffset={`-${60 * 2.51}`} />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#6B7280" strokeWidth="8"
                                        strokeDasharray={`${20 * 2.51} 251`} strokeDashoffset={`-${80 * 2.51}`} />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Market Segmentation Chart */}
                <Card className="bg-white/10 border-white/20 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-semibold text-gray-900">Market Segmentation</h4>
                    </div>
                    <div className="space-y-4">
                        {[
                            { segment: 'Enterprise', size: 45, color: '#8B5CF6', value: '$1.1B' },
                            { segment: 'SMB', size: 30, color: '#3B82F6', value: '$750M' },
                            { segment: 'Consumer', size: 25, color: '#10B981', value: '$625M' }
                        ].map((item, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-600">{item.segment}</span>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-gray-900">{item.value}</div>
                                        <div className="text-xs text-gray-500">{item.size}%</div>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="h-3 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${item.size}%`,
                                            background: `linear-gradient(90deg, ${item.color}, ${item.color}CC)`
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

// Brand Architect Results Component
const BrandArchitectResults = ({ result }: { result: any }) => {
    const formatStrategy = (strategy: string) => {
        // Clean up the strategy text and format it properly
        const cleanStrategy = strategy
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
            .replace(/\n\n/g, '\n') // Remove double line breaks
            .trim();

        const sections = cleanStrategy.split(/\d+\.\s+/).filter(section => section.trim().length > 0);

        return sections.map((section, index) => {
            const lines = section.split('\n').filter(line => line.trim().length > 0);
            const title = lines[0]?.replace(/^[:\s]*/, '') || `Section ${index + 1}`;
            const content = lines.slice(1);

            return (
                <div key={index} className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Palette className="w-5 h-5 text-purple-600" />
                        {title}
                    </h3>
                    <div className="text-gray-700 leading-relaxed">
                        {content.length > 0 ? (
                            <ul className="space-y-2 ml-4">
                                {content.map((line, lineIndex) => (
                                    <li key={lineIndex} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                                        <span>{line.replace(/^[-•]\s*/, '').trim()}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 italic">No additional details available</p>
                        )}
                    </div>
                </div>
            );
        });
    };

    // Enhanced color palette data
    const colorPalette = [
        { name: 'Primary', color: '#3B82F6', usage: 'Main brand color' },
        { name: 'Secondary', color: '#F59E0B', usage: 'Accent color' },
        { name: 'Accent', color: '#8B5CF6', usage: 'Highlights' },
        { name: 'Background', color: '#0F172A', usage: 'Dark backgrounds' },
        { name: 'Text', color: '#E2E8F0', usage: 'Primary text' }
    ];

    const typographyData = [
        { type: 'Heading', font: 'Inter Bold', size: '32px', weight: '700' },
        { type: 'Subheading', font: 'Inter SemiBold', size: '24px', weight: '600' },
        { type: 'Body', font: 'Inter Regular', size: '16px', weight: '400' },
        { type: 'Caption', font: 'Inter Medium', size: '14px', weight: '500' }
    ];

    return (
        <div className="space-y-6">
            {/* Strategy */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                {formatStrategy(result.strategy)}
            </div>

            {/* Brand Elements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Color Palette */}
                <Card className="bg-white/10 border-white/20 p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
                        <Palette className="w-5 h-5 text-purple-600" />
                        Color Palette
                    </h4>
                    <div className="space-y-3">
                        {colorPalette.map((color, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                                <div
                                    className="w-12 h-12 rounded-xl border-2 border-white/20 shadow-lg"
                                    style={{ backgroundColor: color.color }}
                                />
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900 capitalize">{color.name}</div>
                                    <div className="text-xs text-gray-600">{color.color}</div>
                                    <div className="text-xs text-gray-500">{color.usage}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Typography */}
                <Card className="bg-white/10 border-white/20 p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Typography
                    </h4>
                    <div className="space-y-3">
                        {typographyData.map((font, index) => (
                            <div key={index} className="p-3 bg-white/5 rounded-xl border border-white/10">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm font-medium text-gray-900 capitalize">{font.type}</span>
                                    <span className="text-xs text-gray-500">{font.weight}</span>
                                </div>
                                <div className="text-sm text-gray-700 mb-1">{font.font}</div>
                                <div className="text-xs text-gray-500">{font.size}</div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Logo and Brand Guidelines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo */}
                <Card className="bg-white/10 border-white/20 p-6">
                    <h4 className="font-semibold mb-4 text-gray-900">Generated Logo</h4>
                    <div className="flex justify-center items-center h-32 bg-white/5 rounded-xl border border-white/10">
                        {result.logoUrl ? (
                            <img
                                src={result.logoUrl}
                                alt="Generated Logo"
                                className="max-w-full max-h-full object-contain"
                            />
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mx-auto mb-2 flex items-center justify-center">
                                    <Palette className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-sm text-gray-600">Logo Preview</div>
                            </div>
                        )}
                    </div>
                </Card>

                {/* Brand Guidelines */}
                <Card className="bg-white/10 border-white/20 p-6">
                    <h4 className="font-semibold mb-4 text-gray-900">Brand Guidelines</h4>
                    <div className="space-y-3">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-sm font-medium text-gray-900 mb-1">Logo Usage</div>
                            <div className="text-xs text-gray-600">Minimum size: 24px, Clear space: 2x logo height</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-sm font-medium text-gray-900 mb-1">Color Contrast</div>
                            <div className="text-xs text-gray-600">WCAG AA compliant, 4.5:1 minimum ratio</div>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-sm font-medium text-gray-900 mb-1">Typography Scale</div>
                            <div className="text-xs text-gray-600">1.25x ratio, consistent hierarchy</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

// Financial Strategist Results Component
const FinancialStrategistResults = ({ result }: { result: any }) => {
    const formatAnalysis = (analysis: string) => {
        // Clean up the analysis text and format it properly
        const cleanAnalysis = analysis
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
            .replace(/\n\n/g, '\n') // Remove double line breaks
            .trim();

        const sections = cleanAnalysis.split(/\d+\.\s+/).filter(section => section.trim().length > 0);

        return sections.map((section, index) => {
            const lines = section.split('\n').filter(line => line.trim().length > 0);
            const title = lines[0]?.replace(/^[:\s]*/, '') || `Section ${index + 1}`;
            const content = lines.slice(1);

            return (
                <div key={index} className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-green-600" />
                        {title}
                    </h3>
                    <div className="text-gray-700 leading-relaxed">
                        {content.length > 0 ? (
                            <ul className="space-y-2 ml-4">
                                {content.map((line, lineIndex) => (
                                    <li key={lineIndex} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                                        <span>{line.replace(/^[-•]\s*/, '').trim()}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 italic">No additional details available</p>
                        )}
                    </div>
                </div>
            );
        });
    };

    // Generate sample financial data
    const revenueData = [
        { year: 'Year 1', revenue: 100000, users: 1000, color: '#10B981' },
        { year: 'Year 2', revenue: 500000, users: 5000, color: '#3B82F6' },
        { year: 'Year 3', revenue: 2000000, users: 15000, color: '#8B5CF6' },
        { year: 'Year 4', revenue: 5000000, users: 30000, color: '#F59E0B' },
        { year: 'Year 5', revenue: 10000000, users: 50000, color: '#EF4444' }
    ];

    const metricsData = [
        { name: 'CAC', value: '$50', icon: '👥', color: '#3B82F6' },
        { name: 'LTV', value: '$500', icon: '💰', color: '#10B981' },
        { name: 'MRR Growth', value: '25%', icon: '📈', color: '#8B5CF6' },
        { name: 'Churn Rate', value: '7%', icon: '📉', color: '#F59E0B' }
    ];

    return (
        <div className="space-y-6">
            {/* Analysis */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                {formatAnalysis(result.analysis)}
            </div>

            {/* Enhanced Financial Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue Projections Chart */}
                <Card className="bg-white/10 border-white/20 p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        Revenue Projections
                    </h4>
                    <div className="space-y-4">
                        {revenueData.map((data, index) => {
                            const maxRevenue = Math.max(...revenueData.map(d => d.revenue));
                            const percentage = (data.revenue / maxRevenue) * 100;

                            return (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-foreground capitalize">{data.year}</span>
                                        <div className="text-right">
                                            <div className="font-semibold text-foreground">${(data.revenue / 1000).toFixed(0)}K</div>
                                            <div className="text-xs text-muted-foreground">{data.users?.toLocaleString()} users</div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-3">
                                        <div
                                            className="h-3 rounded-full transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                                background: `linear-gradient(90deg, ${data.color}, ${data.color}CC)`
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* Key Metrics */}
                <Card className="bg-white/10 border-white/20 p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
                        <DollarSign className="w-5 h-5 text-blue-400" />
                        Key Metrics
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                        {metricsData.map((metric, index) => (
                            <div key={index} className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                                <div className="text-2xl mb-1">{metric.icon}</div>
                                <div className="text-sm text-muted-foreground mb-1">{metric.name}</div>
                                <div className="text-lg font-bold text-foreground">{metric.value}</div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Additional Financial Analysis Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue Streams Pie Chart */}
                <Card className="bg-white/10 border-white/20 p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                        <PieChart className="w-5 h-5 text-yellow-400" />
                        Revenue Streams
                    </h4>
                    <div className="space-y-3">
                        {[
                            { name: 'Subscription', value: 60, color: '#10B981', amount: '60%' },
                            { name: 'Transaction Fees', value: 25, color: '#3B82F6', amount: '25%' },
                            { name: 'Premium Features', value: 15, color: '#8B5CF6', amount: '15%' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-sm text-gray-300">{item.name}</span>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-semibold text-white">{item.amount}</div>
                                </div>
                            </div>
                        ))}
                        {/* Revenue Streams Pie Chart */}
                        <div className="mt-4 flex justify-center">
                            <div className="relative w-24 h-24">
                                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#374151" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="8"
                                        strokeDasharray={`${60 * 2.51} 251`} strokeDashoffset="0" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#3B82F6" strokeWidth="8"
                                        strokeDasharray={`${25 * 2.51} 251`} strokeDashoffset={`-${60 * 2.51}`} />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#8B5CF6" strokeWidth="8"
                                        strokeDasharray={`${15 * 2.51} 251`} strokeDashoffset={`-${85 * 2.51}`} />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Cost Structure Chart */}
                <Card className="bg-white/10 border-white/20 p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                        <BarChart3 className="w-5 h-5 text-red-400" />
                        Cost Structure
                    </h4>
                    <div className="space-y-4">
                        {[
                            { category: 'Development', percentage: 40, color: '#EF4444', amount: '$300K' },
                            { category: 'Marketing', percentage: 30, color: '#F59E0B', amount: '$225K' },
                            { category: 'Operations', percentage: 20, color: '#3B82F6', amount: '$150K' },
                            { category: 'Admin', percentage: 10, color: '#6B7280', amount: '$75K' }
                        ].map((item, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-300">{item.category}</span>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-white">{item.amount}</div>
                                        <div className="text-xs text-gray-400">{item.percentage}%</div>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-3">
                                    <div
                                        className="h-3 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${item.percentage}%`,
                                            background: `linear-gradient(90deg, ${item.color}, ${item.color}CC)`
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Funding Information */}
            <Card className="bg-white/10 border-white/20 p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                    <Target className="w-5 h-5 text-purple-400" />
                    Funding Requirements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
                        <div className="text-3xl font-bold text-green-400 mb-1">$750K</div>
                        <div className="text-sm text-gray-300">Total Funding</div>
                        <div className="text-xs text-gray-400 mt-1">Seed Round</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30">
                        <div className="text-3xl font-bold text-blue-400 mb-1">18</div>
                        <div className="text-sm text-gray-300">Months Runway</div>
                        <div className="text-xs text-gray-400 mt-1">Burn Rate: $42K/mo</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                        <div className="text-3xl font-bold text-purple-400 mb-1">$5M</div>
                        <div className="text-sm text-gray-300">Valuation</div>
                        <div className="text-xs text-gray-400 mt-1">Pre-money</div>
                    </div>
                </div>
            </Card>

            {/* Financial Projections Timeline */}
            <Card className="bg-white/10 border-white/20 p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-white">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    5-Year Financial Projections
                </h4>
                <div className="space-y-4">
                    {[
                        { year: 'Year 1', revenue: 100, users: 1, profit: -50, color: '#EF4444' },
                        { year: 'Year 2', revenue: 500, users: 5, profit: 50, color: '#F59E0B' },
                        { year: 'Year 3', revenue: 2000, users: 15, profit: 400, color: '#3B82F6' },
                        { year: 'Year 4', revenue: 5000, users: 30, profit: 1500, color: '#10B981' },
                        { year: 'Year 5', revenue: 10000, users: 50, profit: 4000, color: '#8B5CF6' }
                    ].map((data, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 items-center p-3 bg-white/5 rounded-lg">
                            <div className="text-sm font-medium text-foreground">{data.year}</div>
                            <div className="text-center">
                                <div className="text-sm font-semibold text-foreground">${data.revenue}K</div>
                                <div className="text-xs text-muted-foreground">Revenue</div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-semibold text-foreground">{data.users}K</div>
                                <div className="text-xs text-muted-foreground">Users</div>
                            </div>
                            <div className="text-center">
                                <div className={`text-sm font-semibold ${data.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    ${data.profit}K
                                </div>
                                <div className="text-xs text-muted-foreground">Profit</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

// Storytelling Results Component
const StorytellingResults = ({ result }: { result: any }) => {
    const formatStrategy = (strategy: string) => {
        const sections = strategy.split('\n\n');
        return sections.map((section, index) => {
            const lines = section.split('\n');
            const title = lines[0];
            const content = lines.slice(1);

            return (
                <div key={index} className="mb-6">
                    <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {title}
                    </h3>
                    <ul className="space-y-2 ml-4">
                        {content.map((line, lineIndex) => (
                            <li key={lineIndex} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-muted-foreground">{line.replace(/^-\s*/, '')}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        });
    };

    return (
        <div className="space-y-6">
            {/* Strategy */}
            <div className="prose prose-slate max-w-none">
                {formatStrategy(result.strategy)}
            </div>

            {/* Key Narratives */}
            {result.narratives && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(result.narratives).map(([type, content]: [string, any]) => (
                        <Card key={type} className="p-4">
                            <h4 className="font-semibold mb-3 capitalize">{type.replace(/([A-Z])/g, ' $1')}</h4>
                            <p className="text-sm text-muted-foreground">{content}</p>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

// Presentation Results Component
const PresentationResults = ({ result }: { result: any }) => {
    const formatStrategy = (strategy: string) => {
        const sections = strategy.split('\n\n');
        return sections.map((section, index) => {
            const lines = section.split('\n');
            const title = lines[0];
            const content = lines.slice(1);

            return (
                <div key={index} className="mb-6">
                    <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                        <Presentation className="w-5 h-5" />
                        {title}
                    </h3>
                    <ul className="space-y-2 ml-4">
                        {content.map((line, lineIndex) => (
                            <li key={lineIndex} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span className="text-muted-foreground">{line.replace(/^-\s*/, '')}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        });
    };

    return (
        <div className="space-y-6">
            {/* Strategy */}
            <div className="prose prose-slate max-w-none">
                {formatStrategy(result.strategy)}
            </div>

            {/* Slide Structure */}
            {result.slideStructure && (
                <Card className="p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Presentation className="w-5 h-5" />
                        Pitch Deck Structure
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {result.slideStructure.map((slide: any, index: number) => (
                            <div key={index} className="border rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                                        {slide.slide}
                                    </div>
                                    <h5 className="font-medium">{slide.title}</h5>
                                </div>
                                <p className="text-sm text-muted-foreground">{slide.content}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};

const StartupAgentPage = () => {
    const [startupIdea, setStartupIdea] = useState<StartupIdea>({ description: "" });
    const [isGenerating, setIsGenerating] = useState(false);
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
    const [agents, setAgents] = useState<AgentStatus[]>([
        {
            id: 'market',
            name: 'Market Intelligence',
            icon: <TrendingUp className="w-5 h-5" />,
            status: 'pending',
            progress: 0
        },
        {
            id: 'brand',
            name: 'Brand Architect',
            icon: <Palette className="w-5 h-5" />,
            status: 'pending',
            progress: 0
        },
        {
            id: 'financial',
            name: 'Financial Strategist',
            icon: <Calculator className="w-5 h-5" />,
            status: 'pending',
            progress: 0
        },
        {
            id: 'storytelling',
            name: 'Storytelling Agent',
            icon: <FileText className="w-5 h-5" />,
            status: 'pending',
            progress: 0
        },
        {
            id: 'presentation',
            name: 'Presentation Agent',
            icon: <Presentation className="w-5 h-5" />,
            status: 'pending',
            progress: 0
        },
        {
            id: 'image',
            name: 'Image Generator',
            icon: <Image className="w-5 h-5" />,
            status: 'pending',
            progress: 0
        },
        {
            id: 'audio',
            name: 'Audio Generator',
            icon: <Mic className="w-5 h-5" />,
            status: 'pending',
            progress: 0
        }
    ]);

    const handleGeneratePackage = async () => {
        if (!startupIdea.description.trim()) return;

        setIsGenerating(true);

        // Reset all agents
        setAgents(prev => prev.map(agent => ({
            ...agent,
            status: 'pending' as const,
            progress: 0,
            result: undefined
        })));

        try {
            // Start all agents in parallel
            const agentPromises = agents.map(agent => runAgent(agent.id, startupIdea.description));
            await Promise.all(agentPromises);
        } catch (error) {
            console.error("Error generating startup package:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const runAgent = async (agentId: string, idea: string) => {
        // Update agent status to running
        setAgents(prev => prev.map(agent =>
            agent.id === agentId
                ? { ...agent, status: 'running', progress: 10 }
                : agent
        ));

        try {
            const response = await fetch(`/api/startup-agent/${agentId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idea })
            });

            if (!response.ok) throw new Error(`Agent ${agentId} failed`);

            const result = await response.json();

            // Update agent status to completed
            setAgents(prev => prev.map(agent =>
                agent.id === agentId
                    ? { ...agent, status: 'completed', progress: 100, result }
                    : agent
            ));
        } catch (error) {
            // Update agent status to error
            setAgents(prev => prev.map(agent =>
                agent.id === agentId
                    ? { ...agent, status: 'error', progress: 0 }
                    : agent
            ));
        }
    };

    const getStatusIcon = (status: AgentStatus['status']) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4 text-muted-foreground" />;
            case 'running': return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
            case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'error': return <div className="w-4 h-4 bg-red-500 rounded-full" />;
        }
    };

    const getStatusColor = (status: AgentStatus['status']) => {
        switch (status) {
            case 'pending': return 'border-muted-foreground/20';
            case 'running': return 'border-blue-500/50 bg-blue-500/5';
            case 'completed': return 'border-green-500/50 bg-green-500/5';
            case 'error': return 'border-red-500/50 bg-red-500/5';
        }
    };

    const toggleCard = (agentId: string) => {
        setExpandedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(agentId)) {
                newSet.delete(agentId);
            } else {
                newSet.add(agentId);
            }
            return newSet;
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>

                {/* Floating Particles */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-400 rounded-full opacity-50 animate-pulse animation-delay-4000"></div>
                <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/2 w-2.5 h-2.5 bg-indigo-400 rounded-full opacity-30 animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center p-4 md:p-8">
                <div className="w-full max-w-7xl space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-6 pt-8">
                        <div className="flex items-center justify-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                                <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full">
                                    <Sparkles className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '3s' }} />
                                </div>
                            </div>
                            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                                Startup Agent
                            </h1>
                        </div>
                        <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Transform your startup idea into a complete investor package with
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold"> AI-powered agents</span> working in parallel
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>7 Specialized AI Agents</span>
                            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                            <span>8-10 Minutes Generation Time</span>
                            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                            <span>Complete Investor Package</span>
                        </div>
                    </div>

                    {/* Input Section */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
                        <Card className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                            <CardHeader className="text-center pb-6">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                                        <Lightbulb className="w-6 h-6 text-white" />
                                    </div>
                                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Your Startup Idea
                                    </CardTitle>
                                </div>
                                <CardDescription className="text-lg text-gray-300 max-w-2xl mx-auto">
                                    Describe your startup idea in one sentence. Our AI agents will generate a complete investor package.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 px-8 pb-8">
                                <div className="relative">
                                    <Textarea
                                        placeholder="I want to build an app that delivers midnight snacks in Mumbai..."
                                        value={startupIdea.description}
                                        onChange={(e) => setStartupIdea({ ...startupIdea, description: e.target.value })}
                                        className="min-h-[120px] resize-none bg-black/30 border-white/20 rounded-2xl text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 text-lg"
                                        disabled={isGenerating}
                                    />
                                    <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                                        {startupIdea.description.length}/500
                                    </div>
                                </div>
                                <Button
                                    onClick={handleGeneratePackage}
                                    disabled={!startupIdea.description.trim() || isGenerating}
                                    className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                            <span className="animate-pulse">Generating Package...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5 mr-3" />
                                            Generate Complete Package
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Agent Status */}
                    {isGenerating && (
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                            <Card className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                                <CardHeader className="text-center">
                                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center justify-center gap-3">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                                            <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-full">
                                                <Sparkles className="w-6 h-6 text-white animate-spin" style={{ animationDuration: '2s' }} />
                                            </div>
                                        </div>
                                        AI Agents Working
                                    </CardTitle>
                                    <CardDescription className="text-lg text-gray-300">
                                        Our specialized agents are analyzing your idea and generating your investor package
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-8 pb-8">
                                    <div className="space-y-4">
                                        {agents.map((agent) => (
                                            <div
                                                key={agent.id}
                                                className={`relative p-6 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 ${agent.status === 'pending' ? 'bg-gray-800/50 border-gray-600/50' :
                                                    agent.status === 'running' ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500/50 shadow-lg shadow-blue-500/20' :
                                                        agent.status === 'completed' ? 'bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/50 shadow-lg shadow-green-500/20' :
                                                            'bg-gradient-to-br from-red-900/50 to-pink-900/50 border-red-500/50 shadow-lg shadow-red-500/20'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className={`p-3 rounded-xl ${agent.status === 'pending' ? 'bg-gray-700' :
                                                        agent.status === 'running' ? 'bg-gradient-to-r from-blue-500 to-purple-500' :
                                                            agent.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                                                'bg-gradient-to-r from-red-500 to-pink-500'
                                                        }`}>
                                                        {agent.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="font-bold text-white text-lg">{agent.name}</span>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            {getStatusIcon(agent.status)}
                                                            <span className="text-sm text-gray-300">
                                                                {agent.status === 'pending' ? 'Waiting...' :
                                                                    agent.status === 'running' ? 'Processing...' :
                                                                        agent.status === 'completed' ? 'Completed!' :
                                                                            'Error occurred'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {agent.status === 'running' && (
                                                    <div className="space-y-2">
                                                        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                                                            <div
                                                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 relative"
                                                                style={{ width: `${agent.progress}%` }}
                                                            >
                                                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right text-sm text-gray-400">{agent.progress}%</div>
                                                    </div>
                                                )}
                                                {agent.status === 'completed' && (
                                                    <div className="flex items-center gap-2 text-green-400">
                                                        <CheckCircle className="w-5 h-5" />
                                                        <span className="font-medium">Ready!</span>
                                                    </div>
                                                )}
                                                {agent.status === 'error' && (
                                                    <div className="flex items-center gap-2 text-red-400">
                                                        <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                                                        <span className="font-medium">Failed</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Results Section */}
                    {agents.some(agent => agent.status === 'completed') && (
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
                            <Card className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                                <CardHeader className="text-center pb-8">
                                    <div className="flex items-center justify-between">
                                        <div className="text-center flex-1">
                                            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent flex items-center justify-center gap-3 mb-4">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                                                    <div className="relative bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full">
                                                        <Sparkles className="w-8 h-8 text-white" />
                                                    </div>
                                                </div>
                                                Generated Package
                                            </CardTitle>
                                            <CardDescription className="text-xl text-gray-300">
                                                Click on any agent card below to view detailed results
                                                <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 font-bold text-2xl">
                                                    ({agents.filter(agent => agent.status === 'completed').length}/7 completed)
                                                </span>
                                            </CardDescription>
                                        </div>
                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                onClick={() => {
                                                    const completedAgents = agents.filter(agent => agent.status === 'completed').map(agent => agent.id);
                                                    setExpandedCards(new Set(completedAgents));
                                                }}
                                                className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-green-500/50 text-green-400 hover:from-green-600/30 hover:to-blue-600/30 hover:border-green-400/70 rounded-xl"
                                            >
                                                Expand All
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="lg"
                                                onClick={() => setExpandedCards(new Set())}
                                                className="bg-gradient-to-r from-gray-600/20 to-gray-700/20 border-gray-500/50 text-gray-400 hover:from-gray-600/30 hover:to-gray-700/30 hover:border-gray-400/70 rounded-xl"
                                            >
                                                Collapse All
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-8 pb-8">
                                    <div className="space-y-6">
                                        {agents.map((agent) => (
                                            agent.status === 'completed' && agent.result && (
                                                <div key={agent.id} className="space-y-4">
                                                    {/* Agent Summary Card */}
                                                    <Card
                                                        className={`cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${expandedCards.has(agent.id)
                                                            ? 'ring-2 ring-purple-500 shadow-2xl shadow-purple-500/25 bg-gradient-to-br from-purple-900/30 to-pink-900/30'
                                                            : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-600/50 hover:from-purple-900/30 hover:to-pink-900/30'
                                                            }`}
                                                        onClick={() => toggleCard(agent.id)}
                                                    >
                                                        <CardContent className="p-6">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-4">
                                                                    <div className={`p-4 rounded-2xl ${agent.id === 'market' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                                                                        agent.id === 'brand' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                                                                            agent.id === 'financial' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                                                                agent.id === 'storytelling' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                                                                                    'bg-gradient-to-r from-indigo-500 to-purple-500'
                                                                        }`}>
                                                                        {agent.icon}
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="font-bold text-white text-lg">{agent.name}</h3>
                                                                        <p className="text-sm text-gray-300">
                                                                            {agent.id === 'market' && 'Market analysis & trends'}
                                                                            {agent.id === 'brand' && 'Brand strategy & visual identity'}
                                                                            {agent.id === 'financial' && 'Financial projections & funding'}
                                                                            {agent.id === 'storytelling' && 'Pitch narratives & messaging'}
                                                                            {agent.id === 'presentation' && 'Pitch deck structure & design'}
                                                                            {agent.id === 'image' && 'Visual content & image prompts'}
                                                                            {agent.id === 'audio' && 'Voice scripts & audio strategy'}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex items-center gap-2 text-green-400">
                                                                        <CheckCircle className="w-6 h-6" />
                                                                        <span className="text-sm font-medium">Ready</span>
                                                                    </div>
                                                                    {expandedCards.has(agent.id) ? (
                                                                        <ChevronDown className="w-5 h-5 text-purple-400" />
                                                                    ) : (
                                                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Expanded Content */}
                                                    {expandedCards.has(agent.id) && (
                                                        <Card className="bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl">
                                                            <CardHeader className="pb-6">
                                                                <CardTitle className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className={`p-3 rounded-xl ${agent.id === 'market' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                                                                            agent.id === 'brand' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                                                                                agent.id === 'financial' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                                                                    agent.id === 'storytelling' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                                                                                        'bg-gradient-to-r from-indigo-500 to-purple-500'
                                                                            }`}>
                                                                            {agent.icon}
                                                                        </div>
                                                                        <div>
                                                                            <h3 className="text-2xl font-bold text-gray-900">{agent.name}</h3>
                                                                            <p className="text-gray-600">Detailed Results</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-3">
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/50 text-blue-400 hover:from-blue-600/30 hover:to-cyan-600/30 hover:border-blue-400/70 rounded-xl"
                                                                        >
                                                                            <Eye className="w-4 h-4 mr-2" />
                                                                            Preview
                                                                        </Button>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/50 text-green-400 hover:from-green-600/30 hover:to-emerald-600/30 hover:border-green-400/70 rounded-xl"
                                                                        >
                                                                            <Download className="w-4 h-4 mr-2" />
                                                                            Export
                                                                        </Button>
                                                                    </div>
                                                                </CardTitle>
                                                                <CardDescription className="text-lg text-gray-600">
                                                                    Comprehensive analysis and recommendations
                                                                </CardDescription>
                                                            </CardHeader>
                                                            <CardContent className="px-8 pb-8">
                                                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                                                    {renderAgentResults(agent.id, agent.result)}
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    )}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Image Generator Results Component
const ImageGeneratorResults = ({ result }: { result: any }) => {
    const formatStrategy = (strategy: string) => {
        // Clean up the strategy text and format it properly
        const cleanStrategy = strategy
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
            .replace(/\n\n/g, '\n') // Remove double line breaks
            .trim();

        const sections = cleanStrategy.split(/\d+\.\s+/).filter(section => section.trim().length > 0);

        return sections.map((section, index) => {
            const lines = section.split('\n').filter(line => line.trim().length > 0);
            const title = lines[0]?.replace(/^[:\s]*/, '') || `Section ${index + 1}`;
            const content = lines.slice(1);

            return (
                <div key={index} className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Image className="w-5 h-5 text-pink-600" />
                        {title}
                    </h3>
                    <div className="text-gray-700 leading-relaxed">
                        {content.length > 0 ? (
                            <ul className="space-y-2 ml-4">
                                {content.map((line, lineIndex) => (
                                    <li key={lineIndex} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0" />
                                        <span>{line.replace(/^[-•]\s*/, '').trim()}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 italic">No additional details available</p>
                        )}
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="space-y-6">
            {/* Billing Notice */}
            {result.imagePrompts && result.imagePrompts.some((prompt: any) => prompt.error === "Billing limit reached") && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <h4 className="font-semibold text-yellow-800">Image Generation Notice</h4>
                    </div>
                    <p className="text-sm text-yellow-700">
                        DALL-E 3 image generation is temporarily unavailable due to billing limits.
                        However, we're now using Gemini 2.5 Flash to generate actual images and enhance prompts, providing you with both real images and improved prompts for any AI image generator.
                    </p>
                </div>
            )}

            {/* Strategy */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                {formatStrategy(result.strategy)}
            </div>

            {/* Generated Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.imagePrompts && result.imagePrompts.map((prompt: any, index: number) => (
                    <Card key={index} className="bg-white/10 border-white/20 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Image className="w-5 h-5 text-pink-600" />
                            <h4 className="font-semibold text-foreground">{prompt.type}</h4>
                        </div>

                        {/* Enhanced Prompt Display */}
                        {prompt.revisedPrompt && prompt.revisedPrompt !== prompt.prompt && (
                            <div className="mb-4">
                                <div className="text-sm font-medium text-foreground mb-2">
                                    {prompt.source === "DALL-E 3" ? "DALL-E Revised Prompt:" :
                                        prompt.source === "Gemini 2.5 Flash" ? "Gemini Enhanced Prompt:" :
                                            prompt.source === "Gemini Enhanced" ? "Gemini Enhanced Prompt:" :
                                                "AI Enhanced Prompt:"}
                                </div>
                                <div className="text-sm text-muted-foreground bg-white/5 p-3 rounded-lg border border-white/10 italic">
                                    {prompt.revisedPrompt}
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            <div>
                                <div className="text-sm font-medium text-foreground mb-2">Prompt:</div>
                                <div className="text-sm text-muted-foreground bg-white/5 p-3 rounded-lg border border-white/10">
                                    {prompt.prompt}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-foreground mb-1">Usage:</div>
                                <div className="text-sm text-muted-foreground">{prompt.usage}</div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Color Recommendations */}
            <Card className="bg-white/10 border-white/20 p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
                    <Palette className="w-5 h-5 text-pink-600" />
                    Color Recommendations
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {result.colorRecommendations && Object.entries(result.colorRecommendations).map(([name, color]) => (
                        <div key={name} className="text-center">
                            <div
                                className="w-16 h-16 rounded-xl mx-auto mb-2 border-2 border-white/20 shadow-lg"
                                style={{ backgroundColor: color as string }}
                            />
                            <div className="text-sm font-medium text-gray-900 capitalize">{name}</div>
                            <div className="text-xs text-gray-600">{color as string}</div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Style Guidelines */}
            <Card className="bg-white/10 border-white/20 p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Style Guidelines
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.styleGuidelines && Object.entries(result.styleGuidelines).map(([type, guideline]) => (
                        <div key={type} className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-sm font-medium text-gray-900 capitalize mb-1">{type}</div>
                            <div className="text-sm text-gray-600">{guideline as string}</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

// Audio Generator Results Component
const AudioGeneratorResults = ({ result }: { result: any }) => {
    const formatStrategy = (strategy: string) => {
        // Clean up the strategy text and format it properly
        const cleanStrategy = strategy
            .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
            .replace(/\n\n/g, '\n') // Remove double line breaks
            .trim();

        const sections = cleanStrategy.split(/\d+\.\s+/).filter(section => section.trim().length > 0);

        return sections.map((section, index) => {
            const lines = section.split('\n').filter(line => line.trim().length > 0);
            const title = lines[0]?.replace(/^[:\s]*/, '') || `Section ${index + 1}`;
            const content = lines.slice(1);

            return (
                <div key={index} className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Mic className="w-5 h-5 text-orange-600" />
                        {title}
                    </h3>
                    <div className="text-gray-700 leading-relaxed">
                        {content.length > 0 ? (
                            <ul className="space-y-2 ml-4">
                                {content.map((line, lineIndex) => (
                                    <li key={lineIndex} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                                        <span>{line.replace(/^[-•]\s*/, '').trim()}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600 italic">No additional details available</p>
                        )}
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="space-y-6">
            {/* Strategy */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                {formatStrategy(result.strategy)}
            </div>

            {/* Audio Scripts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.scripts && result.scripts.map((script: any, index: number) => (
                    <Card key={index} className="bg-white/10 border-white/20 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Mic className="w-5 h-5 text-orange-600" />
                            <h4 className="font-semibold text-gray-900">{script.type}</h4>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <div className="text-sm font-medium text-gray-900 mb-2">Script:</div>
                                <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border">
                                    "{script.script}"
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Duration:</div>
                                    <div className="text-sm text-gray-600">{script.duration}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">Usage:</div>
                                    <div className="text-sm text-gray-600">{script.usage}</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Voice Guidelines */}
            <Card className="bg-white/10 border-white/20 p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
                    <Mic className="w-5 h-5 text-orange-600" />
                    Voice Guidelines
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.voiceGuidelines && Object.entries(result.voiceGuidelines).map(([aspect, guideline]) => (
                        <div key={aspect} className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-sm font-medium text-gray-900 capitalize mb-1">{aspect}</div>
                            <div className="text-sm text-gray-600">{guideline as string}</div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Production Specs */}
            <Card className="bg-white/10 border-white/20 p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2 text-gray-900">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Production Specifications
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.productionSpecs && Object.entries(result.productionSpecs).map(([spec, value]) => (
                        <div key={spec} className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-sm font-medium text-gray-900 capitalize mb-1">{spec}</div>
                            <div className="text-sm text-gray-600">{value as string}</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default StartupAgentPage;
