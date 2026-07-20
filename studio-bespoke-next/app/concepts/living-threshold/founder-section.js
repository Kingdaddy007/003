'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/motion';
import styles from './founder-section.module.css';

export default function FounderSection() {
  const sectionRef = useRef(null);
  const [portraitFailed, setPortraitFailed] = useState(false);
  const [signatureFailed, setSignatureFailed] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const eyebrow = section.querySelector('[data-founder-eyebrow]');
    const headingLines = section.querySelectorAll('[data-founder-line]');
    const bodyCopy = section.querySelector('[data-founder-body]');
    const founderIdentity = section.querySelector('[data-founder-identity]');
    const portraitMask = section.querySelector('[data-portrait-mask]');
    const portraitImage = section.querySelector('[data-portrait-image]');
    const mediaQuery = gsap.matchMedia();

    mediaQuery.add(
      '(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        gsap.set(eyebrow, { autoAlpha: 0 });
        gsap.set(headingLines, { yPercent: 112, rotate: 1.2 });
        gsap.set(bodyCopy, { autoAlpha: 0, y: 18 });
        gsap.set(founderIdentity, { autoAlpha: 0, y: 12 });

        if (portraitMask && portraitImage) {
          gsap.set(portraitMask, { clipPath: 'inset(100% 0% 0% 0%)' });
          gsap.set(portraitImage, {
            yPercent: 9,
            scale: 1.08,
            transformOrigin: 'center center',
          });
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            end: 'top 16%',
            scrub: 0.36,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(eyebrow, { autoAlpha: 1, duration: 0.12, ease: 'none' }, 0.02)
          .to(headingLines, {
            yPercent: 0,
            rotate: 0,
            duration: 0.3,
            stagger: 0.08,
            ease: 'power3.out',
          }, 0.08);

        if (portraitMask && portraitImage) {
          timeline
            .to(portraitMask, {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.58,
              ease: 'none',
            }, 0.24)
            .to(portraitImage, {
              yPercent: 0,
              scale: 1,
              duration: 0.58,
              ease: 'none',
            }, 0.24);
        }

        timeline
          .to(bodyCopy, {
            autoAlpha: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
          }, 0.58)
          .to(founderIdentity, {
            autoAlpha: 1,
            y: 0,
            duration: 0.18,
            ease: 'power2.out',
          }, 0.7);
      },
    );

    return () => mediaQuery.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.founderSection}
      aria-labelledby="founder-section-title"
      id="studio"
    >
      <div className={styles.editorialGrid} data-founder-content>
        <p className={styles.eyebrow} data-founder-eyebrow>The Studio</p>

        <h2 id="founder-section-title" className={styles.heading}>
          <span className={styles.lineWrapper}>
            <span data-founder-line>Personal begins</span>
          </span>
          <span className={styles.lineWrapper}>
            <em data-founder-line>with listening.</em>
          </span>
        </h2>

        <figure className={styles.portraitField}>
          <div className={styles.portraitFrame}>
            {!portraitFailed && (
              <div className={styles.portraitMask} data-portrait-mask>
                <Image
                  src="/images/studio-founder/brittany-guimaraes-founder.jpg"
                  alt="Brittany Guimaraes, founder of Studio Bespoke Design"
                  className={styles.portraitImage}
                  data-portrait-image
                  width={1707}
                  height={2320}
                  sizes="(max-width: 720px) calc(100vw - 48px), (max-width: 1200px) 32vw, 360px"
                  onError={() => setPortraitFailed(true)}
                />
              </div>
            )}
          </div>
        </figure>

        <div className={styles.bodyAndDetails}>
          <p className={styles.bodyCopy} data-founder-body>
            Studio Bespoke is led by Brittany Guimaraes. Her approach begins by
            understanding how people live, then carries that understanding through
            every design decision.
          </p>
        </div>

        <div className={styles.founderIdentity} data-founder-identity>
          {!signatureFailed && (
            <span className={styles.signatureWrapper} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/studio-founder/brittany-guimaraes-signature.png"
                alt=""
                className={styles.signatureImage}
                onError={() => setSignatureFailed(true)}
              />
            </span>
          )}
          <span className={styles.founderTitle}>
            Founder / Interior Designer / Dubai
          </span>
        </div>
      </div>
    </section>
  );
}
