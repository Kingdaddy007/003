'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/motion';
import styles from './founder-section.module.css';

export default function FounderSection() {
  const sectionRef = useRef(null);
  const [signatureFailed, setSignatureFailed] = useState(false);
  const [portraitFailed, setPortraitFailed] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const line1 = section.querySelector('[data-founder-line="1"]');
    const line2 = section.querySelector('[data-founder-line="2"]');
    const line3 = section.querySelector('[data-founder-line="3"]');
    
    // Select detail text and clause elements
    const clause1 = section.querySelector('[data-founder-clause="1"]');
    const clause2 = section.querySelector('[data-founder-clause="2"]');
    const founderIdentity = section.querySelector(`.${styles.founderIdentity}`);
    
    // Mask and image elements
    const portraitMask = section.querySelector('[data-portrait-mask]');
    const basePortrait = section.querySelector('[data-portrait-base]');

    // Signature wrapper and link wrapper
    const signatureWrap = section.querySelector('[data-founder-signature-wrap]');
    const aboutLinkWrap = section.querySelector('[data-about-link-wrap]');

    const mm = gsap.matchMedia();

    // Match media query: desktop above 900px, pointer: fine, prefers-reduced-motion: no-preference
    mm.add('(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      // 1. Set initial states inside the media query block
      if (portraitMask) {
        gsap.set(portraitMask, { clipPath: 'inset(100% 0% 0% 0%)' });
      }
      if (basePortrait) {
        gsap.set(basePortrait, { yPercent: 10, scale: 1.06, transformOrigin: 'center center' });
      }

      if (line1) gsap.set(line1, { x: -16, y: 18, opacity: 0, filter: 'blur(4px)' });
      if (line2) gsap.set(line2, { x: -16, y: 18, opacity: 0, filter: 'blur(4px)' });
      if (line3) gsap.set(line3, { x: -16, y: 18, opacity: 0, filter: 'blur(4px)' });

      if (clause1) gsap.set(clause1, { opacity: 0, filter: 'blur(3px)' });
      if (clause2) gsap.set(clause2, { opacity: 0, filter: 'blur(3px)' });

      if (founderIdentity) gsap.set(founderIdentity, { opacity: 0, y: 10 });
      if (signatureWrap) gsap.set(signatureWrap, { clipPath: 'inset(0% 100% 0% 0%)' });
      if (aboutLinkWrap) gsap.set(aboutLinkWrap, { opacity: 0, y: 10 });

      // 2. Build the reading timeline. The portrait is deliberately excluded:
      // it acts as the section's closing beat only after the copy has resolved.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          end: 'top 60%',
          scrub: 0.24,
          invalidateOnRefresh: true,
        },
      });

      tl
        // 0.28–0.52: "Personal" line exposes
        .to(line1, { x: 0, y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.24, ease: 'power2.out' }, 0.28)

        // 0.38–0.62: "begins with" line exposes
        .to(line2, { x: 0, y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.24, ease: 'power2.out' }, 0.38)

        // 0.48–0.72: "listening." line exposes
        .to(line3, { x: 0, y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.24, ease: 'power2.out' }, 0.48)

        // 0.62–0.96: Clause one and two resolve in reading order
        .to(clause1, { opacity: 1, filter: 'blur(0px)', duration: 0.24, ease: 'power2.out' }, 0.62)
        .to(clause2, { opacity: 1, filter: 'blur(0px)', duration: 0.24, ease: 'power2.out' }, 0.72)

        // 0.84–1.00: Identity and signature resolve
        .to(founderIdentity, { opacity: 1, y: 0, duration: 0.16, ease: 'power2.out' }, 0.84)
        .to(signatureWrap, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.16, ease: 'none' }, 0.84)

        // 0.94–1.00: About link resolves completely
        .to(aboutLinkWrap, { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.94);

      // 3. Exit-phase portrait reveal. It begins only after the reading timeline
      // has completed and finishes when the final section reaches the page end.
      const portraitTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          // Reserve the portrait for roughly the final 12% of one viewport of
          // page travel. This keeps it hidden while the founder copy is read.
          start: () => ScrollTrigger.maxScroll(window) - Math.min(120, window.innerHeight * 0.12),
          end: () => ScrollTrigger.maxScroll(window),
          scrub: 0.38,
          invalidateOnRefresh: true,
        },
      });

      portraitTl
        .to(portraitMask, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'none' }, 0)
        .to(basePortrait, { yPercent: 0, scale: 1, duration: 1, ease: 'none' }, 0);
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.founderSection}
      aria-labelledby="founder-section-title"
    >
      <div className={styles.editorialGrid} data-founder-content>
        {/* Heading lines as three controllable lines */}
        <h2 id="founder-section-title" className={styles.heading}>
          <span className={styles.lineWrapper}>
            <span className={styles.line1} data-founder-line="1">Personal</span>
          </span>
          <span className={styles.lineWrapper}>
            <span className={styles.line2} data-founder-line="2">begins with</span>
          </span>
          <span className={styles.lineWrapper}>
            <span className={styles.line3} data-founder-line="3">listening.</span>
          </span>
        </h2>

        {/* Portrait Field */}
        <figure className={styles.portraitField}>
          <div className={styles.portraitFrame}>
            {!portraitFailed && (
              <div className={styles.portraitMask} data-portrait-mask>
                {/* Base Portrait (Semantic Image using next/image) */}
                <Image
                  src="/images/studio-founder/brittany-guimaraes-founder.jpg"
                  alt="Brittany Guimaraes, founder of Studio Bespoke Design"
                  className={styles.basePortrait}
                  data-portrait-base
                  width={1707}
                  height={2320}
                  sizes="(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 320px"
                  onError={() => setPortraitFailed(true)}
                />
              </div>
            )}
          </div>
        </figure>

        {/* Body Copy & Founder Metadata */}
        <div className={styles.bodyAndDetails}>
          <p className={styles.bodyCopy}>
            <span className={styles.bodyClause} data-founder-clause="1">
              Studio Bespoke is led by Brittany Guimaraes, whose approach begins with
              understanding how people live
            </span>{' '}
            <span className={styles.bodyClause} data-founder-clause="2">
              — then carries that understanding through every design decision.
            </span>
          </p>

          <div className={styles.founderIdentity}>
            <strong className={styles.founderName}>Brittany Guimaraes</strong>
            <span className={styles.founderTitle}>
              Founder / Interior Designer / Dubai
            </span>
          </div>

          {/* Decorative Signature */}
          {!signatureFailed && (
            <div
              className={styles.signatureWrapper}
              data-founder-signature-wrap
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/studio-founder/brittany-guimaraes-signature.png"
                alt=""
                className={styles.signatureImage}
                onError={() => setSignatureFailed(true)}
              />
            </div>
          )}

          {/* About link */}
          <div className={styles.linkWrapper} data-about-link-wrap>
            <a
              href="https://studiobespoke.design/about-us/"
              className={styles.aboutLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              About the studio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
