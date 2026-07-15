'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ isArrivalComplete }) {
  const heroRef = useRef(null);
  const panelRef = useRef(null);
  const apertureRef = useRef(null);
  const captionRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const panel = panelRef.current;
    const aperture = apertureRef.current;
    const caption = captionRef.current;
    const preloader = document.getElementById('preloader');

    if (!isArrivalComplete || !hero || !panel || !aperture || !caption || !preloader) return undefined;

    const media = gsap.matchMedia();

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set(panel, { yPercent: 100, autoAlpha: 1 });
      gsap.set(aperture, {
        clipPath: 'inset(18% 27% 14% 27% round 320px 320px 28px 28px)',
        webkitClipPath: 'inset(18% 27% 14% 27% round 320px 320px 28px 28px)',
      });
      gsap.set(caption, { autoAlpha: 0, y: 14 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=140%',
          scrub: 0.65,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to({}, { duration: 0.1 })
        .to(panel, { yPercent: 0, duration: 0.68, ease: 'power2.inOut' }, 0.1)
        .to(aperture, {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          webkitClipPath: 'inset(0% 0% 0% 0% round 0px)',
          duration: 0.62,
          ease: 'power2.inOut',
        }, 0.16)
        .to(preloader, { autoAlpha: 0, pointerEvents: 'none', duration: 0.01 }, 0.79)
        .to(caption, { autoAlpha: 1, y: 0, duration: 0.11, ease: 'power2.out' }, 0.82)
        .to({}, { duration: 0.07 });

      return () => timeline.revert();
    });

    return () => media.revert();
  }, [isArrivalComplete]);

  return (
    <section id="hero" ref={heroRef}>
      <div className="room-reveal-panel" ref={panelRef}>
        <div className="room-aperture" ref={apertureRef}>
          <div className="hero-bg" role="img" aria-label="Completed Mira Villa kitchen and living space" />
        </div>

        <div className="room-caption" ref={captionRef}>
          <span className="room-caption-project">Mira Villa — Dubai</span>
          <span className="room-caption-note">Ground floor re-planned around family life</span>
        </div>
      </div>
    </section>
  );
}
