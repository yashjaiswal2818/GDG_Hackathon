import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MentorAI",
  description: "A platform to connect with AI mentors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider appearance={{
          variables: {
            colorPrimary: '#6366f1',
            colorBackground: '#0a0a0a',
            colorText: '#f8fafc',
            colorInputBackground: '#111827',
            colorInputText: '#f8fafc'
          }
        }}>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
