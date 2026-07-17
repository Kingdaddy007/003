'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/motion';
import styles from './selected-work-section.module.css';

const projects = [
  {
    name: 'Murooj Al Furjan 2',
    type: 'Residential',
    thought: 'Softened thresholds bring the ground floor into one calm rhythm.',
    image: '/images/selected-work/murooj-ground-floor.jpg',
    alt: 'Open-plan kitchen and dining space in Murooj Al Furjan 2',
    url: 'https://studiobespoke.design/projects/murooj-al-furjan-2/',
    entry: 'vertical',
  },
  {
    name: 'Cornelias Innovation Hub',
    type: 'Workplace',
    thought: 'Planting, circulation and collaboration share the same spatial language.',
    image: '/images/selected-work/cornelias-innovation.jpg',
    alt: 'Green and terracotta social interior at Cornelias Innovation Hub',
    url: 'https://studiobespoke.design/projects/cornelias-innovation-hub/',
    entry: 'from-right',
  },
  {
    name: 'The Strand Cafe',
    type: 'Hospitality',
    thought: 'Material warmth turns an everyday visit into a composed atmosphere.',
    image: '/images/selected-work/strand-cafe.jpg',
    alt: 'Layered bar and dining interior at The Strand Cafe',
    url: 'https://studiobespoke.design/projects/the-strand-cafe/',
    entry: 'from-left',
  },
  {
    name: 'Zulal The Lakes 2',
    type: 'Residential',
    thought: 'Quiet joinery and tonal restraint make intimate spaces feel complete.',
    image: '/images/selected-work/zulal-lakes.jpg',
    alt: 'Restrained residential interior at Zulal The Lakes 2',
    url: 'https://studiobespoke.design/projects/zulal-the-lakes-2/',
    entry: 'from-top',
  },
];

export default function SelectedWorkSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const aperture = section.querySelector('[data-work-aperture]');
    const panels = [...section.querySelectorAll('[data-project-panel]')];
    const railGroups = [...section.querySelectorAll('[data-rail-group]')];
    const counterGroups = [...section.querySelectorAll('[data-counter-group]')];
    const rails = section.querySelectorAll('[data-work-rail]');
    const handoff = section.querySelector('[data-depth-handoff]');
    const mediaQuery = gsap.matchMedia();

    mediaQuery.add(
      '(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        const panelParts = panels.map((panel, index) => {
          const clip = panel.querySelector('[data-project-clip]');
          const media = panel.querySelector('[data-project-media]');
          const overlay = panel.querySelector('[data-project-overlay]');
          const entry = projects[index].entry;

          gsap.set(panel, { visibility: index === 0 ? 'visible' : 'hidden', zIndex: 10 + index });
          gsap.set(overlay, { opacity: 0 });

          if (entry === 'vertical') {
            gsap.set(clip, { xPercent: 0, yPercent: 100 });
            gsap.set(media, { xPercent: 0, yPercent: -12 });
          } else if (entry === 'from-right') {
            gsap.set(clip, { xPercent: 100, yPercent: 0 });
            gsap.set(media, { xPercent: -14, yPercent: 0 });
          } else if (entry === 'from-left') {
            gsap.set(clip, { xPercent: -100, yPercent: 0 });
            gsap.set(media, { xPercent: 14, yPercent: 0 });
          } else {
            gsap.set(clip, { xPercent: 0, yPercent: -100 });
            gsap.set(media, { xPercent: 0, yPercent: 14 });
          }

          return { panel, clip, media, overlay };
        });

        railGroups.forEach((group, index) => {
          gsap.set(group, { autoAlpha: index === 0 ? 1 : 0, y: index === 0 ? 0 : 18 });
        });
        counterGroups.forEach((group, index) => {
          gsap.set(group, { autoAlpha: index === 0 ? 1 : 0, y: index === 0 ? 0 : 10 });
        });
        gsap.set(handoff, { autoAlpha: 0, y: 16 });
        gsap.set(aperture, { x: 0, y: 0, scaleX: 1, scaleY: 1, transformOrigin: '50% 50%' });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.58,
            invalidateOnRefresh: true,
          },
        });

        const transferRail = (fromIndex, toIndex, start) => {
          timeline
            .to(railGroups[fromIndex], { autoAlpha: 0, y: -16, duration: 0.055, ease: 'none' }, start)
            .to(counterGroups[fromIndex], { autoAlpha: 0, y: -8, duration: 0.045, ease: 'none' }, start)
            .to(railGroups[toIndex], { autoAlpha: 1, y: 0, duration: 0.075, ease: 'power2.out' }, start + 0.04)
            .to(counterGroups[toIndex], { autoAlpha: 1, y: 0, duration: 0.065, ease: 'power2.out' }, start + 0.04);
        };

        const transferPanel = (fromIndex, toIndex, start, outgoingAxis) => {
          const outgoing = panelParts[fromIndex];
          const incoming = panelParts[toIndex];

          timeline
            .set(incoming.panel, { visibility: 'visible' }, start - 0.04)
            .to(incoming.clip, { xPercent: 0, yPercent: 0, duration: 0.1, ease: 'none' }, start)
            .to(incoming.media, { xPercent: 0, yPercent: 0, duration: 0.13, ease: 'none' }, start)
            .to(outgoing.clip, {
              xPercent: outgoingAxis === 'x-positive' ? 9 : outgoingAxis === 'x-negative' ? -9 : 0,
              yPercent: outgoingAxis === 'y-positive' ? 9 : outgoingAxis === 'y-negative' ? -9 : 0,
              duration: 0.1,
              ease: 'none',
            }, start)
            .to(outgoing.overlay, { opacity: 0.42, duration: 0.1, ease: 'none' }, start)
            .set(outgoing.panel, { visibility: 'hidden' }, start + 0.105);

          transferRail(fromIndex, toIndex, start + 0.015);
        };

        timeline
          .to(panelParts[0].clip, { yPercent: 0, duration: 0.1, ease: 'none' }, 0)
          .to(panelParts[0].media, { yPercent: -3, duration: 0.14, ease: 'none' }, 0)
          .to(panelParts[0].media, { yPercent: 3, duration: 0.14, ease: 'none' }, 0.12);

        transferPanel(0, 1, 0.27, 'x-negative');
        timeline.to(panelParts[1].media, { yPercent: 2.5, duration: 0.09, ease: 'none' }, 0.38);

        transferPanel(1, 2, 0.45, 'x-positive');
        timeline.to(panelParts[2].media, { yPercent: -2.5, duration: 0.1, ease: 'none' }, 0.56);

        transferPanel(2, 3, 0.63, 'y-positive');
        timeline.to(panelParts[3].media, { xPercent: 3, duration: 0.14, ease: 'none' }, 0.74);

        timeline
          .to(rails, { autoAlpha: 0, duration: 0.07, ease: 'none' }, 0.86)
          .to(panelParts[3].overlay, { opacity: 0.62, duration: 0.12, ease: 'none' }, 0.86)
          .to(aperture, {
            x: () => (window.innerWidth / 2) - (aperture.offsetLeft + (aperture.offsetWidth / 2)),
            y: () => (window.innerHeight / 2) - (aperture.offsetTop + (aperture.offsetHeight / 2)),
            scaleX: () => window.innerWidth / aperture.offsetWidth,
            scaleY: () => window.innerHeight / aperture.offsetHeight,
            duration: 0.12,
            ease: 'none',
          }, 0.86)
          .to(handoff, { autoAlpha: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0.9)
          .to({}, { duration: 0.06 });

        ScrollTrigger.refresh();
        return () => timeline.revert();
      },
    );

    return () => mediaQuery.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.selectedWorkSection}
      aria-labelledby="selected-work-title"
      id="work"
    >
      <div className={styles.stickyStage}>
        <aside className={styles.leftRail} data-work-rail>
          <h2 id="selected-work-title" className={styles.eyebrow}>Selected Work</h2>
          <div className={styles.textMask}>
            {projects.map((project) => (
              <article key={project.name} className={styles.railGroup} data-rail-group>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectType}>{project.type}</p>
                <p className={styles.projectThought}>{project.thought}</p>
                <a className={styles.projectLink} href={project.url} target="_blank" rel="noopener noreferrer">
                  View project
                </a>
              </article>
            ))}
          </div>
        </aside>

        <div className={styles.aperture} data-work-aperture>
          {projects.map((project) => (
            <figure key={project.name} className={styles.panel} data-project-panel>
              <div className={styles.clipWrapper} data-project-clip>
                <div className={styles.mediaWrapper} data-project-media>
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 74vw"
                    priority={project === projects[0]}
                    className={styles.projectImage}
                  />
                  <span className={styles.overlay} data-project-overlay aria-hidden="true" />
                </div>
              </div>
            </figure>
          ))}
        </div>

        <aside className={styles.rightRail} data-work-rail aria-label="Selected project position">
          {projects.map((project, index) => (
            <span key={project.name} className={styles.counterGroup} data-counter-group>
              {index + 1} / {projects.length}
            </span>
          ))}
        </aside>

        <div className={styles.depthHandoff} data-depth-handoff aria-hidden="true">
          <span>Next / Featured project</span>
          <strong>One project, in depth.</strong>
        </div>
      </div>

      <div className={styles.staticFallbackList}>
        <header className={styles.staticHeader}>
          <p className={styles.eyebrow}>Selected Work</p>
          <h2>Different lives. Different answers.</h2>
        </header>
        {projects.map((project) => (
          <figure key={project.name} className={styles.staticProjectFigure}>
            <div className={styles.staticImageFrame}>
              <Image src={project.image} alt={project.alt} fill sizes="(max-width: 900px) 92vw, 800px" />
            </div>
            <figcaption className={styles.staticFigcaption}>
              <h3 className={styles.staticProjectName}>{project.name}</h3>
              <p className={styles.staticProjectType}>{project.type}</p>
              <p className={styles.staticProjectThought}>{project.thought}</p>
              <a className={styles.staticProjectLink} href={project.url} target="_blank" rel="noopener noreferrer">
                View project
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
