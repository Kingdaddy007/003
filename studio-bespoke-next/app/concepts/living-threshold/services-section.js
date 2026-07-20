'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from '@/lib/motion';
import styles from './services-section.module.css';

const services = [
  {
    key: 'turnkey',
    title: 'Full Turnkey Interior Design',
    copy: 'One studio carries the project from first concept through completion.',
  },
  {
    key: 'worldwide',
    title: 'Worldwide Interior Design',
    copy: 'The same personal design direction, delivered for homes beyond Dubai.',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const serviceStates = [...section.querySelectorAll('[data-service-state]')];
    const fills = [...section.querySelectorAll('[data-service-fill]')];
    const tracers = [...section.querySelectorAll('[data-service-tracer]')];
    const descriptions = [...section.querySelectorAll('[data-service-description]')];
    const invitationLines = [...section.querySelectorAll('[data-invitation-line]')];
    const invitationSupport = section.querySelector('[data-invitation-support]');
    const enhancedStory = section.querySelector('[data-services-story]');
    const invitation = section.querySelector('[data-services-invitation]');
    const workThreshold = section.querySelector('[data-services-work-threshold]');
    const workThresholdLines = [...section.querySelectorAll('[data-services-work-line]')];
    const mediaQuery = gsap.matchMedia();

    mediaQuery.add(
      '(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        if (
          serviceStates.length !== 2
          || fills.length !== 2
          || tracers.length !== 2
          || descriptions.length !== 2
          || invitationLines.length !== 2
          || !invitationSupport
          || !enhancedStory
          || !invitation
          || !workThreshold
          || workThresholdLines.length !== 2
        ) {
          return undefined;
        }

        section.dataset.enhanced = 'true';

        gsap.set(invitationLines, { yPercent: 115, rotation: 1.5 });
        gsap.set(invitationSupport, { autoAlpha: 0, y: 10 });
        gsap.set(serviceStates[0], { autoAlpha: 0, yPercent: 3 });
        gsap.set(serviceStates[1], { autoAlpha: 0, yPercent: 4 });
        gsap.set(fills[0], { clipPath: 'inset(0% 100% 0% 0%)' });
        gsap.set(fills[1], { clipPath: 'inset(0% 0% 0% 100%)' });
        gsap.set(tracers[0], { left: '0%', autoAlpha: 0 });
        gsap.set(tracers[1], { left: '100%', autoAlpha: 0 });
        gsap.set(descriptions, { autoAlpha: 0, y: 16 });
        gsap.set(workThreshold, { autoAlpha: 0 });
        gsap.set(workThresholdLines, {
          autoAlpha: 0,
          filter: 'blur(12px)',
          scale: 1.18,
          transformOrigin: '50% 50%',
        });

        const invitationTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: invitation,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });

        invitationTimeline
          .to(invitationLines, {
            yPercent: 0,
            rotation: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          })
          .to(invitationSupport, {
            autoAlpha: 1,
            y: 0,
            duration: 0.48,
            ease: 'power2.out',
          }, '-=0.42');

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: enhancedStory,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.46,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(serviceStates[0], {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.1,
            ease: 'power2.out',
          }, 0.03)
          .to(tracers[0], { autoAlpha: 1, duration: 0.035, ease: 'none' }, 0.11)
          .to(tracers[0], { left: '100%', duration: 0.21, ease: 'none' }, 0.13)
          .to(fills[0], {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.21,
            ease: 'none',
          }, 0.13)
          .to(tracers[0], { autoAlpha: 0, duration: 0.035, ease: 'none' }, 0.32)
          .to(descriptions[0], {
            autoAlpha: 1,
            y: 0,
            duration: 0.08,
            ease: 'power2.out',
          }, 0.28)
          .to(descriptions[0], {
            autoAlpha: 0,
            y: -9,
            duration: 0.07,
            ease: 'none',
          }, 0.44)
          .to(serviceStates[0], {
            autoAlpha: 0,
            yPercent: -3,
            duration: 0.08,
            ease: 'none',
          }, 0.47)
          .to(serviceStates[1], {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.08,
            ease: 'power2.out',
          }, 0.52)
          .to(tracers[1], { autoAlpha: 1, duration: 0.035, ease: 'none' }, 0.56)
          .to(tracers[1], { left: '0%', duration: 0.21, ease: 'none' }, 0.58)
          .to(fills[1], {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.21,
            ease: 'none',
          }, 0.58)
          .to(tracers[1], { autoAlpha: 0, duration: 0.035, ease: 'none' }, 0.77)
          .to(descriptions[1], {
            autoAlpha: 1,
            y: 0,
            duration: 0.08,
            ease: 'power2.out',
          }, 0.74)
          .to(serviceStates[1], {
            autoAlpha: 0,
            filter: 'blur(5px)',
            scale: 0.93,
            duration: 0.09,
            ease: 'power2.in',
          }, 0.86)
          .to(workThreshold, {
            autoAlpha: 1,
            duration: 0.04,
            ease: 'none',
          }, 0.87)
          .to(workThresholdLines, {
            autoAlpha: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 0.11,
            stagger: 0.018,
            ease: 'power3.out',
          }, 0.88)
          .to({}, { duration: 0.09 });

        return () => {
          invitationTimeline.revert();
          timeline.revert();
          delete section.dataset.enhanced;
        };
      },
    );

    return () => mediaQuery.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.servicesSection}
      aria-label="Studio Services"
      id="services"
    >
      <div className={styles.enhancedStory} data-services-story>
        <div className={styles.stickyStage}>
          <div className={styles.folio}>
            <header
              className={styles.invitation}
              data-services-invitation
              aria-hidden="true"
            >
              <p className={styles.eyebrow}>Studio Services</p>
              <div className={styles.invitationCopy}>
                <h2 className={styles.invitationHeading}>
                  <span className={styles.lineMask}>
                    <span data-invitation-line>One studio.</span>
                  </span>
                  <span className={styles.lineMask}>
                    <em data-invitation-line>Two ways to work.</em>
                  </span>
                </h2>
                <p className={styles.invitationSupport} data-invitation-support>
                  One point of view, carried through every project and every detail.
                </p>
              </div>
            </header>

            <div className={styles.serviceCanvas}>
              {services.map((service) => (
                <article
                  key={service.key}
                  className={`${styles.serviceState} ${styles[service.key]}`}
                  data-service-state={service.key}
                >
                  <div className={styles.titleStack}>
                    <div className={styles.titleOutline} aria-hidden="true">
                      {service.title}
                    </div>
                    <h3 className={styles.titleFill} data-service-fill>
                      {service.title}
                    </h3>
                    <span className={styles.titleTracer} data-service-tracer aria-hidden="true" />
                  </div>

                  <p className={styles.serviceDescription} data-service-description>
                    {service.copy}
                  </p>
                </article>
              ))}
            </div>

            <div
              className={styles.workThreshold}
              data-services-work-threshold
              aria-hidden="true"
            >
              <p className={styles.workThresholdTitle}>
                <span data-services-work-line>Selected</span>
                <em data-services-work-line>Work</em>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.staticStory}>
        <header className={styles.staticInvitation}>
          <h2>
            One studio. <em>Two ways to work.</em>
          </h2>
          <p>One point of view, carried through every project and every detail.</p>
        </header>

        <div className={styles.staticServices}>
          {services.map((service) => (
            <article key={service.key} className={styles.staticService}>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
