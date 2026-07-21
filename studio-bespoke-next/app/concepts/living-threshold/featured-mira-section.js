'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/motion';
import styles from './featured-mira-section.module.css';

const videoSource = '/blueprint_draft.mp4';
const videoLeadIn = 0.55;

const miraImages = [
  {
    src: '/images/projects/mira/03-k14.jpg',
    alt: 'Completed Mira kitchen island, arch and circulation relationship',
    caption: 'Kitchen, arch and circulation',
    frameWidth: 68,
    fieldColor: '#e5ded4',
  },
  {
    src: '/images/projects/mira/07-mira-25.jpg',
    alt: 'Axial view through the Mira kitchen arch toward the garden window',
    caption: 'Garden axis through the arch',
    frameWidth: 64,
    fieldColor: '#ddd3c5',
  },
  {
    src: '/images/projects/mira/05-k11.jpg',
    alt: 'Arched pantry opening with integrated oak cabinetry and illuminated shelving',
    caption: 'Integrated pantry joinery',
    frameWidth: 40,
    fieldColor: '#e8e0d5',
  },
  {
    src: '/images/projects/mira/15-mira-29.jpg',
    alt: 'Wide view of the sculptural Mira stone island and oak cabinetry',
    caption: 'Stone island and oak cabinetry',
    frameWidth: 68,
    fieldColor: '#d8ccbd',
  },
  {
    src: '/images/projects/mira/11-k06.jpg',
    alt: 'Illuminated bespoke cookbook display beside the Mira island',
    caption: 'Bespoke cookbook joinery',
    frameWidth: 40,
    fieldColor: '#d3c2ad',
  },
  {
    src: '/images/projects/mira/01-k09.jpg',
    alt: 'Stone island, oak stools and flowers showing the Mira material palette in use',
    caption: 'Stone, oak and marble',
    frameWidth: 64,
    fieldColor: '#cdb9a2',
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
    const chapterPortal = section.querySelector('[data-mira-chapter-portal]');
    const chapterCopy = section.querySelector('[data-mira-chapter-copy]');
    const siteHeader = document.querySelector('[data-threshold-header]');
    const galleryField = section.querySelector('[data-mira-gallery-field]');
    const galleryTrack = section.querySelector('[data-mira-track]');
    const trackFrames = [...section.querySelectorAll('[data-track-frame]')];
    const frameInners = [...section.querySelectorAll('[data-frame-inner]')];
    const captionRail = section.querySelector('[data-mira-caption-rail]');
    const captionItems = [...section.querySelectorAll('[data-mira-caption]')];
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
          || !chapterPortal
          || !chapterCopy
          || !galleryField
          || !galleryTrack
          || trackFrames.length !== miraImages.length
          || frameInners.length !== miraImages.length
          || !captionRail
          || captionItems.length !== miraImages.length
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
              video.currentTime = Math.min(videoLeadIn, video.duration);
            } catch (error) {
              reportMediaFailure('Mira video could not seek to its opening frame.', error);
            }
          }

          const scrubProgress = { value: 0 };
          const totalSteps = miraImages.length - 1;
          const galleryStart = 0.52;
          const galleryEnd = 0.84;
          const scrubDuration = galleryEnd - galleryStart;
          const stepWindow = scrubDuration / totalSteps;
          const centeredTrackX = (index) => -(
            trackFrames[index].offsetLeft + (trackFrames[index].offsetWidth / 2)
          );

          gsap.set(galleryField, { backgroundColor: miraImages[0].fieldColor });
          gsap.set(galleryTrack, { xPercent: 0, x: () => centeredTrackX(0) });
          gsap.set(trackFrames[0], {
            scaleX: () => window.innerWidth / trackFrames[0].offsetWidth,
            scaleY: () => window.innerHeight / trackFrames[0].offsetHeight,
            borderRadius: '0px',
            opacity: 1,
          });

          for (let i = 1; i < trackFrames.length; i += 1) {
            gsap.set(trackFrames[i], {
              scaleX: 1,
              scaleY: 1,
              y: 0,
              opacity: 0,
            });
            gsap.set(frameInners[i], { xPercent: 0 });
          }

          gsap.set(videoLayer, { autoAlpha: scrubVideo ? 1 : 0 });
          gsap.set(chapterPortal, { autoAlpha: 1 });
          gsap.set(chapterCopy, { autoAlpha: 1, y: 0 });
          gsap.set(captionRail, { autoAlpha: 0 });
          gsap.set(captionItems, { autoAlpha: 0, y: 8 });
          if (projectAction) gsap.set(projectAction, { autoAlpha: 0, y: 16 });

          storyTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: story,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.5,
              invalidateOnRefresh: true,
              onEnter: () => {
                if (siteHeader) {
                  gsap.set(siteHeader, { autoAlpha: 0, y: -18, pointerEvents: 'none' });
                }
              },
              onEnterBack: () => {
                if (siteHeader) {
                  gsap.set(siteHeader, { autoAlpha: 0, y: -18, pointerEvents: 'none' });
                }
              },
              onLeave: () => {
                if (siteHeader) {
                  gsap.set(siteHeader, { autoAlpha: 1, y: 0, pointerEvents: 'auto' });
                }
              },
              onLeaveBack: () => {
                if (siteHeader) {
                  gsap.set(siteHeader, { autoAlpha: 1, y: 0, pointerEvents: 'auto' });
                }
              },
              snap: {
                snapTo: (progress) => {
                  if (progress < galleryStart || progress > galleryEnd) return progress;
                  const galleryProgress = (progress - galleryStart) / scrubDuration;
                  const nearestFrame = Math.round(galleryProgress * totalSteps);
                  return galleryStart + ((nearestFrame / totalSteps) * scrubDuration);
                },
                delay: 0.12,
                duration: { min: 0.12, max: 0.28 },
                ease: 'power1.inOut',
              },
            },
          });

          // 0.00 - 0.40: blueprint threshold
          storyTimeline
            .to(chapterCopy, {
              autoAlpha: 0,
              y: -28,
              duration: 0.08,
              ease: 'power2.in',
            }, 0.10)
            .to(chapterPortal, {
              autoAlpha: 0,
              duration: 0.035,
              ease: 'none',
            }, 0.18);

          // 0.00 - 0.28: Blueprint Video Scrub
          if (scrubVideo) {
            storyTimeline.to(scrubProgress, {
              value: 1,
              duration: 0.28,
              ease: 'none',
              onUpdate: () => {
                targetVideoTime = videoLeadIn + (
                  scrubProgress.value * Math.max(video.duration - videoLeadIn - 0.08, 0)
                );
                queueScrubFrame();
              },
            }, 0.00);
          }

          // 0.28 - 0.40: Crossfade video -> completed room anchor /03-k14.jpg
          storyTimeline.to(videoLayer, { autoAlpha: 0, duration: 0.12, ease: 'none' }, 0.28);

          // 0.40 - 0.52: reframe room down into finite gallery track
          storyTimeline
            .to(trackFrames[0], {
              scaleX: 1,
              scaleY: 1,
              y: 0,
              borderRadius: '4px',
              duration: 0.12,
              ease: 'power2.inOut',
            }, 0.40)
            .to(galleryTrack, {
              x: '0vw',
              duration: 0.12,
              ease: 'power2.inOut',
            }, 0.40)
            .to(trackFrames.slice(1), {
              opacity: 0.82,
              duration: 0.07,
              ease: 'none',
            }, 0.45)
            .to(captionRail, {
              autoAlpha: 1,
              duration: 0.05,
              ease: 'none',
            }, 0.47)
            .to(captionItems[0], {
              autoAlpha: 1,
              y: 0,
              duration: 0.05,
              ease: 'power2.out',
            }, 0.47);

          // 0.52 - 0.84: photo track procession
          for (let i = 1; i <= totalSteps; i += 1) {
            const stepStart = galleryStart + ((i - 1) * stepWindow);
            const moveDuration = stepWindow;

            storyTimeline.to(galleryTrack, {
              x: () => centeredTrackX(i),
              duration: moveDuration,
              ease: 'none',
            }, stepStart);

            storyTimeline
              .to(trackFrames[i - 1], { opacity: 0.82, duration: moveDuration * 0.8, ease: 'none' }, stepStart)
              .to(trackFrames[i], { opacity: 1, duration: moveDuration * 0.8, ease: 'none' }, stepStart)
              .to(frameInners[i], { xPercent: 4, duration: moveDuration, ease: 'power1.out' }, stepStart)
              .to(captionItems[i - 1], {
                autoAlpha: 0,
                y: -6,
                duration: moveDuration * 0.42,
                ease: 'power1.in',
              }, stepStart)
              .to(captionItems[i], {
                autoAlpha: 1,
                y: 0,
                duration: moveDuration * 0.52,
                ease: 'power2.out',
              }, stepStart + (moveDuration * 0.34))
              .to(galleryField, {
                backgroundColor: miraImages[i].fieldColor,
                duration: moveDuration,
                ease: 'none',
              }, stepStart);
          }

          // 0.84 - 1.00: final room holds. Action button remains ready.
          if (projectAction) {
            storyTimeline.to(projectAction, { autoAlpha: 1, y: 0, duration: 0.04, ease: 'power2.out' }, 0.845);
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
          <div className={styles.galleryViewport} data-mira-gallery-field>
            <div className={styles.chapterPortal} data-mira-chapter-portal>
              <div className={styles.chapterCopy} data-mira-chapter-copy>
                <span>Inside the work</span>
                <p>Mira Villa</p>
                <em>A home made open.</em>
              </div>
            </div>

            <div className={styles.galleryTrack} data-mira-track>
              {miraImages.map((image, index) => (
                <div
                  key={image.src}
                  className={styles.trackFrame}
                  data-track-frame={index}
                  style={{ '--frame-width': `${image.frameWidth}vw` }}
                >
                  <div className={styles.frameInner} data-frame-inner={index}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes={`${image.frameWidth}vw`}
                      className={styles.roomImage}
                      priority={index === 0}
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.videoLayer} data-mira-video-layer aria-hidden="true">
              <video ref={videoRef} muted playsInline preload="auto">
                <source src={videoSource} type="video/mp4" />
              </video>
            </div>

            <div className={styles.captionRail} data-mira-caption-rail aria-hidden="true">
              {miraImages.map((image, index) => (
                <div key={image.caption} className={styles.captionItem} data-mira-caption={index}>
                  <p>{image.caption}</p>
                </div>
              ))}
            </div>

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
          <small>Inside the work</small>
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
              <figcaption>{image.caption}</figcaption>
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
