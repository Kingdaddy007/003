'use client';

import { useEffect, useRef } from 'react';
import BlueprintFallback from '@/components/BlueprintFallback';
import { homepageContent } from '@/content/homepage';
import { gsap } from '@/lib/motion';

export default function OpeningPlanStage() {
  const stageRef = useRef(null);
  const blueprintLayerRef = useRef(null);
  const videoRef = useRef(null);
  const planRef = useRef(null);
  const shadeRef = useRef(null);
  const sweepRef = useRef(null);
  const openingSectionRef = useRef(null);
  const inheritedSectionRef = useRef(null);
  const openingCopyRef = useRef(null);
  const inheritedCopyRef = useRef(null);
  const inheritedRoomRef = useRef(null);
  const cueRef = useRef(null);

  const { opening, inheritedPlan } = homepageContent;

  useEffect(() => {
    const stage = stageRef.current;
    const blueprintLayer = blueprintLayerRef.current;
    const video = videoRef.current;
    const plan = planRef.current;
    const shade = shadeRef.current;
    const sweep = sweepRef.current;
    const openingSection = openingSectionRef.current;
    const inheritedSection = inheritedSectionRef.current;
    const openingCopy = openingCopyRef.current;
    const inheritedCopy = inheritedCopyRef.current;
    const inheritedRoom = inheritedRoomRef.current;
    const cue = cueRef.current;

    if (
      !stage || !blueprintLayer || !video || !plan || !shade || !sweep || !openingSection ||
      !inheritedSection || !openingCopy || !inheritedCopy || !inheritedRoom || !cue
    ) {
      return undefined;
    }

    const enhancedMotionQuery = window.matchMedia(
      '(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    const fallbackSvg = plan.querySelector('.shared-plan-svg');
    const header = document.querySelector('.site-header-shell');
    let videoReady = false;
    let fallbackCommitted = false;
    let roomCoversVideo = false;
    let fallbackTimeout;

    const commitToFallback = () => {
      fallbackCommitted = true;
      videoReady = false;
      video.pause();
      gsap.set(video, { opacity: 0 });
      if (fallbackSvg) gsap.set(fallbackSvg, { opacity: 0.3 });
    };

    const revealVideo = async () => {
      if (!enhancedMotionQuery.matches || fallbackCommitted || videoReady) return;

      try {
        await video.play();
      } catch {
        commitToFallback();
        return;
      }

      if (fallbackCommitted) {
        video.pause();
        return;
      }

      videoReady = true;
      window.clearTimeout(fallbackTimeout);
      gsap.to(video, { opacity: 0.34, duration: 0.55, ease: 'power2.out' });
      if (fallbackSvg) {
        gsap.to(fallbackSvg, { opacity: 0.08, duration: 0.55, ease: 'power2.out' });
      }
    };

    const handleVideoError = () => commitToFallback();
    const handleMotionPreferenceChange = () => {
      if (!enhancedMotionQuery.matches) commitToFallback();
    };
    video.addEventListener('canplay', revealVideo, { once: true });
    video.addEventListener('error', handleVideoError);
    enhancedMotionQuery.addEventListener('change', handleMotionPreferenceChange);

    if (enhancedMotionQuery.matches) {
      fallbackTimeout = window.setTimeout(commitToFallback, 1000);
      video.load();
    } else {
      commitToFallback();
    }

    const stageObserver = new IntersectionObserver(([entry]) => {
      if (!videoReady) return;

      if (entry.isIntersecting && !roomCoversVideo) {
        video.play().catch(() => commitToFallback());
      } else {
        video.pause();
      }
    });
    stageObserver.observe(stage);

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        '(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          stage.classList.add('is-opening-enhanced');
          const words = openingCopy.querySelectorAll('.opening-word');
          const attribution = openingCopy.querySelector('.opening-attribution');

          const arrival = gsap.timeline();
          arrival
            .fromTo(
              words,
              { opacity: 0.28, y: 10 },
              { opacity: 1, y: 0, duration: 0.68, stagger: 0.025, ease: 'power2.out' },
              0.18,
            )
            .fromTo(
              attribution,
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
              0.55,
            )
            .fromTo(
              cue,
              { opacity: 0 },
              { opacity: 1, duration: 0.48, ease: 'power2.out' },
              0.72,
            )
            .fromTo(
              sweep,
              { opacity: 0, x: 0 },
              { opacity: 0.78, x: '128vw', duration: 1.35, ease: 'power2.inOut' },
              0.08,
            );

          if (header) {
            arrival.fromTo(
              header,
              { opacity: 0, y: -8 },
              { opacity: 1, y: 0, duration: 0.52, ease: 'power2.out' },
              0.82,
            );
          }

          const openingHandoff = gsap.timeline({
            scrollTrigger: {
              trigger: openingSection,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.42,
              invalidateOnRefresh: true,
            },
          });

          openingHandoff
            .to([openingCopy, cue], { autoAlpha: 0, y: -72, duration: 1, ease: 'none' }, 0);

          gsap.set(inheritedRoom, { autoAlpha: 0 });

          const mediaCrossfade = gsap.timeline({
            scrollTrigger: {
              trigger: inheritedSection,
              start: 'top 90%',
              end: 'top 30%',
              scrub: 1.2,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const isCovered = self.progress >= 0.98;
                if (isCovered === roomCoversVideo) return;

                roomCoversVideo = isCovered;
                if (isCovered) {
                  video.pause();
                } else if (videoReady) {
                  video.play().catch(() => commitToFallback());
                }
              },
            },
          });

          mediaCrossfade
            .to(blueprintLayer, { opacity: 0, duration: 1, ease: 'none' }, 0)
            .to(inheritedRoom, { autoAlpha: 1, duration: 1, ease: 'none' }, 0)
            .to(shade, { opacity: 0.52, duration: 1, ease: 'none' }, 0);

          const inheritedExit = gsap.timeline({
            scrollTrigger: {
              trigger: inheritedSection,
              start: 'bottom 82%',
              end: 'bottom 18%',
              scrub: 0.42,
              invalidateOnRefresh: true,
            },
          });

          inheritedExit
            .to(inheritedCopy, { autoAlpha: 0, y: -56, duration: 1, ease: 'none' }, 0);

          return () => {
            stage.classList.remove('is-opening-enhanced');
            arrival.revert();
            openingHandoff.revert();
            mediaCrossfade.revert();
            inheritedExit.revert();
          };
        },
      );
    }, stage);

    return () => {
      window.clearTimeout(fallbackTimeout);
      video.removeEventListener('canplay', revealVideo);
      video.removeEventListener('error', handleVideoError);
      enhancedMotionQuery.removeEventListener('change', handleMotionPreferenceChange);
      stageObserver.disconnect();
      video.pause();
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <div className="opening-plan-stage" ref={stageRef}>
      <div className="shared-plan-plane" ref={planRef} aria-hidden="true">
        <div className="shared-plan-blueprint" ref={blueprintLayerRef}>
          <BlueprintFallback />
          <video
            className="shared-plan-video"
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
          >
            <source src="/blueprint_draft.mp4" type="video/mp4" />
          </video>
        </div>
        <div
          className="shared-plan-room"
          ref={inheritedRoomRef}
          style={{ backgroundImage: `url("${homepageContent.miraProof.image}")` }}
        />
        <div className="shared-plan-light" ref={sweepRef} />
        <div className="shared-plan-shade" ref={shadeRef} />
      </div>

      <section
        id="opening"
        className="opening-section"
        ref={openingSectionRef}
        aria-labelledby="opening-title"
        data-header-theme="plan-light"
        tabIndex={-1}
      >
        <div className="sb-container opening-copy" ref={openingCopyRef}>
          <h1 id="opening-title" className="opening-title">
            {opening.title.split(' ').map((word, index) => (
              <span className="opening-word" key={`${word}-${index}`}>{word} </span>
            ))}
          </h1>
          <p className="opening-attribution">{opening.attribution}</p>
        </div>
        <a className="opening-cue" href="#inherited-plan" ref={cueRef}>
          <span className="opening-cue-line" aria-hidden="true" />
          <span>Enter</span>
        </a>
      </section>

      <section
        id="inherited-plan"
        className="inherited-plan-section"
        ref={inheritedSectionRef}
        aria-labelledby="inherited-plan-title"
        data-header-theme="plan-shaded"
        tabIndex={-1}
      >
        <div
          className="inherited-plan-room-static"
          style={{ backgroundImage: `url("${homepageContent.miraProof.image}")` }}
          aria-hidden="true"
        />
        <div className="sb-container inherited-plan-layout" ref={inheritedCopyRef}>
          <div className="inherited-plan-copy">
            <p className="eyebrow inherited-plan-eyebrow">{inheritedPlan.eyebrow}</p>
            <h2 id="inherited-plan-title" className="section-title inherited-plan-title">
              Closed rooms.<br />Borrowed habits.
            </h2>
            <p className="inherited-plan-body">{inheritedPlan.claim}</p>
          </div>
          <p className="inherited-plan-note">{inheritedPlan.note}</p>
        </div>
      </section>
    </div>
  );
}
