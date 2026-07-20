'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/motion';
import styles from './featured-mira-section.module.css';

const videoSource = '/blueprint_draft.mp4';

const miraImages = [
  {
    src: '/images/projects/mira/03-k14.jpg',
    alt: 'Completed Mira kitchen island, arch and circulation relationship',
  },
  {
    src: '/images/projects/mira/06-k15.jpg',
    alt: 'Long spatial view across the Mira kitchen island toward the arched doorway',
  },
  {
    src: '/images/projects/mira/08-k03.jpg',
    alt: 'Open Mira kitchen with island, tall joinery and arched circulation',
  },
  {
    src: '/images/projects/mira/02-k16.jpg',
    alt: 'Mira stair and fluted-glass doorway in pale timber and plaster tones',
  },
  {
    src: '/images/projects/mira/04-mira-27.jpg',
    alt: 'Coffee machine and objects arranged against the Mira stone backsplash',
  },
  {
    src: '/images/projects/mira/18-k04.jpg',
    alt: 'Bread and flowers arranged at the working edge of the Mira island',
  },
];

function reportMediaFailure(message, error) {
  if (process.env.NODE_ENV === 'production') return;
  console.error(message, error);
}

export default function FeaturedMiraSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    const story = section.querySelector('[data-mira-story]');
    const stickyStage = section.querySelector('[data-mira-sticky-stage]');
    const videoLayer = section.querySelector('[data-mira-video-layer]');
    const introduction = section.querySelector('[data-mira-introduction]');
    const windowLayers = [...section.querySelectorAll('[data-window-layer]')];
    const windowInners = [...section.querySelectorAll('[data-window-inner]')];
    const projectAction = section.querySelector('[data-mira-action]');

    const mediaQuery = gsap.matchMedia();
    let scrubFrameRequest;
    let targetVideoTime = 0;
    let storyTimeline;
    let timelineBuilt = false;

    const cancelScrubFrame = () => {
      if (scrubFrameRequest === undefined) return;
      window.cancelAnimationFrame(scrubFrameRequest);
      scrubFrameRequest = undefined;
    };

    const updateScrubbedVideo = () => {
      scrubFrameRequest = undefined;
      if (!Number.isFinite(video.duration) || video.duration <= 0 || !Number.isFinite(video.currentTime)) {
        reportMediaFailure('Mira video scrub stopped because the media duration is invalid.');
        section.dataset.media = 'fallback';
        return;
      }

      const remainingTime = targetVideoTime - video.currentTime;
      if (!Number.isFinite(remainingTime) || Math.abs(remainingTime) <= 1 / 18) return;

      if (!video.seeking) {
        const interpolation = gsap.utils.clamp(0.36, 0.84, 0.36 + (Math.abs(remainingTime) * 0.32));
        const nextTime = gsap.utils.clamp(
          0,
          video.duration,
          video.currentTime + (remainingTime * interpolation),
        );

        try {
          video.currentTime = nextTime;
        } catch (error) {
          reportMediaFailure('Mira video seek failed; preserving the completed-room fallback.', error);
          section.dataset.media = 'fallback';
          return;
        }
      }

      scrubFrameRequest = window.requestAnimationFrame(updateScrubbedVideo);
    };

    const queueScrubFrame = () => {
      if (scrubFrameRequest !== undefined) return;
      scrubFrameRequest = window.requestAnimationFrame(updateScrubbedVideo);
    };

    mediaQuery.add(
      '(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        if (
          !story
          || !stickyStage
          || !videoLayer
          || !introduction
          || windowLayers.length !== miraImages.length
          || windowInners.length !== miraImages.length
        ) {
          return undefined;
        }

        section.dataset.enhanced = 'true';

        const buildTimeline = ({ scrubVideo }) => {
          if (timelineBuilt) return;
          if (scrubVideo && (!Number.isFinite(video.duration) || video.duration <= 0)) return;

          timelineBuilt = true;
          video.pause();

          if (scrubVideo) {
            try {
              video.currentTime = 0;
            } catch (error) {
              reportMediaFailure('Mira video could not seek to its opening frame.', error);
            }
          }

          const scrubProgress = { value: 0 };

          // Initial positions for Concept 1 Architectural Window:
          // Layer 0 (Anchor 03-k14.jpg): visible at base
          gsap.set(windowLayers[0], { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' });
          gsap.set(windowInners[0], { yPercent: 0 });

          // Layers 1 to 5: masked off at bottom with clip-path, inner counter-offset
          for (let i = 1; i < windowLayers.length; i += 1) {
            gsap.set(windowLayers[i], { clipPath: 'inset(100% 0% 0% 0%)' });
            gsap.set(windowInners[i], { yPercent: -10 });
          }

          gsap.set(videoLayer, { autoAlpha: scrubVideo ? 1 : 0 });
          gsap.set(introduction, { autoAlpha: 1, y: 0 });
          if (projectAction) gsap.set(projectAction, { autoAlpha: 0, y: 16 });

          storyTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: story,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });

          // Playhead 0.00 - 0.28: Video Scrub & Title hold
          if (scrubVideo) {
            storyTimeline.to(scrubProgress, {
              value: 1,
              duration: 0.28,
              ease: 'none',
              onUpdate: () => {
                targetVideoTime = scrubProgress.value * Math.max(video.duration - 0.08, 0);
                queueScrubFrame();
              },
            }, 0.00);
          }

          // Playhead 0.28 - 0.38: Crossfade video -> completed room anchor /03-k14.jpg
          storyTimeline.to(videoLayer, { autoAlpha: 0, duration: 0.1, ease: 'none' }, 0.28);

          // Playhead 0.38 - 0.48: Clear room hold; title fades out
          storyTimeline.to(introduction, { autoAlpha: 0, y: -20, duration: 0.06, ease: 'power2.in' }, 0.42);

          // Playhead 0.48 - 0.58: Window 1 (Long spatial view 06-k15.jpg)
          storyTimeline
            .to(windowLayers[1], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.1, ease: 'power2.inOut' }, 0.48)
            .to(windowInners[1], { yPercent: 0, duration: 0.1, ease: 'power2.inOut' }, 0.48);

          // Playhead 0.58 - 0.68: Window 2 (Open-plan view 08-k03.jpg)
          storyTimeline
            .to(windowLayers[2], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.1, ease: 'power2.inOut' }, 0.58)
            .to(windowInners[2], { yPercent: 0, duration: 0.1, ease: 'power2.inOut' }, 0.58);

          // Playhead 0.68 - 0.78: Window 3 (Threshold/stair view 02-k16.jpg)
          storyTimeline
            .to(windowLayers[3], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.1, ease: 'power2.inOut' }, 0.68)
            .to(windowInners[3], { yPercent: 0, duration: 0.1, ease: 'power2.inOut' }, 0.68);

          // Playhead 0.78 - 0.88: Window 4 (Working wall view 04-mira-27.jpg)
          storyTimeline
            .to(windowLayers[4], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.1, ease: 'power2.inOut' }, 0.78)
            .to(windowInners[4], { yPercent: 0, duration: 0.1, ease: 'power2.inOut' }, 0.78);

          // Playhead 0.88 - 0.96: Window 5 (Lived material detail 18-k04.jpg)
          storyTimeline
            .to(windowLayers[5], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.08, ease: 'power2.inOut' }, 0.88)
            .to(windowInners[5], { yPercent: 0, duration: 0.08, ease: 'power2.inOut' }, 0.88);

          // Playhead 0.96 - 1.00: Final photograph hold & optional "View the project" link
          if (projectAction) {
            storyTimeline.to(projectAction, { autoAlpha: 1, y: 0, duration: 0.04, ease: 'power2.out' }, 0.96);
          }

          section.dataset.media = scrubVideo ? 'enhanced' : 'fallback';
          ScrollTrigger.refresh();
        };

        const handleLoadedMetadata = () => buildTimeline({ scrubVideo: true });
        const handleLoadedData = () => {
          section.dataset.videoReady = 'true';
        };
        const handleVideoError = (event) => {
          reportMediaFailure('Mira blueprint video failed to load; using the completed-room sequence.', event);
          cancelScrubFrame();
          buildTimeline({ scrubVideo: false });
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('error', handleVideoError);

        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
          buildTimeline({ scrubVideo: true });
        } else {
          video.load();
        }

        return () => {
          video.removeEventListener('loadedmetadata', handleLoadedMetadata);
          video.removeEventListener('loadeddata', handleLoadedData);
          video.removeEventListener('error', handleVideoError);
          cancelScrubFrame();
          video.pause();
          storyTimeline?.revert();
          storyTimeline = undefined;
          timelineBuilt = false;
          delete section.dataset.enhanced;
          delete section.dataset.videoReady;
        };
      },
    );

    return () => mediaQuery.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.featuredSection}
      aria-label="Mira Villa"
      id="featured-project"
      data-media="static"
    >
      <div className={styles.story} data-mira-story>
        <div className={styles.stickyStage} data-mira-sticky-stage>
          <div className={styles.windowStage}>
            {miraImages.map((image, index) => (
              <div
                key={image.src}
                className={styles.windowLayer}
                data-window-layer={index}
                style={{ zIndex: 10 + index }}
              >
                <div className={styles.windowInner} data-window-inner={index}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="100vw"
                    className={styles.roomImage}
                    priority={index === 0}
                    unoptimized
                  />
                </div>
              </div>
            ))}

            <div className={styles.videoLayer} data-mira-video-layer aria-hidden="true">
              <video ref={videoRef} muted playsInline preload="metadata">
                <source src={videoSource} type="video/mp4" />
              </video>
            </div>

            <header className={styles.introduction} data-mira-introduction>
              <h2>Mira Villa</h2>
              <span>A home made open.</span>
            </header>

            <div className={styles.projectAction} data-mira-action>
              <a
                href="https://studiobespoke.design/projects/mira-villa/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionLink}
              >
                View the project
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.staticFallback}>
        <header>
          <h2>Mira Villa</h2>
          <span>A home made open.</span>
        </header>

        <div className={styles.staticHero}>
          <Image
            src={miraImages[0].src}
            alt={miraImages[0].alt}
            fill
            sizes="100vw"
            unoptimized
          />
        </div>

        <div className={styles.staticReel} aria-label="Mira Villa image gallery">
          {miraImages.slice(1).map((image) => (
            <figure key={image.src}>
              <Image src={image.src} alt={image.alt} fill sizes="82vw" />
            </figure>
          ))}
        </div>

        <div className={styles.staticAction}>
          <a
            href="https://studiobespoke.design/projects/mira-villa/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionLink}
          >
            View the project
          </a>
        </div>
      </div>
    </section>
  );
}
