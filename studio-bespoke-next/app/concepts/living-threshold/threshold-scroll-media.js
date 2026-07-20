'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion';
import styles from './living-threshold.module.css';

export default function ThresholdScrollMedia({ poster, src }) {
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    const stage = video?.closest('[data-threshold-stage]');
    const story = stage?.closest('[data-threshold-story]');
    const primaryMessage = stage?.querySelector('[data-threshold-message="primary"]');
    const secondaryMessage = stage?.querySelector('[data-threshold-message="secondary"]');
    const secondaryLines = secondaryMessage?.querySelectorAll('[data-threshold-secondary-line]');
    const secondarySupport = secondaryMessage?.querySelector('[data-threshold-secondary-support]');
    const tertiaryMessage = stage?.querySelector('[data-threshold-message="tertiary"]');
    const tertiaryLines = tertiaryMessage?.querySelectorAll('[data-threshold-tertiary-line]');
    const tertiarySupport = tertiaryMessage?.querySelector('[data-threshold-tertiary-support]');
    const cue = stage?.querySelector('[data-threshold-cue]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compactViewport = window.matchMedia('(max-width: 720px)').matches;

    if (
      !video
      || !stage
      || !story
      || !primaryMessage
      || !secondaryMessage
      || !secondaryLines
      || !secondarySupport
      || !tertiaryMessage
      || !tertiaryLines
      || !tertiarySupport
      || !cue
      || reducedMotion
      || compactViewport
    ) {
      return undefined;
    }

    let motionContext;
    let visibilityObserver;
    let heroIsVisible = true;

    const playAmbientVideo = () => {
      if (!heroIsVisible || document.hidden) {
        return;
      }

      const playback = video.play();
      playback?.catch(() => {
        // The poster remains visible when browser autoplay policy blocks playback.
      });
    };

    const pauseAmbientVideo = () => {
      video.pause();
    };

    const revealVideo = () => {
      gsap.set(video, { autoAlpha: 1 });
    };

    const buildCopyChoreography = () => {
      if (motionContext) {
        return;
      }

      motionContext = gsap.context(() => {
        gsap.set(secondaryMessage, { autoAlpha: 0 });
        gsap.set(secondaryLines, { yPercent: 112, rotate: 1.25 });
        gsap.set(secondarySupport, { autoAlpha: 0, y: 18 });
        gsap.set(tertiaryMessage, { autoAlpha: 0 });
        gsap.set(tertiaryLines, { yPercent: 112, rotate: -1.25 });
        gsap.set(tertiarySupport, { autoAlpha: 0, y: 18 });

        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: story,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.12,
            invalidateOnRefresh: true,
          },
        });

        scrollTimeline
          .to(cue, {
            autoAlpha: 0,
            y: -8,
            duration: 0.12,
            ease: 'none',
          }, 0.02)
          .to(primaryMessage, {
            autoAlpha: 0,
            yPercent: -14,
            duration: 0.18,
            ease: 'none',
          }, 0.1)
          .set(primaryMessage, { pointerEvents: 'none' }, 0.28)
          .set(secondaryMessage, { autoAlpha: 1 }, 0.3)
          .to(secondaryLines, {
            yPercent: 0,
            rotate: 0,
            duration: 0.16,
            stagger: 0.035,
            ease: 'power2.out',
          }, 0.3)
          .to(secondarySupport, {
            autoAlpha: 1,
            y: 0,
            duration: 0.14,
            ease: 'power2.out',
          }, 0.39)
          .to(secondaryMessage, {
            autoAlpha: 0,
            yPercent: -10,
            duration: 0.16,
            ease: 'none',
          }, 0.57)
          .set(secondaryMessage, { pointerEvents: 'none' }, 0.73)
          .set(tertiaryMessage, { autoAlpha: 1 }, 0.66)
          .to(tertiaryLines, {
            yPercent: 0,
            rotate: 0,
            duration: 0.17,
            stagger: 0.035,
            ease: 'power2.out',
          }, 0.66)
          .to(tertiarySupport, {
            autoAlpha: 1,
            y: 0,
            duration: 0.14,
            ease: 'power2.out',
          }, 0.76)
          .to(tertiaryMessage, {
            autoAlpha: 0,
            yPercent: -10,
            duration: 0.14,
            ease: 'none',
          }, 0.88)
          .set(tertiaryMessage, { pointerEvents: 'none' }, 1.02);
      }, stage);

      ScrollTrigger.refresh();
    };

    const handleVideoError = () => {
      pauseAmbientVideo();
      gsap.set(video, { autoAlpha: 0 });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAmbientVideo();
      } else {
        playAmbientVideo();
      }
    };

    visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        heroIsVisible = entry.isIntersecting;
        if (heroIsVisible) {
          playAmbientVideo();
        } else {
          pauseAmbientVideo();
        }
      },
      { threshold: 0.05 },
    );

    visibilityObserver.observe(story);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    video.addEventListener('loadeddata', revealVideo);
    video.addEventListener('canplay', playAmbientVideo);
    video.addEventListener('error', handleVideoError);

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      revealVideo();
      playAmbientVideo();
    }

    buildCopyChoreography();
    video.load();

    return () => {
      video.removeEventListener('loadeddata', revealVideo);
      video.removeEventListener('canplay', playAmbientVideo);
      video.removeEventListener('error', handleVideoError);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      visibilityObserver?.disconnect();
      video.pause();
      motionContext?.revert();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={styles.heroVideo}
      loop
      muted
      playsInline
      poster={poster}
      preload="auto"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support background video playback.
    </video>
  );
}
