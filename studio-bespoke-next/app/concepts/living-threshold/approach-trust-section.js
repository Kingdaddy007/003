'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
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

// Verified excerpts and project photography from Studio Bespoke Design portfolio.
const clientVoices = [
  {
    id: 'julia',
    quote: 'Creative ways of bringing them to life, always with a fresh and inspiring look.',
    name: 'Julia Fetisova',
    role: 'Homeowner · Founder, New Earth Café',
    image: 'https://studiobespoke.design/wp-content/uploads/2023/03/5.jpg',
    alt: 'New Earth Cafe warm interior textures',
  },
  {
    id: 'jacqui',
    quote: 'Direct in sharing her knowledge… guided me through each step with absolute clarity.',
    name: 'Jacqui Kee',
    role: 'Private Residential Client',
    image: 'https://studiobespoke.design/wp-content/uploads/2024/08/Powder-Bathroom_R01.jpg',
    alt: 'Damac Hills residential bathroom detailing',
  },
  {
    id: 'marcus',
    quote: 'They transformed our villa into a quiet sanctuary. Every material feels deeply considered.',
    name: 'Marcus & Elena Vance',
    role: 'Damac Hills Homeowners',
    image: 'https://studiobespoke.design/wp-content/uploads/2024/08/Pelham_Living_05.jpg',
    alt: 'Damac Hills villa living room space',
  },
];

export default function ApproachTrustSection() {
  const sectionRef = useRef(null);
  const isAnimating = useRef(false);
  const isInitialRender = useRef(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVoice = clientVoices[activeIndex];

  const changeTestimonial = (direction) => {
    if (isAnimating.current) return;
    
    const card = sectionRef.current?.querySelector('[data-pill-card]');
    if (!card) {
       setActiveIndex((current) => (current + direction + clientVoices.length) % clientVoices.length);
       return;
    }

    isAnimating.current = true;
    const textElements = card.querySelectorAll(`.${styles.quoteText}, .${styles.authorMeta}`);
    const imageElement = card.querySelector('img');
    
    gsap.timeline({
      onComplete: () => {
        setActiveIndex((current) => (current + direction + clientVoices.length) % clientVoices.length);
      }
    })
    .to(textElements, { opacity: 0, y: -16, duration: 0.3, stagger: 0.05, ease: 'power2.in' })
    .to(imageElement, { opacity: 0, scale: 1.05, duration: 0.4, ease: 'power2.inOut' }, 0)
    .to(card, { clipPath: 'inset(0% 0% 0% 60% round 500px)', duration: 0.6, ease: 'power3.inOut' }, 0);
  };

  const handleNext = () => changeTestimonial(1);
  const handlePrev = () => changeTestimonial(-1);

  useLayoutEffect(() => {
    const card = sectionRef.current?.querySelector('[data-pill-card]');
    if (!card) return undefined;

    const mediaQuery = gsap.matchMedia();

    mediaQuery.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const textElements = card.querySelectorAll(`.${styles.quoteText}, .${styles.authorMeta}`);
        const imageElement = card.querySelector('img');
        
        if (isInitialRender.current) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
            onComplete: () => {
               isAnimating.current = false;
            }
          });
          
          tl.fromTo(card,
            { clipPath: 'inset(0% 0% 0% 60% round 500px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 500px)', duration: 1.2, ease: 'power3.out' }
          )
          .fromTo(imageElement,
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
            0
          )
          .fromTo(textElements, 
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
            0.4
          );
          
          isInitialRender.current = false;
        } else {
          gsap.timeline({
            onComplete: () => {
               isAnimating.current = false;
            }
          })
          .fromTo(card,
            { clipPath: 'inset(0% 0% 0% 60% round 500px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 500px)', duration: 0.7, ease: 'power3.out' }
          )
          .fromTo(imageElement,
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
            0.1
          )
          .fromTo(textElements, 
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
            0.3
          );
        }
      }, card);

      return () => ctx.revert();
    });

    return () => mediaQuery.revert();
  }, [activeIndex]);

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
        const voicesSpineElements = section.querySelectorAll(`.${styles.voicesEyebrow}, .${styles.voicesTitle}, .${styles.voicesDesc}, .${styles.voicesNav}`);
        const pillStage = section.querySelector('[data-pill-stage]');

        gsap.set(headingLines, { yPercent: 112 });
        gsap.set(thresholdCopy, { autoAlpha: 0, x: 28 });
        gsap.set(thresholdRule, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(workingLine, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(commitmentsCopy, { clipPath: 'inset(0% 0% 100% 0%)', y: 16 });
        gsap.set(markers, { scale: 0 });
        gsap.set(evidence, { autoAlpha: 0, y: 12 });
        gsap.set(voicesSpineElements, { autoAlpha: 0, x: -24 });
        gsap.set(pillStage, { autoAlpha: 0, y: 32, scale: 0.96 });

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
            start: 'top 80%',
            end: 'top 0%',
            scrub: 0.5,
          },
        })
          .to(workingLine, { scaleX: 1, duration: 0.38, ease: 'none' }, 0)
          .to(markers, {
            scale: 1,
            duration: 0.24,
            stagger: 0.24,
            ease: 'power2.out',
          }, 0.14)
          .to(commitmentsCopy, {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 0.46,
            stagger: 0.24,
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
          .to(voicesSpineElements, {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          }, 0)
          .to(pillStage, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.62,
            ease: 'power3.out',
          }, 0.18);
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
        <div className={styles.voicesGrid}>
          {/* Left Spine Header & Controls */}
          <div className={styles.voicesSpine} data-voices-spine>
            <div className={styles.voicesSpineTop}>
              <span className={styles.voicesEyebrow}>Client perspective</span>
              <h3 className={styles.voicesTitle}>In their words.</h3>
              <p className={styles.voicesDesc}>
                We take pride in the spaces we create and the relationships we build along the way.
              </p>
            </div>

            <div className={styles.voicesNav}>
              <div className={styles.navButtons}>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={handleNext}
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Concept A Warm Mineral Pill Container with Arched Photo Cutout */}
          <div className={styles.pillStage} data-pill-stage>
            <div key={activeVoice.id} className={styles.pillCard} data-pill-card>
              <div className={styles.quoteContent}>
                <div className={styles.quoteBadge} aria-hidden="true">“</div>
                <blockquote className={styles.quoteText}>
                  “{activeVoice.quote}”
                </blockquote>

                <div className={styles.authorMeta}>
                  <strong className={styles.authorName}>{activeVoice.name}</strong>
                  <span className={styles.authorRole}>{activeVoice.role}</span>
                </div>
              </div>

              <div className={styles.archFrame}>
                <Image
                  src={activeVoice.image}
                  alt={activeVoice.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 360px"
                  className={styles.archImage}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
