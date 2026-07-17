'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/motion';
import styles from './services-section.module.css';

const services = [
  {
    key: 'turnkey',
    title: 'Full Turnkey Interior Design',
    copy: 'From first idea to final detail, one studio carries the whole.',
    image: '/images/selected-work/murooj-ground-floor.jpg',
    alt: 'Warm open-plan kitchen and dining room by Studio Bespoke',
  },
  {
    key: 'worldwide',
    title: 'Worldwide Interior Design',
    copy: 'A Studio Bespoke point of view, wherever home is.',
    image: '/images/selected-work/cornelias-innovation.jpg',
    alt: 'Layered hospitality interior with planting and warm material detail',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const serviceStates = section.querySelectorAll('[data-service-state]');
    const mediaPlanes = section.querySelectorAll('[data-service-media]');
    const mediaQuery = gsap.matchMedia();

    mediaQuery.add(
      '(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        const firstState = serviceStates[0];
        const secondState = serviceStates[1];
        const firstMedia = mediaPlanes[0];
        const secondMedia = mediaPlanes[1];

        gsap.set(firstState, { autoAlpha: 1, y: 0 });
        gsap.set(secondState, { autoAlpha: 0, y: 24 });
        gsap.set(firstMedia, { autoAlpha: 1, scale: 1.045, yPercent: -2 });
        gsap.set(secondMedia, { autoAlpha: 0, scale: 1.065, yPercent: 2 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.48,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(firstMedia, { scale: 1, yPercent: 2, duration: 0.42, ease: 'none' }, 0)
          .to(firstState, { autoAlpha: 0, y: -20, duration: 0.12, ease: 'none' }, 0.38)
          .to(firstMedia, { autoAlpha: 0, duration: 0.14, ease: 'none' }, 0.4)
          .to(secondMedia, { autoAlpha: 1, scale: 1.03, duration: 0.18, ease: 'none' }, 0.42)
          .to(secondState, { autoAlpha: 1, y: 0, duration: 0.14, ease: 'power2.out' }, 0.5)
          .to(secondMedia, { scale: 1, yPercent: -2, duration: 0.38, ease: 'none' }, 0.58)
          .to({}, { duration: 0.12 });

        ScrollTrigger.refresh();
        return () => timeline.revert();
      },
    );

    return () => mediaQuery.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.servicesSection}
      aria-labelledby="services-section-title"
      id="services"
    >
      <div className={styles.stickyStage}>
        <header className={styles.introduction}>
          <p className={styles.eyebrow}>Services</p>
          <h2 id="services-section-title" className={styles.heading}>
            <span>One studio.</span>
            <em>Two ways to work.</em>
          </h2>
          <p className={styles.introCopy}>
            One point of view, carried through every project and every detail.
          </p>
        </header>

        <div className={styles.serviceStateViewport}>
          {services.map((service) => (
            <article
              key={service.key}
              className={styles.serviceState}
              data-service-state={service.key}
            >
              <p className={styles.serviceIndex} aria-hidden="true">
                {service.key === 'turnkey' ? 'The whole journey' : 'Wherever home is'}
              </p>
              <h3>{service.title}</h3>
              <p className={styles.serviceCopy}>{service.copy}</p>
              <div className={styles.mobileServiceImage}>
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 1px"
                />
              </div>
            </article>
          ))}
        </div>

        <div className={styles.mediaStage} aria-hidden="true">
          {services.map((service, index) => (
            <div
              key={service.key}
              className={styles.mediaPlane}
              data-service-media={service.key}
            >
              <Image
                src={service.image}
                alt=""
                fill
                priority={index === 0}
                sizes="(min-width: 901px) 62vw, 1px"
              />
              <div className={styles.mediaVeil} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
