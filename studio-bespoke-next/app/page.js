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

      {/* 1. Architectural opening — the preloader and hero are one experience */}
      <Preloader onNavVisibilityChange={handleNavVisibilityChange} />

      {/* 2. Hero spacer — anchors the opening while its foreground clears */}
      <HeroSection />

      {/* 3–6. Story chapters: problem, intervention, detail, and enquiry */}
      <main className="content-overlay">
        <TensionSection />
        <ProofPinSection />
        <DetailsSection />
        <FooterSection />
      </main>
    </>
  );
}
