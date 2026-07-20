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
    const galleryTrack = section.querySelector('[data-mira-track]');
    const trackFrames = [...section.querySelectorAll('[data-track-frame]')];
    const frameInners = [...section.querySelectorAll('[data-frame-inner]')];
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
          || !galleryTrack
          || trackFrames.length !== miraImages.length
          || frameInners.length !== miraImages.length
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

          // Concept 2 Initial State:
          // Track is at x: 0. Frame 0 starts full screen (100vw width, 100svh height, 0 inset).
          gsap.set(galleryTrack, { xPercent: 0, x: 0 });
          gsap.set(trackFrames[0], {
            width: '100vw',
            height: '100vh',
            borderRadius: '0px',
            opacity: 1,
          });

          // Neighbor frames start in track flow but dimmed slightly (opacity 0.65)
          for (let i = 1; i < trackFrames.length; i += 1) {
            gsap.set(trackFrames[i], {
              width: '68vw',
              height: '72vh',
              opacity: 0.65,
            });
            gsap.set(frameInners[i], { xPercent: 0 });
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

          // 0.00 - 0.28: Video Scrub & Title hold
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

          // 0.28 - 0.40: Crossfade video -> completed room anchor /03-k14.jpg (Full screen)
          storyTimeline.to(videoLayer, { autoAlpha: 0, duration: 0.12, ease: 'none' }, 0.28);

          // 0.40 - 0.50: Reframe full-screen Frame 0 down into gallery frame size (68vw x 72vh); Title fades out
          storyTimeline
            .to(trackFrames[0], {
              width: '68vw',
              height: '72vh',
              borderRadius: '4px',
              duration: 0.1,
              ease: 'power2.inOut',
            }, 0.40)
            .to(introduction, {
              autoAlpha: 0,
              y: -20,
              duration: 0.08,
              ease: 'power2.in',
            }, 0.42);

          // 0.50 - 0.88: Map vertical scroll to horizontal track translation (from Frame 0 centered to Frame 5 centered)
          // Frame width = 68vw + gap 3vw = 71vw per step. Total 5 steps = -355vw.
          const totalTrackShift = -(5 * 71); // in vw

          storyTimeline.to(galleryTrack, {
            x: `${totalTrackShift}vw`,
            duration: 0.38,
            ease: 'none',
          }, 0.50);

          // Animate opacity highlights for active vs neighbour frames along the track scrub
          trackFrames.forEach((frame, index) => {
            if (index === 0) {
              storyTimeline.to(frame, { opacity: 0.65, duration: 0.06, ease: 'none' }, 0.54);
            } else {
              const activeStart = 0.50 + ((index - 0.5) * (0.38 / 5));
              const activePeak = 0.50 + (index * (0.38 / 5));
              const activeEnd = 0.50 + ((index + 0.5) * (0.38 / 5));

              storyTimeline
                .to(frame, { opacity: 1, duration: 0.04, ease: 'none' }, Math.max(activeStart, 0.50))
                .to(frameInners[index], { xPercent: -6, duration: 0.08, ease: 'none' }, activeStart);

              if (index < trackFrames.length - 1) {
                storyTimeline.to(frame, { opacity: 0.65, duration: 0.04, ease: 'none' }, Math.min(activeEnd, 0.88));
              }
            }
          });

          // 0.88 - 0.96: Final frame hold
          // 0.96 - 1.00: Optional "View the project" link appears
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
          <div className={styles.galleryViewport}>
            <div className={styles.galleryTrack} data-mira-track>
              {miraImages.map((image, index) => (
                <div
                  key={image.src}
                  className={styles.trackFrame}
                  data-track-frame={index}
                >
                  <div className={styles.frameInner} data-frame-inner={index}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="72vw"
                      className={styles.roomImage}
                      priority={index === 0}
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>

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
