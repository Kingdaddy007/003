'use client';

import DetailsSection from '@/components/DetailsSection';
import FooterSection from '@/components/FooterSection';
import OpeningPlanStage from '@/components/OpeningPlanStage';
import ProofPinSection from '@/components/ProofPinSection';
import SiteHeader from '@/components/SiteHeader';
import useLenis from '@/hooks/useLenis';

export default function Home() {
  useLenis();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to project proof</a>
      <SiteHeader />
      <OpeningPlanStage />

      <main id="main-content" className="content-overlay" tabIndex={-1}>
        <ProofPinSection />
        <DetailsSection />
      </main>

      <FooterSection />
    </>
  );
}
