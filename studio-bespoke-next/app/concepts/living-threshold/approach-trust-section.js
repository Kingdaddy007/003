'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/motion';
import styles from './approach-trust-section.module.css';

const commitments = [
  {
    title: 'Listen closely.',
    body: 'The studio begins with how you live, not a preset look.',
  },
  {
    title: 'Resolve completely.',
    body: 'Layout, detailing, materials and furnishings are considered as one whole.',
  },
  {
    title: 'Carry it through.',
    body: 'Design coordination continues from concept through completion, within the agreed scope.',
  },
];

// Exact, shortened excerpts from https://studiobespoke.design/ (verified 2026-07-20).
const clientVoices = [
  {
    quote: 'Creative ways of bringing them to life, always with a fresh and inspiring look.',
    name: 'Julia Fetisova',
    role: 'Founder, New Earth Café · Al Barari homeowner',
  },
  {
    quote: 'Direct in sharing her knowledge… guided me through each step.',
    name: 'Jacqui Kee',
    role: 'Client',
  },
];

export default function ApproachTrustSection() {
  const sectionRef = useRef(null);
  const [activeVoiceIndex, setActiveVoiceIndex] = useState(0);
  const [voiceDirection, setVoiceDirection] = useState('next');
  const activeVoice = clientVoices[activeVoiceIndex];
  const waitingVoice = clientVoices[(activeVoiceIndex + 1) % clientVoices.length];

  const moveVoice = (step) => {
    setVoiceDirection(step > 0 ? 'next' : 'previous');
    setActiveVoiceIndex((currentIndex) => (
      (currentIndex + step + clientVoices.length) % clientVoices.length
    ));
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const mediaQuery = gsap.matchMedia();

    mediaQuery.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const headingLines = [...section.querySelectorAll('[data-trust-heading-line]')];
        const thresholdCopy = section.querySelector('[data-trust-intro-copy]');
        const thresholdRule = section.querySelector('[data-trust-threshold-rule]');
        const workingLine = section.querySelector('[data-working-line]');
        const commitmentsCopy = [...section.querySelectorAll('[data-commitment-copy]')];
        const markers = [...section.querySelectorAll('[data-commitment-marker]')];
        const evidence = section.querySelector('[data-trust-evidence]');
        const voicesHeading = section.querySelector('[data-voices-heading]');
        const voiceStage = section.querySelector('[data-voice-stage]');

        gsap.set(headingLines, { yPercent: 112 });
        gsap.set(thresholdCopy, { autoAlpha: 0, x: 28 });
        gsap.set(thresholdRule, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(workingLine, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(commitmentsCopy, { clipPath: 'inset(0% 0% 100% 0%)', y: 16 });
        gsap.set(markers, { scale: 0 });
        gsap.set(evidence, { autoAlpha: 0, y: 12 });
        gsap.set(voicesHeading, { clipPath: 'inset(0% 0% 100% 0%)', y: 18 });
        gsap.set(voiceStage, {
          autoAlpha: 0,
          scale: 0.94,
          clipPath: 'inset(8% 9% 8% 9%)',
          transformOrigin: 'center center',
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: section.querySelector('[data-trust-threshold]'),
            start: 'top 84%',
            end: 'bottom 42%',
            scrub: 0.42,
          },
        })
          .to(thresholdRule, { scaleX: 1, duration: 0.24, ease: 'none' }, 0)
          .to(headingLines, {
            yPercent: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
          }, 0.1)
          .to(thresholdCopy, { autoAlpha: 1, x: 0, duration: 0.4, ease: 'power2.out' }, 0.3);

        gsap.timeline({
          scrollTrigger: {
            trigger: section.querySelector('[data-trust-practice]'),
            start: 'top 78%',
            end: 'top 30%',
            scrub: 0.34,
          },
        })
          .to(workingLine, { scaleX: 1, duration: 0.38, ease: 'none' }, 0)
          .to(markers, {
            scale: 1,
            duration: 0.24,
            stagger: 0.08,
            ease: 'power2.out',
          }, 0.14)
          .to(commitmentsCopy, {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 0.46,
            stagger: 0.09,
            ease: 'power3.out',
          }, 0.2)
          .to(evidence, { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power2.out' }, 0.58);

        gsap.timeline({
          scrollTrigger: {
            trigger: section.querySelector('[data-client-voices]'),
            start: 'top 74%',
            end: 'top 30%',
            scrub: 0.4,
          },
        })
          .to(voicesHeading, {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 0.46,
            ease: 'power3.out',
          }, 0)
          .to(voiceStage, {
            autoAlpha: 1,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.62,
            ease: 'power3.out',
          }, 0.22);
      }, section);

      return () => context.revert();
    });

    return () => mediaQuery.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="approach" aria-labelledby="approach-title">
      <header className={styles.threshold} data-trust-threshold>
        <div className={styles.thresholdRule} data-trust-threshold-rule aria-hidden="true" />
        <div className={styles.headingWrap}>
          <h2 id="approach-title" className={styles.heading}>
            <span><span data-trust-heading-line>The work behind</span></span>
            <span><span data-trust-heading-line>the feeling.</span></span>
          </h2>
        </div>
        <p className={styles.introCopy} data-trust-intro-copy>
          One line of thought, carried from the first conversation to the final detail.
        </p>
      </header>

      <div className={styles.practice} data-trust-practice>
        <div className={styles.workingLine} data-working-line aria-hidden="true" />
        <div className={styles.commitments}>
          {commitments.map((commitment) => (
            <article key={commitment.title} className={styles.commitment}>
              <span className={styles.marker} data-commitment-marker aria-hidden="true" />
              <div className={styles.commitmentCopy} data-commitment-copy>
                <h3>{commitment.title}</h3>
                <p>{commitment.body}</p>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.evidence} data-trust-evidence>
          Studio-reported foundation: five years of accredited interior-design education,
          international and boutique studio experience, and a trusted specialist network.
        </p>
      </div>

      <div className={styles.voices} data-client-voices>
        <div className={styles.voicesIntro}>
          <span className={styles.eyebrow}>Client perspective</span>
          <h3 data-voices-heading>In their words.</h3>
        </div>

        <div className={styles.voiceStage} data-voice-stage>
          <div className={styles.roomLines} aria-hidden="true">
            <span />
            <span />
          </div>

          <div className={styles.folioViewport}>
            <figure className={styles.waitingFolio} aria-hidden="true">
              <span>{waitingVoice.name}</span>
            </figure>

            <figure
              key={`${activeVoice.name}-${voiceDirection}`}
              className={`${styles.activeFolio} ${voiceDirection === 'previous' ? styles.fromPrevious : styles.fromNext}`}
              aria-live="polite"
            >
              <span className={styles.folioSpine} aria-hidden="true" />
              <blockquote>“{activeVoice.quote}”</blockquote>
              <figcaption>
                <strong>{activeVoice.name}</strong>
                <span>{activeVoice.role}</span>
              </figcaption>
            </figure>
          </div>

          <div className={styles.voiceControls}>
            <div>
              <button type="button" onClick={() => moveVoice(-1)} aria-label="Previous testimonial">
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" onClick={() => moveVoice(1)} aria-label="Next testimonial">
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
