'use client';

import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import useLenis from '@/hooks/useLenis';
import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import TensionSection from '@/components/TensionSection';
import ProofPinSection from '@/components/ProofPinSection';
import DetailsSection from '@/components/DetailsSection';
import FooterSection from '@/components/FooterSection';

// Preloader depends on window/DOM — no SSR
const Preloader = dynamic(() => import('@/components/Preloader'), { ssr: false });

export default function Home() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Lenis smooth scroll, synced with GSAP ticker
  useLenis();

  const handleNavVisibilityChange = useCallback((isVisible) => {
    setIsNavVisible(isVisible);
  }, []);

  return (
    <>
      <SiteHeader isVisible={isNavVisible} />

      {/* 1. Architectural preloader — crystallizes into hero on scroll */}
      <Preloader onNavVisibilityChange={handleNavVisibilityChange} />

      {/* 2. Hero (always in DOM — GSAP needs it as a pin target) */}
      <HeroSection isArrivalComplete={isNavVisible} />

      {/* 3–6. Content that slides over the pinned hero */}
      <main className="content-overlay">
        <TensionSection />
        <ProofPinSection />
        <DetailsSection />
        <FooterSection />
      </main>
    </>
  );
}
