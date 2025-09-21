"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, MessageSquare, Brain, Download } from "lucide-react";
import PDFUploader from "@/components/PDFUploader";
import MindMapGenerator from "@/components/MindMapGenerator";

interface PDFData {
    text: string;
    filename: string;
    pages: number;
    fileId: string;
}

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

interface MindMapData {
    nodes: Array<{
        id: string;
        label: string;
        level: number;
    }>;
    edges: Array<{
        source: string;
        target: string;
    }>;
}

const TalkToPDFPage = () => {
    const [pdfData, setPdfData] = useState<PDFData | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isAnswering, setIsAnswering] = useState(false);
    const [mindMapData, setMindMapData] = useState<MindMapData | null>(null);
    const [isGeneratingMindMap, setIsGeneratingMindMap] = useState(false);

    const handlePDFUpload = (data: PDFData) => {
        setPdfData(data);
        setMessages([]);
        setMindMapData(null);

        // Add welcome message with suggested questions
        const welcomeMessage: Message = {
            id: Date.now().toString(),
            content: `PDF "${data.filename}" has been uploaded successfully! 

Here are some questions you can ask:
• What is this document about?
• What are the main topics covered?
• Can you summarize the key points?
• What skills or experience are mentioned?
• What are the main sections of this document?

You can ask any question about the document content!`,
            role: 'assistant',
            timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
    };

    const handleAskQuestion = async () => {
        if (!pdfData || !question.trim()) return;

        // Add user message to chat
        const userMessage: Message = {
            id: Date.now().toString(),
            content: question,
            role: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setQuestion("");
        setIsAnswering(true);

        try {
            const response = await fetch("/api/talk-to-pdf/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pdfText: pdfData.text,
                    question: question,
                }),
            });

            const data = await response.json();

            // Add assistant response to chat
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data.answer,
                role: 'assistant',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error asking question:", error);

            // Add error message to chat
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: "Sorry, there was an error processing your question. Please try again.",
                role: 'assistant',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsAnswering(false);
        }
    };

    const handleGenerateMindMap = async () => {
        if (!pdfData) return;

        setIsGeneratingMindMap(true);
        try {
            const response = await fetch("/api/talk-to-pdf/mindmap", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pdfText: pdfData.text,
                }),
            });

            const data = await response.json();
            setMindMapData(data.mindMap);
        } catch (error) {
            console.error("Error generating mind map:", error);
        } finally {
            setIsGeneratingMindMap(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold gradient-text">TalkToPDF</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Upload your PDF notes, ask questions, and automatically generate mind maps to enhance your learning experience.
                    </p>
                </div>

                {/* Upload Section */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Upload PDF Document
                        </CardTitle>
                        <CardDescription>
                            Upload your PDF notes or documents to start analyzing and asking questions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PDFUploader onPDFUpload={handlePDFUpload} />
                    </CardContent>
                </Card>

                {pdfData && (
                    <>
                        {/* PDF Info */}
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Document Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Filename</p>
                                        <p className="font-medium">{pdfData.filename}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Pages</p>
                                        <p className="font-medium">{pdfData.pages}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Characters</p>
                                        <p className="font-medium">{pdfData.text.length.toLocaleString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Chat Interface */}
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5" />
                                    Chat with Your PDF
                                </CardTitle>
                                <CardDescription>
                                    Ask questions about your PDF content and get intelligent answers in a conversational format.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Chat Messages */}
                                <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-background/50 space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-3 rounded-lg ${message.role === 'user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-card border'
                                                    }`}
                                            >
                                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                                <p className="text-xs opacity-70 mt-1">
                                                    {message.timestamp.toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    {isAnswering && (
                                        <div className="flex justify-start">
                                            <div className="bg-card border p-3 rounded-lg">
                                                <div className="flex items-center gap-2">
                                                    <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                                                    <span className="text-sm text-muted-foreground">Thinking...</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Ask a question about your PDF..."
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        onKeyPress={(e) => e.key === "Enter" && handleAskQuestion()}
                                        className="flex-1"
                                        disabled={isAnswering}
                                    />
                                    <Button
                                        onClick={handleAskQuestion}
                                        disabled={isAnswering || !question.trim()}
                                        className="btn-primary"
                                    >
                                        Send
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Mind Map Section */}
                        <Card className="glass-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Brain className="w-5 h-5" />
                                    Mind Map Generator
                                </CardTitle>
                                <CardDescription>
                                    Automatically generate a visual mind map from your PDF content.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2 mb-4">
                                    <Button
                                        onClick={handleGenerateMindMap}
                                        disabled={isGeneratingMindMap}
                                        className="btn-primary"
                                    >
                                        {isGeneratingMindMap ? "Generating..." : "Generate Mind Map"}
                                    </Button>
                                    {mindMapData && (
                                        <Button variant="outline" className="flex items-center gap-2">
                                            <Download className="w-4 h-4" />
                                            Export
                                        </Button>
                                    )}
                                </div>

                                {mindMapData && (
                                    <div className="mt-4">
                                        <MindMapGenerator data={mindMapData} />
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
};

export default TalkToPDFPage;
