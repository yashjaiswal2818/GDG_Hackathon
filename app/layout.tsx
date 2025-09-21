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
            colorPrimary: '#3b82f6',
            colorBackground: '#0f172a',
            colorText: '#f1f5f9',
            colorInputBackground: '#1e293b',
            colorInputText: '#f1f5f9',
            colorTextSecondary: '#94a3b8',
            colorNeutral: '#334155',
            colorSuccess: '#10b981',
            colorWarning: '#f59e0b',
            colorDanger: '#ef4444',
            borderRadius: '0.75rem',
            fontFamily: 'Bricolage Grotesque, sans-serif'
          },
          elements: {
            userButtonPopoverCard: {
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            },
            userButtonPopoverActionButton: {
              color: '#f1f5f9',
              '&:hover': {
                backgroundColor: '#334155'
              }
            },
            userButtonPopoverActionButtonText: {
              color: '#f1f5f9'
            },
            userButtonPopoverActionButtonIcon: {
              color: '#94a3b8'
            },
            userButtonPopoverFooter: {
              backgroundColor: '#334155',
              borderTop: '1px solid #475569'
            },
            userButtonPopoverFooterText: {
              color: '#94a3b8'
            },
            userButtonPopoverMainIdentifier: {
              color: '#f1f5f9'
            },
            userButtonPopoverSecondaryIdentifier: {
              color: '#94a3b8'
            }
          }
        }}>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
