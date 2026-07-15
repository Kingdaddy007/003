'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CLOSED_APERTURE = 'inset(14% 24% 12% 24% round 320px 320px 28px 28px)';
const OPEN_APERTURE = 'inset(0% 0% 0% 0% round 0px)';

export default function ProofPinSection() {
  const pinRef = useRef(null);
  const apertureRef = useRef(null);
  const overlayRef = useRef(null);
  const firstStepRef = useRef(null);
  const secondStepRef = useRef(null);
  const wallsAnnotationRef = useRef(null);
  const islandAnnotationRef = useRef(null);

  useEffect(() => {
    const pin = pinRef.current;
    const aperture = apertureRef.current;
    const overlay = overlayRef.current;
    const firstStep = firstStepRef.current;
    const secondStep = secondStepRef.current;
    const wallsAnnotation = wallsAnnotationRef.current;
    const islandAnnotation = islandAnnotationRef.current;

    if (!pin || !aperture || !overlay || !firstStep || !secondStep) return undefined;

    const media = gsap.matchMedia();

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set(aperture, { clipPath: CLOSED_APERTURE, webkitClipPath: CLOSED_APERTURE });
      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set([firstStep, secondStep], { autoAlpha: 0, y: 18 });
      gsap.set([wallsAnnotation, islandAnnotation], { autoAlpha: 0, scale: 0.82 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: '+=180%',
          pin: true,
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(aperture, {
          clipPath: OPEN_APERTURE,
          webkitClipPath: OPEN_APERTURE,
          duration: 0.34,
          ease: 'power2.inOut',
        }, 0)
        .to(overlay, { autoAlpha: 1, duration: 0.1, ease: 'none' }, 0.28)
        .to(firstStep, { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.36)
        .to(wallsAnnotation, { autoAlpha: 1, scale: 1, duration: 0.1, ease: 'power2.out' }, 0.36)
        .to(firstStep, { autoAlpha: 0, y: -16, duration: 0.08, ease: 'power2.in' }, 0.58)
        .to(wallsAnnotation, { autoAlpha: 0, scale: 0.9, duration: 0.08 }, 0.58)
        .to(secondStep, { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.66)
        .to(islandAnnotation, { autoAlpha: 1, scale: 1, duration: 0.1, ease: 'power2.out' }, 0.66)
        .to({}, { duration: 0.24 });

      return () => timeline.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section id="proof" className="pinned-section" aria-labelledby="proof-title">
      <div className="pin-trigger" ref={pinRef}>
        <div className="proof-room-aperture" ref={apertureRef}>
          <div
            className="pin-bg-image"
            role="img"
            aria-label="Completed Mira Villa kitchen connected to the surrounding living spaces"
          />
        </div>
        <div className="pin-overlay" ref={overlayRef} />

        <div className="sb-container pin-content-container">
          <div className="pin-narrative">
            <article className="narrative-step" ref={firstStepRef}>
              <p className="eyebrow">Mira Villa · The Decisive Cut</p>
              <h2 id="proof-title" className="narrative-title">Internal walls removed.</h2>
              <p className="narrative-desc">
                Opening the central partitions connected the kitchen, dining, and living rooms into
                one continuous ground floor, changing how light and family movement travelled
                through the home.
              </p>
            </article>

            <article className="narrative-step" ref={secondStepRef}>
              <p className="eyebrow">The Heart Open</p>
              <h2 className="narrative-title">The island as social anchor.</h2>
              <p className="narrative-desc">
                The central island supports the client&apos;s baking routine while keeping cooking,
                conversation, and gathering within the same shared space.
              </p>
              <p className="proof-tag">Independent confirmation · Marie Claire Maison</p>
            </article>
          </div>

          <div className="annotation-system" aria-hidden="true">
            <div
              className="annotation"
              ref={wallsAnnotationRef}
              style={{ top: '25%', left: '58%' }}
            >
              <div className="anno-dot" />
              <div className="anno-card">
                <h3>Plan opened</h3>
                <p>Kitchen, dining, and living connected.</p>
              </div>
            </div>
            <div
              className="annotation"
              ref={islandAnnotationRef}
              style={{ top: '62%', left: '42%' }}
            >
              <div className="anno-dot" />
              <div className="anno-card">
                <h3>Social anchor</h3>
                <p>One surface for baking and gathering.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
