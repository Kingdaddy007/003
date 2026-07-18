'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion';
import styles from './services-introduction.module.css';

export default function ServicesIntroduction() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const supportRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const headingLines = headingRef.current?.querySelectorAll('[data-line]');
    const support = supportRef.current;
    if (!container || !headingLines || !support) return undefined;

    const mediaQuery = gsap.matchMedia();

    mediaQuery.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        // Initial hidden states for typography
        gsap.set(headingLines, { yPercent: 120, rotation: 2 });
        gsap.set(support, { autoAlpha: 0, y: 20 });
        
        // The Typography Animation Timeline
        const typeTl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 70%', // Trigger text reveal when section is well into view
            toggleActions: 'play none none reverse',
          },
        });

        typeTl
          .to(headingLines, {
            yPercent: 0,
            rotation: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
          })
          .to(support, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
          }, '-=0.8');

        return () => {
          typeTl.kill();
        };
      }
    );

    return () => mediaQuery.revert();
  }, []);

  return (
    <section className={styles.invitation} ref={containerRef}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Services</p>
        <h2 className={styles.heading} ref={headingRef}>
          <span className={styles.lineMask}><span className={styles.line} data-line>One studio.</span></span>
          <span className={styles.lineMask}><em className={styles.line} data-line>Two ways to work.</em></span>
        </h2>
        <p className={styles.support} ref={supportRef}>
          One point of view, carried through every project and every detail.
        </p>
      </div>
    </section>
  );
}
