'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
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
      || !cue
      || reducedMotion
      || compactViewport
    ) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);

    let motionContext;
    let scrubFrameRequest;
    let targetVideoTime = 0;
    const minimumSeekDistance = 0.01;
    const seekInterpolation = 0.12;

    const cancelScrubFrame = () => {
      if (scrubFrameRequest === undefined) {
        return;
      }

      window.cancelAnimationFrame(scrubFrameRequest);
      scrubFrameRequest = undefined;
    };

    const updateScrubbedVideo = () => {
      scrubFrameRequest = undefined;

      const remainingTime = targetVideoTime - video.currentTime;

      if (Math.abs(remainingTime) <= minimumSeekDistance) {
        return;
      }

      if (!video.seeking) {
        const nextTime = video.currentTime + (remainingTime * seekInterpolation);
        video.currentTime = Math.max(0, Math.min(nextTime, video.duration));
      }

      scrubFrameRequest = window.requestAnimationFrame(updateScrubbedVideo);
    };

    const queueScrubFrame = () => {
      if (scrubFrameRequest !== undefined) {
        return;
      }

      scrubFrameRequest = window.requestAnimationFrame(updateScrubbedVideo);
    };

    const revealVideo = () => {
      gsap.set(video, { autoAlpha: 1 });
    };

    const buildScrollChoreography = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0 || motionContext) {
        return;
      }

      video.pause();
      video.currentTime = 0;

      motionContext = gsap.context(() => {
        const scrubProgress = { value: 0 };

        gsap.set(secondaryMessage, { autoAlpha: 0 });
        gsap.set(secondaryLines, { yPercent: 112, rotate: 1.25 });
        gsap.set(secondarySupport, { autoAlpha: 0, y: 18 });

        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: story,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });

        scrollTimeline
          .to(scrubProgress, {
            value: 1,
            duration: 1,
            ease: 'none',
            onUpdate: () => {
              targetVideoTime = scrubProgress.value * Math.max(video.duration - 0.08, 0);
              queueScrubFrame();
            },
          }, 0)
          .to(cue, {
            autoAlpha: 0,
            y: -8,
            duration: 0.12,
            ease: 'none',
          }, 0.02)
          .to(primaryMessage, {
            autoAlpha: 0,
            yPercent: -14,
            duration: 0.24,
            ease: 'none',
          }, 0.12)
          .set(primaryMessage, { pointerEvents: 'none' }, 0.36)
          .set(secondaryMessage, { autoAlpha: 1 }, 0.38)
          .to(secondaryLines, {
            yPercent: 0,
            rotate: 0,
            duration: 0.22,
            stagger: 0.035,
            ease: 'power2.out',
          }, 0.38)
          .to(secondarySupport, {
            autoAlpha: 1,
            y: 0,
            duration: 0.18,
            ease: 'power2.out',
          }, 0.48);
      }, stage);

      ScrollTrigger.refresh();
    };

    const handleVideoError = () => {
      cancelScrubFrame();
      gsap.set(video, { autoAlpha: 0 });
      motionContext?.revert();
      motionContext = undefined;
    };

    video.addEventListener('loadedmetadata', buildScrollChoreography);
    video.addEventListener('loadeddata', revealVideo);
    video.addEventListener('error', handleVideoError);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      buildScrollChoreography();
    }

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      revealVideo();
    }

    video.preload = 'auto';
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', buildScrollChoreography);
      video.removeEventListener('loadeddata', revealVideo);
      video.removeEventListener('error', handleVideoError);
      cancelScrubFrame();
      motionContext?.revert();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={styles.heroVideo}
      muted
      playsInline
      poster={poster}
      preload="metadata"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
