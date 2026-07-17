'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/motion';
import styles from './featured-mira-section.module.css';

const videoSource = '/blueprint_draft.mp4';
const completedRoom = '/images/projects/mira/mira-proof.webp';

export default function FeaturedMiraSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    const videoLayer = section.querySelector('[data-mira-video-layer]');
    const completedLayer = section.querySelector('[data-mira-completed-layer]');
    const introduction = section.querySelector('[data-mira-introduction]');
    const firstEvidence = section.querySelector('[data-mira-evidence="first"]');
    const secondEvidence = section.querySelector('[data-mira-evidence="second"]');
    const roomVeil = section.querySelector('[data-mira-veil]');
    const mediaQuery = gsap.matchMedia();
    let scrubFrameRequest;
    let targetVideoTime = 0;
    let timeline;
    let timelineBuilt = false;

    const cancelScrubFrame = () => {
      if (scrubFrameRequest === undefined) return;
      window.cancelAnimationFrame(scrubFrameRequest);
      scrubFrameRequest = undefined;
    };

    const updateScrubbedVideo = () => {
      scrubFrameRequest = undefined;
      if (!Number.isFinite(video.duration) || video.duration <= 0 || !Number.isFinite(video.currentTime)) {
        return;
      }

      const remainingTime = targetVideoTime - video.currentTime;
      if (Math.abs(remainingTime) <= 1 / 18) return;

      if (!video.seeking) {
        const interpolation = gsap.utils.clamp(0.36, 0.84, 0.36 + (Math.abs(remainingTime) * 0.32));
        video.currentTime = gsap.utils.clamp(
          0,
          video.duration,
          video.currentTime + (remainingTime * interpolation),
        );
      }

      scrubFrameRequest = window.requestAnimationFrame(updateScrubbedVideo);
    };

    const queueScrubFrame = () => {
      if (scrubFrameRequest !== undefined) return;
      scrubFrameRequest = window.requestAnimationFrame(updateScrubbedVideo);
    };

    const buildTimeline = () => {
      if (timelineBuilt || !Number.isFinite(video.duration) || video.duration <= 0) return;
      timelineBuilt = true;
      video.pause();
      video.currentTime = 0;

      const scrubProgress = { value: 0 };

      gsap.set(videoLayer, { autoAlpha: 1 });
      gsap.set(completedLayer, { autoAlpha: 0, scale: 1.045 });
      gsap.set(roomVeil, { opacity: 0.22 });
      gsap.set(introduction, { autoAlpha: 1, y: 0 });
      gsap.set([firstEvidence, secondEvidence], { autoAlpha: 0, y: 22 });

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.52,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(scrubProgress, {
          value: 1,
          duration: 0.34,
          ease: 'none',
          onUpdate: () => {
            targetVideoTime = scrubProgress.value * Math.max(video.duration - 0.08, 0);
            queueScrubFrame();
          },
        }, 0.02)
        .to(introduction, { autoAlpha: 0, y: -18, duration: 0.1, ease: 'none' }, 0.22)
        .to(completedLayer, { autoAlpha: 1, scale: 1, duration: 0.15, ease: 'none' }, 0.34)
        .to(videoLayer, { autoAlpha: 0, duration: 0.12, ease: 'none' }, 0.38)
        .to(roomVeil, { opacity: 0.68, duration: 0.12, ease: 'none' }, 0.42)
        .to(firstEvidence, { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.52)
        .to(firstEvidence, { autoAlpha: 0, y: -18, duration: 0.08, ease: 'none' }, 0.7)
        .to(secondEvidence, { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.78)
        .to({}, { duration: 0.16 });

      section.dataset.media = 'enhanced';
      ScrollTrigger.refresh();
    };

    const showStillFallback = () => {
      cancelScrubFrame();
      video.pause();
      gsap.set(videoLayer, { autoAlpha: 0 });
      gsap.set(completedLayer, { autoAlpha: 1, scale: 1 });
      gsap.set(introduction, { autoAlpha: 0 });
      gsap.set(firstEvidence, { autoAlpha: 1, y: 0 });
      gsap.set(secondEvidence, { autoAlpha: 0 });
      gsap.set(roomVeil, { opacity: 0.68 });
      section.dataset.media = 'fallback';
    };

    mediaQuery.add(
      '(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        video.addEventListener('loadedmetadata', buildTimeline);
        video.addEventListener('error', showStillFallback);

        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) buildTimeline();
        video.load();

        return () => {
          video.removeEventListener('loadedmetadata', buildTimeline);
          video.removeEventListener('error', showStillFallback);
          cancelScrubFrame();
          video.pause();
          timeline?.revert();
          timeline = undefined;
          timelineBuilt = false;
        };
      },
    );

    return () => mediaQuery.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.featuredSection}
      aria-labelledby="featured-mira-title"
      id="featured-project"
      data-media="static"
    >
      <div className={styles.stickyStage}>
        <div className={styles.media}>
          <div className={styles.completedLayer} data-mira-completed-layer>
            <Image
              src={completedRoom}
              alt="Completed Mira kitchen with connected arched openings and central island"
              fill
              sizes="100vw"
              className={styles.roomImage}
              priority={false}
            />
          </div>
          <div className={styles.videoLayer} data-mira-video-layer aria-hidden="true">
            <video ref={videoRef} muted playsInline preload="metadata">
              <source src={videoSource} type="video/mp4" />
            </video>
          </div>
          <div className={styles.roomVeil} data-mira-veil aria-hidden="true" />
        </div>

        <header className={styles.introduction} data-mira-introduction>
          <p className={styles.eyebrow}>Featured Project</p>
          <h2 id="featured-mira-title">Mira Villa</h2>
          <p>From architectural intention to a home made open.</p>
        </header>

        <div className={styles.evidenceRail}>
          <article className={styles.evidence} data-mira-evidence="first">
            <p className={styles.eyebrow}>The decisive intervention</p>
            <h3>Internal walls removed.</h3>
            <p>
              Opening the central partitions connected kitchen, dining and living into one
              ground-floor relationship, changing how light and movement travelled through the home.
            </p>
          </article>

          <article className={styles.evidence} data-mira-evidence="second">
            <p className={styles.eyebrow}>The lived consequence</p>
            <h3>The island as social anchor.</h3>
            <p>
              The island supports the client&apos;s baking routine while cooking, conversation and
              gathering remain in the same shared space.
            </p>
          </article>
        </div>
      </div>

      <div className={styles.staticFallback}>
        <header>
          <p className={styles.eyebrow}>Featured Project</p>
          <h2>Mira Villa</h2>
          <p>From architectural intention to a home made open.</p>
        </header>
        <div className={styles.staticRoom}>
          <Image
            src={completedRoom}
            alt="Completed Mira kitchen with connected arched openings and central island"
            fill
            sizes="(max-width: 900px) 100vw, 900px"
          />
        </div>
        <article>
          <p className={styles.eyebrow}>The decisive intervention</p>
          <h3>Internal walls removed.</h3>
          <p>
            Opening the central partitions connected kitchen, dining and living into one
            ground-floor relationship, changing how light and movement travelled through the home.
          </p>
        </article>
        <article>
          <p className={styles.eyebrow}>The lived consequence</p>
          <h3>The island as social anchor.</h3>
          <p>
            The island supports the client&apos;s baking routine while cooking, conversation and
            gathering remain in the same shared space.
          </p>
        </article>
      </div>
    </section>
  );
}
