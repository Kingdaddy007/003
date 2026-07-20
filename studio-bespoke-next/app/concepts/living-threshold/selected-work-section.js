'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/motion';
import styles from './selected-work-section.module.css';

const projects = [
  {
    name: 'Desert Leaf — Al Barari',
    type: 'Residential',
    thought: 'Quiet tones, strong shadows and room for ritual.',
    image: '/images/selected-work-v2/desert-leaf.jpg',
    alt: 'Warm neutral living and dining room at Desert Leaf Al Barari',
    url: 'https://studiobespoke.design/projects/desert-leaf-al-barari/',
    lane: 'left',
    format: 'landscape',
  },
  {
    name: 'Cornelia’s Innovation Hub',
    type: 'Workplace',
    thought: 'Colour and planting turn circulation into social space.',
    image: '/images/selected-work-v2/cornelias-hub.jpg',
    alt: 'Green and terracotta social interior at Cornelia’s Innovation Hub',
    url: 'https://studiobespoke.design/projects/cornelias-innovation-hub/',
    lane: 'right',
    format: 'landscape',
  },
  {
    name: 'Murooj Al Furjan',
    type: 'Residential',
    thought: 'Stone, timber and soft curves settle into one calm plane.',
    image: '/images/selected-work-v2/murooj-al-furjan.jpg',
    alt: 'Stone island and timber kitchen at Murooj Al Furjan',
    url: 'https://studiobespoke.design/projects/murooj-al-furjan-2/',
    lane: 'left',
    format: 'landscape',
  },
  {
    name: 'Damac Hills Master Bedroom',
    type: 'Residential',
    thought: 'Layered timber, linen and travertine make rest feel architectural.',
    image: '/images/selected-work-v2/damac-master-bedroom.jpg',
    alt: 'Layered neutral master bedroom with timber wall detailing at Damac Hills',
    url: 'https://studiobespoke.design/projects/damac-hills-residential/',
    lane: 'left',
    format: 'portrait',
  },
  {
    name: 'The Nest Al Barari',
    type: 'Residential',
    thought: 'A living tree becomes the quiet axis of the home.',
    image: '/images/selected-work-v2/nest-al-barari.jpg',
    alt: 'Minimal living room organized around an existing tree at The Nest Al Barari',
    url: 'https://studiobespoke.design/projects/the-nest-al-barari/',
    lane: 'right',
    format: 'landscape',
  },
  {
    name: 'The Nest Kids Bedroom',
    type: 'Residential',
    thought: 'Climbing, sleeping and storage become one room made for discovery.',
    image: '/images/selected-work-v2/nest-kids-bedroom.jpg',
    alt: 'Blue children’s bedroom with rope bunks and an integrated climbing wall at The Nest',
    url: 'https://studiobespoke.design/projects/kids-bedroom-the-nest-al-barari/',
    lane: 'right',
    format: 'portrait',
  },
  {
    name: 'The Strand Cafe',
    type: 'Hospitality',
    thought: 'Deep blue tile and warm brass compose the evening atmosphere.',
    image: '/images/selected-work-v2/strand-cafe.jpg',
    alt: 'Deep blue tiled bar and warm brass shelving at The Strand Cafe',
    url: 'https://studiobespoke.design/?p=25743',
    lane: 'left',
    format: 'portrait',
  },
  {
    name: 'New Earth Cafe',
    type: 'Hospitality',
    thought: 'Natural fibres and planted ceilings soften a vivid social room.',
    image: '/images/selected-work-v2/new-earth-cafe.jpg',
    alt: 'Plant-filled lounge beneath woven pendant lights at New Earth Cafe',
    url: 'https://studiobespoke.design/projects/new-earth-cafe/',
    lane: 'right',
    format: 'portrait',
  },
  {
    name: 'The Pick',
    type: 'Hospitality',
    thought: 'Light, timber and greenery keep the industrial shell human.',
    image: '/images/selected-work-v2/the-pick.jpg',
    alt: 'Sunlit timber seating and green upholstery at The Pick',
    url: 'https://studiobespoke.design/projects/the-pick/',
    lane: 'left',
    format: 'portrait',
  },
  {
    name: 'Self Love Beauty Co.',
    type: 'Retail',
    thought: 'A botanical envelope turns display into discovery.',
    image: '/images/selected-work-v2/self-love-beauty.jpg',
    alt: 'Botanical retail interior with timber displays at Self Love Beauty Co.',
    url: 'https://studiobespoke.design/projects/self-love-beauty-co/',
    lane: 'right',
    format: 'landscape',
  },
];

const projectLanes = {
  left: projects.filter((project) => project.lane === 'left'),
  right: projects.filter((project) => project.lane === 'right'),
};

function markImageFailure(event, imagePath) {
  const frame = event.currentTarget.closest('[data-work-frame]');
  if (frame) frame.dataset.imageError = 'true';
  if (process.env.NODE_ENV !== 'production') {
    console.error(`Selected Work image failed to load: ${imagePath}`);
  }
}

function ProjectCard({ project, eager = false }) {
  return (
    <article className={`${styles.projectCard} ${styles[project.format]}`} data-work-card>
      <a className={styles.projectLink} href={project.url} target="_blank" rel="noopener noreferrer">
        <div className={styles.imageFrame} data-work-frame>
          <div className={styles.imageInner} data-work-media>
            <Image
              key={eager ? 'eager' : 'lazy'}
              src={project.image}
              alt={project.alt}
              fill
              sizes="(max-width: 900px) 92vw, 34vw"
              loading={eager ? 'eager' : 'lazy'}
              className={styles.projectImage}
              onError={(event) => markImageFailure(event, project.image)}
            />
          </div>
        </div>
        <div className={styles.projectCaption} data-work-caption>
          <p className={styles.projectType}>{project.type}</p>
          <h3 className={styles.projectName}>{project.name}</h3>
          <p className={styles.projectThought}>{project.thought}</p>
          <span className={styles.viewProject}>View project</span>
        </div>
      </a>
    </article>
  );
}

export default function SelectedWorkSection() {
  const sectionRef = useRef(null);
  const [preloadGallery, setPreloadGallery] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const enhancedStory = section.querySelector('[data-work-story]');
    const stickyStage = section.querySelector('[data-work-sticky-stage]');
    const galleryField = section.querySelector('[data-work-gallery-field]');
    const leftLane = section.querySelector('[data-work-lane="left"]');
    const rightLane = section.querySelector('[data-work-lane="right"]');
    const leftFrames = [...section.querySelectorAll('[data-work-lane="left"] [data-work-frame]')];
    const rightFrames = [...section.querySelectorAll('[data-work-lane="right"] [data-work-frame]')];
    const leftMedia = [...section.querySelectorAll('[data-work-lane="left"] [data-work-media]')];
    const rightMedia = [...section.querySelectorAll('[data-work-lane="right"] [data-work-media]')];
    const captions = [...section.querySelectorAll('[data-work-story] [data-work-caption]')];
    const introduction = section.querySelector('[data-work-introduction]');
    const introductionLines = [...section.querySelectorAll('[data-work-intro-line]')];
    const introductionSupport = section.querySelector('[data-work-intro-support]');
    const mediaQuery = gsap.matchMedia();

    mediaQuery.add(
      '(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        if (
          !enhancedStory
          || !stickyStage
          || !galleryField
          || !leftLane
          || !rightLane
          || leftFrames.length !== 5
          || rightFrames.length !== 5
          || leftMedia.length !== 5
          || rightMedia.length !== 5
          || captions.length !== 10
          || !introduction
          || introductionLines.length !== 2
          || !introductionSupport
        ) {
          return undefined;
        }

        section.dataset.enhanced = 'true';

        gsap.set(stickyStage, { backgroundColor: 'transparent' });
        gsap.set(galleryField, { scaleY: 0, transformOrigin: '50% 50%' });
        gsap.set(introduction, { autoAlpha: 0 });
        gsap.set(introductionLines, { yPercent: 112, rotation: 1.2 });
        gsap.set(introductionSupport, { autoAlpha: 0, y: 14 });
        gsap.set([leftLane, rightLane], { autoAlpha: 0 });
        gsap.set(leftFrames, { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(rightFrames, { clipPath: 'inset(0% 0% 100% 0%)' });
        gsap.set(captions, { autoAlpha: 0, y: 18 });

        const setLeftStart = () => window.innerHeight * 0.58;
        const setLeftEnd = () => -(leftLane.scrollHeight - (window.innerHeight * 0.48));
        const setRightStart = () => -(rightLane.scrollHeight - (window.innerHeight * 0.46));
        const setRightEnd = () => window.innerHeight * 0.56;

        const loadGalleryImages = () => {
          setPreloadGallery(true);
        };

        const preloadTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top 180%',
          once: true,
          onEnter: loadGalleryImages,
        });

        if (section.getBoundingClientRect().top <= window.innerHeight * 1.8) {
          loadGalleryImages();
        }

        const processionTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: enhancedStory,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.62,
            invalidateOnRefresh: true,
            onEnter: () => {
              gsap.set(stickyStage, { backgroundColor: 'var(--ivory)' });
            },
            onEnterBack: () => {
              gsap.set(stickyStage, { backgroundColor: 'var(--ivory)' });
            },
            onLeaveBack: () => {
              gsap.set(stickyStage, { backgroundColor: 'transparent' });
            },
            onRefresh: (self) => {
              gsap.set(stickyStage, {
                backgroundColor: self.progress > 0 ? 'var(--ivory)' : 'transparent',
              });
            },
          },
        });

        processionTimeline
          .to(galleryField, {
            scaleY: 1,
            duration: 0.075,
            ease: 'power2.inOut',
          }, 0.01)
          .to(introduction, {
            autoAlpha: 1,
            duration: 0.035,
            ease: 'none',
          }, 0.025)
          .to(introductionLines, {
            yPercent: 0,
            rotation: 0,
            duration: 0.16,
            stagger: 0.025,
            ease: 'power3.out',
          }, 0.03)
          .to(introductionSupport, {
            autoAlpha: 1,
            y: 0,
            duration: 0.09,
            ease: 'power2.out',
          }, 0.09)
          .to([leftLane, rightLane], {
            autoAlpha: 1,
            duration: 0.055,
            ease: 'none',
          }, 0.15)
          .to(leftFrames, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.15,
            stagger: 0.008,
            ease: 'power3.inOut',
          }, 0.15)
          .to(rightFrames, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.15,
            stagger: 0.008,
            ease: 'power3.inOut',
          }, 0.15)
          .to(captions, {
            autoAlpha: 1,
            y: 0,
            duration: 0.1,
            stagger: 0.006,
            ease: 'power2.out',
          }, 0.2)
          .fromTo(leftLane, { y: setLeftStart }, {
            y: setLeftEnd,
            duration: 0.56,
            ease: 'none',
          }, 0.22)
          .fromTo(rightLane, { y: setRightStart }, {
            y: setRightEnd,
            duration: 0.56,
            ease: 'none',
          }, 0.22)
          .fromTo(leftMedia, { yPercent: -7 }, {
            yPercent: 7,
            duration: 0.56,
            ease: 'none',
          }, 0.22)
          .fromTo(rightMedia, { yPercent: 7 }, {
            yPercent: -7,
            duration: 0.56,
            ease: 'none',
          }, 0.22)
          .to(introduction, {
            autoAlpha: 0,
            y: -18,
            duration: 0.08,
            ease: 'none',
          }, 0.72)
          .to([leftLane, rightLane], {
            autoAlpha: 0,
            duration: 0.11,
            ease: 'none',
          }, 0.88)
          .to(galleryField, {
            autoAlpha: 0,
            duration: 0.11,
            ease: 'none',
          }, 0.88);

        ScrollTrigger.refresh();

        return () => {
          preloadTrigger.kill();
          processionTimeline.revert();
          gsap.set(stickyStage, { clearProps: 'backgroundColor' });
          delete section.dataset.enhanced;
        };
      },
    );

    return () => mediaQuery.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.selectedWorkSection}
      aria-label="Selected Work"
      id="work"
    >
      <div className={styles.enhancedStory} data-work-story>
        <div className={styles.stickyStage} data-work-sticky-stage>
          <div className={styles.galleryField} data-work-gallery-field aria-hidden="true" />

          <div className={styles.laneViewport}>
            <div className={`${styles.projectLane} ${styles.leftLane}`} data-work-lane="left">
              {projectLanes.left.map((project) => (
                <ProjectCard key={project.name} project={project} eager={preloadGallery} />
              ))}
            </div>

            <div className={`${styles.projectLane} ${styles.rightLane}`} data-work-lane="right">
              {projectLanes.right.map((project) => (
                <ProjectCard key={project.name} project={project} eager={preloadGallery} />
              ))}
            </div>
          </div>

          <div className={styles.editorialSpine} data-work-introduction>
            <h2 className={styles.heading}>
              <span className={styles.lineMask}>
                <span data-work-intro-line>A point of view,</span>
              </span>
              <span className={styles.lineMask}>
                <em data-work-intro-line>never a formula.</em>
              </span>
            </h2>
            <p className={styles.support} data-work-intro-support>
              Homes, workplaces and places to gather—each shaped around the life inside.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.staticFallbackList}>
        <header className={styles.staticHeader}>
          <h2>A point of view, <em>never a formula.</em></h2>
          <p>Homes, workplaces and places to gather—each shaped around the life inside.</p>
        </header>

        <div className={styles.staticGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
