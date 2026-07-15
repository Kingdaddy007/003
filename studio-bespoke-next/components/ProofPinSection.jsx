'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProofPinSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const pinTrigger = sectionRef.current;
    if (!pinTrigger) return;

    const st = ScrollTrigger.create({
      trigger: pinTrigger,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        const step1 = document.getElementById('step-1');
        const step2 = document.getElementById('step-2');
        const annoWalls = document.getElementById('anno-walls');
        const annoIsland = document.getElementById('anno-island');

        if (progress < 0.5) {
          step1?.classList.add('active');
          step2?.classList.remove('active');
          annoWalls?.classList.add('visible');
          annoIsland?.classList.remove('visible');
        } else {
          step1?.classList.remove('active');
          step2?.classList.add('active');
          annoWalls?.classList.remove('visible');
          annoIsland?.classList.add('visible');
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section className="pinned-section" ref={sectionRef}>
      <div className="pin-trigger">
        <div className="pin-bg-image" />
        <div className="pin-overlay" />

        <div className="sb-container pin-content-container">
          {/* Narrative copy — switches at scroll midpoint */}
          <div className="pin-narrative">
            <div className="narrative-step active" id="step-1">
              <p className="eyebrow">The Decisive Cut</p>
              <h2 className="narrative-title">Internal walls removed.</h2>
              <p className="narrative-desc">
                By dismantling the central partition walls, the kitchen, dining, and living rooms
                were integrated into a single continuous space, allowing light to wash from front
                to back.
              </p>
            </div>

            <div className="narrative-step" id="step-2">
              <p className="eyebrow">The Heart Open</p>
              <h2 className="narrative-title">The island as social anchor.</h2>
              <p className="narrative-desc">
                The Calacatta marble island was extended and placed centrally, serving as both a
                morning baking surface and a social gathering point during meals.
              </p>
              <p className="proof-tag">
                Independent Proof: Featured in Marie Claire Maison, 2026
              </p>
            </div>
          </div>

          {/* Interactive annotation pins */}
          <div className="annotation-system">
            <div className="annotation" id="anno-walls" style={{ top: '25%', left: '55%' }}>
              <div className="anno-dot" />
              <div className="anno-card">
                <h3>Wall Demolition</h3>
                <p>Opened to connect kitchen and living spaces.</p>
              </div>
            </div>
            <div className="annotation" id="anno-island" style={{ top: '55%', left: '45%' }}>
              <div className="anno-dot" />
              <div className="anno-card">
                <h3>Extended Island</h3>
                <p>Designed specifically for the family&apos;s baking rituals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
