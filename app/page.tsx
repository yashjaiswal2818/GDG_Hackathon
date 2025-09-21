"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";

const Page = () => {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if user has seen splash screen
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  useEffect(() => {
    // If user has seen splash, redirect to home
    if (!showSplash) {
      router.push('/home');
    }
  }, [showSplash, router]);

  const handleGetStarted = () => {
    localStorage.setItem('hasSeenSplash', 'true');
    router.push('/splash');
  };

  if (showSplash) {
    return <SplashScreen onGetStarted={handleGetStarted} />;
  }

  return null;
}

export default Page