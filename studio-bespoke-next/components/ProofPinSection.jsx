'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const INITIAL_APERTURE_SCALE = 0.72;

export default function ProofPinSection() {
  const pinRef = useRef(null);
  const apertureRef = useRef(null);
  const imageShellRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const firstStepRef = useRef(null);
  const secondStepRef = useRef(null);
  const wallsAnnotationRef = useRef(null);
  const islandAnnotationRef = useRef(null);

  useEffect(() => {
    const pin = pinRef.current;
    const aperture = apertureRef.current;
    const imageShell = imageShellRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const firstStep = firstStepRef.current;
    const secondStep = secondStepRef.current;
    const wallsAnnotation = wallsAnnotationRef.current;
    const islandAnnotation = islandAnnotationRef.current;

    if (!pin || !aperture || !imageShell || !image || !overlay || !firstStep || !secondStep) return undefined;

    const media = gsap.matchMedia();

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const getCoverScale = () => Math.max(
        (window.innerWidth * 1.12) / aperture.offsetWidth,
        (window.innerHeight * 1.12) / aperture.offsetHeight
      );

      gsap.set(aperture, {
        autoAlpha: 1,
        xPercent: -50,
        yPercent: -50,
        y: '12vh',
        scale: INITIAL_APERTURE_SCALE,
        transformOrigin: '50% 50%',
      });
      gsap.set(imageShell, {
        xPercent: -50,
        yPercent: -50,
        scale: 1 / INITIAL_APERTURE_SCALE,
        transformOrigin: '50% 50%',
      });
      gsap.set(image, { scale: 1.08, xPercent: -2.5, yPercent: 1.5 });
      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set([firstStep, secondStep], { autoAlpha: 0, y: 18 });
      gsap.set([wallsAnnotation, islandAnnotation], { autoAlpha: 0, scale: 0.82 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(aperture, {
          y: 0,
          scale: getCoverScale,
          duration: 0.42,
          ease: 'power2.inOut',
        }, 0)
        .to(imageShell, {
          scale: () => 1 / getCoverScale(),
          duration: 0.42,
          ease: 'power2.inOut',
        }, 0)
        .to(image, {
          scale: 1,
          xPercent: 0,
          yPercent: -1,
          duration: 0.46,
          ease: 'power2.inOut',
        }, 0)
        .to(overlay, { autoAlpha: 1, duration: 0.1, ease: 'none' }, 0.4)
        .to(firstStep, { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.5)
        .to(wallsAnnotation, { autoAlpha: 1, scale: 1, duration: 0.1, ease: 'power2.out' }, 0.5)
        .to(firstStep, { autoAlpha: 0, y: -16, duration: 0.08, ease: 'power2.in' }, 0.7)
        .to(wallsAnnotation, { autoAlpha: 0, scale: 0.9, duration: 0.08 }, 0.7)
        .to(secondStep, { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.78)
        .to(islandAnnotation, { autoAlpha: 1, scale: 1, duration: 0.1, ease: 'power2.out' }, 0.78)
        .to({}, { duration: 0.12 });

      return () => timeline.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section id="proof" className="pinned-section" aria-labelledby="proof-title">
      <div className="pin-trigger" ref={pinRef}>
        <div className="proof-room-aperture" ref={apertureRef}>
          <div className="proof-room-image-shell" ref={imageShellRef}>
            <div
              className="pin-bg-image"
              ref={imageRef}
              role="img"
              aria-label="Completed Mira Villa kitchen connected to the surrounding living spaces"
            />
          </div>
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
