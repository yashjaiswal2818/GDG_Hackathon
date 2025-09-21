"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";

interface PDFData {
    text: string;
    filename: string;
    pages: number;
    fileId: string;
}

interface PDFUploaderProps {
    onPDFUpload: (data: PDFData) => void;
}

const PDFUploader = ({ onPDFUpload }: PDFUploaderProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type === "application/pdf") {
            setUploadedFile(file);
        } else {
            alert("Please select a valid PDF file.");
        }
    };

    const handleUpload = async () => {
        if (!uploadedFile) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("pdf", uploadedFile);

            const response = await fetch("/api/talk-to-pdf/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to process PDF");
            }

            const data = await response.json();
            onPDFUpload(data);
        } catch (error) {
            console.error("Error uploading PDF:", error);
            alert("Failed to process PDF. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type === "application/pdf") {
            setUploadedFile(file);
        } else {
            alert("Please drop a valid PDF file.");
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <div className="space-y-4">
            <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                />

                {uploadedFile ? (
                    <div className="space-y-2">
                        <FileText className="w-12 h-12 mx-auto text-primary" />
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile();
                            }}
                            className="mt-2"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Remove
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                        <p className="font-medium">Drop your PDF here or click to browse</p>
                        <p className="text-sm text-muted-foreground">
                            Supports PDF files up to 10MB
                        </p>
                    </div>
                )}
            </div>

            {uploadedFile && (
                <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="w-full btn-primary"
                >
                    {isUploading ? "Processing PDF..." : "Upload & Analyze"}
                </Button>
            )}
        </div>
    );
};

export default PDFUploader;
