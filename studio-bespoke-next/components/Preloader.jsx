'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion';

export default function Preloader({ onNavVisibilityChange }) {
  const preloaderRef = useRef(null);
  const svgRef = useRef(null);
  const videoRef = useRef(null);
  const sunbeamRef = useRef(null);
  const mantraSubRef = useRef(null);
  const enterBtnRef = useRef(null);
  const storyShadeRef = useRef(null);
  const arrivalTimelineRef = useRef(null);
  const handoffTimelineRef = useRef(null);
  const onNavVisibilityChangeRef = useRef(onNavVisibilityChange);

  useEffect(() => {
    onNavVisibilityChangeRef.current = onNavVisibilityChange;
  }, [onNavVisibilityChange]);

  useEffect(() => {
    const svgElement = svgRef.current;
    const videoElement = videoRef.current;

    // Prefers-reduced-motion gate
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(svgElement, {
        display: 'block',
        opacity: 0.35,
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      });
      gsap.set('.preloader-mantra .word', { opacity: 1, y: 0, filter: 'blur(0px)' });
      gsap.set(mantraSubRef.current, { opacity: 0.95, y: 0 });
      gsap.set(enterBtnRef.current, { opacity: 1 });
      document.body.classList.remove('scroll-locked');
      onNavVisibilityChangeRef.current?.(true);

      return () => {
        document.body.classList.remove('scroll-locked');
      };
    }

    // Lock scroll
    document.body.classList.add('scroll-locked');

    let useVideo = false;
    let arrivalInitialized = false;
    let videoFallbackTimeout;
    let cancelled = false;

    function initScrollHandoff() {
      if (!window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)').matches) {
        ScrollTrigger.refresh();
        return;
      }

      const copyStage = preloaderRef.current?.querySelector('.preloader-copy-stage');
      const storyShade = storyShadeRef.current;
      const enterButton = enterBtnRef.current;
      if (!copyStage || !storyShade || !enterButton) return;

      const handoffTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });

      handoffTimeline
        .to([copyStage, enterButton], {
          autoAlpha: 0,
          y: -88,
          duration: 0.34,
          ease: 'none',
        }, 0)
        .to(storyShade, {
          opacity: 0.94,
          duration: 0.55,
          ease: 'none',
        }, 0.25)
        .to([videoElement, svgElement], {
          opacity: 0.09,
          duration: 0.45,
          ease: 'none',
        }, 0.35);

      handoffTimelineRef.current = handoffTimeline;
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    }

    function initArrivalTimeline(targetElement, isVideo) {
      if (arrivalInitialized) return;
      arrivalInitialized = true;

      const arrivalTl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove('scroll-locked');
          onNavVisibilityChangeRef.current?.(true);
          initScrollHandoff();
        },
      });
      arrivalTimelineRef.current = arrivalTl;

      if (isVideo) {
        arrivalTl.to(targetElement, { opacity: 0.35, duration: 1.2, ease: 'power2.out' }, 0.2);
      } else {
        // Left-to-right clip-path sweep of the SVG blueprint
        arrivalTl.fromTo(
          targetElement,
          { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', opacity: 0 },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 0.35,
            duration: 3.5,
            ease: 'power2.inOut',
          },
          0.2
        );
      }

      // Sunbeam sweep
      arrivalTl.fromTo(
        sunbeamRef.current,
        { opacity: 0, x: -300 },
        { opacity: 1, x: window.innerWidth + 300, duration: 3.5, ease: 'power2.inOut' },
        0.4
      );

      // Staggered word reveal
      arrivalTl.to(
        '.preloader-mantra .word',
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.8, stagger: 0.24, ease: 'power2.out' },
        3.2
      );

      arrivalTl.to(
        mantraSubRef.current,
        { opacity: 0.95, y: 0, duration: 1.2, ease: 'power2.out' },
        4.2
      );

      arrivalTl.to(enterBtnRef.current, { opacity: 1, duration: 1.2 }, 4.5);

    }

    // Video fallback chain
    const handleVideoError = () => {
      if (!arrivalInitialized) initArrivalTimeline(svgElement, false);
    };

    const handleVideoCanPlay = async () => {
      if (cancelled || useVideo || arrivalInitialized) return;

      try {
        await videoElement.play();
      } catch {
        if (!cancelled) initArrivalTimeline(svgElement, false);
        return;
      }

      if (cancelled || arrivalInitialized) return;
      useVideo = true;
      videoElement.style.display = 'block';
      if (svgElement) svgElement.style.display = 'none';
      initArrivalTimeline(videoElement, true);
    };

    if (videoElement) {
      videoElement.addEventListener('error', handleVideoError);
      videoElement.addEventListener('canplay', handleVideoCanPlay, { once: true });
      videoElement.src = '/blueprint_draft.mp4';
      videoElement.load();

      videoFallbackTimeout = window.setTimeout(() => {
        if (!useVideo && !arrivalInitialized) initArrivalTimeline(svgElement, false);
      }, 2500);
    } else {
      initArrivalTimeline(svgElement, false);
    }

    // Enter button
    const enterBtn = enterBtnRef.current;
    const handleEnterClick = () => {
      window.scrollTo({ top: Math.max(window.innerHeight * 0.08, 1), behavior: 'smooth' });
    };
    if (enterBtn) enterBtn.addEventListener('click', handleEnterClick);

    return () => {
      cancelled = true;
      window.clearTimeout(videoFallbackTimeout);
      if (enterBtn) enterBtn.removeEventListener('click', handleEnterClick);
      if (videoElement) {
        videoElement.removeEventListener('error', handleVideoError);
        videoElement.removeEventListener('canplay', handleVideoCanPlay);
        videoElement.pause();
        videoElement.removeAttribute('src');
        videoElement.load();
      }

      arrivalTimelineRef.current?.revert();
      arrivalTimelineRef.current = null;
      handoffTimelineRef.current?.revert();
      handoffTimelineRef.current = null;
      document.body.classList.remove('scroll-locked');
    };
  }, []);

  return (
    <div id="preloader" ref={preloaderRef}>
      <div className="preloader-bg" />
      <div className="sunbeam-sweep" ref={sunbeamRef} />

      {/* Center theatrical container */}
      <div className="preloader-center-content">
        {/* Video (hidden unless loaded) */}
        <video id="blueprint-video" ref={videoRef} className="blueprint-video" autoPlay muted playsInline preload="auto" />

        {/* SVG Blueprint — razor-sharp vector floor plan */}
        <svg
          id="blueprint-svg"
          ref={svgRef}
          className="blueprint-img"
          viewBox="0 0 2561 1709"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Primary floor plan outline — the Mira villa architectural drawing */}
          <path
            fill="#948E85"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2094.38 4.29C2092.52 6.61 2089.31 10.26 2087.25 12.42C2083.5 16.98 2081.14 20.14 2078.25 23.2C2071.5 30.62 2067.82 35.14 2063.84 39.79C2056.93 47.59 2051.07 54.25 2044.66 62C2039 68.5 2034.97 73.06 2032.5 76.08C2027.08 82.47 2022.91 86.9 2018.93 92.1C2006.36 106.19 2000.86 112.71 1995.5 119.1C1991.42 123.69 1987.58 128.52 1982.25 134.29C1975.75 142 1971.42 146.72 1969.5 149.11C1964.31 155.19 1960.19 159.43 1958.5 161.7C1952.94 167.96 1948.5 173.09 1944.75 178.06C1939.88 183.36 1934 190.53 1928.5 197.09C1923.55 202.99 1918.5 208.53 1914.75 213.11C1910.21 217.8 1903.5 226.09 1898.5 231.64C1892 239.43 1882.01 250.53 1877.5 256.12C1871.36 263.19 1868.12 266.79 1863.47 275.09C1858 281.67 1853.5 286.78 1847.5 291.12C1842.54 297.15 1837.87 302.09 1837.13 302.09C1836.78 302.09 1836.5 296.91 1836.5 290.59V279.09L771 279.59L1835.5 280.09V837.89C1835.5 1280.79 1835.24 1395.94 1834.26 1396.93L1835 1429.59H1804.5H1774L1773.72 1416.67C1773.51 1407.01 1774.72 1402.92C1774.5 1401.01C1773.37 1400.2 1774.25 1399.43C1774.5 1396.09C1773.16 984.84 1772.92 709.88 1771.78 567.59C1769.89 556.52 1767.43 547.85C1760.14 524.8C1758.5 519.05C1756.5 515.57C1752.85 506.59C1750.55 502.09C1746.5 494.64C1741.26 485.72C1737.43 480.09C1733.07 473.59C1727.27 466.34C1723.75 461.04 1705.03 442.09C1700.57 438.34 1695.72 433.71 1692.99 432.09C1688.99 428.6 1684.5 425.66C1680.5 423.16C1665.32 413.77C1645.02 404.09C1634.5 401.09C1619.5 395.39C1596.5 391.16C1578.5 386.87C1578.5 388.75 1588.12 389.68 1596.5 391.16C1619.5 395.39C1627.5 398.59C1634.5 401.09C1646.33 406.34 1666.5 416.09C1692.21 433.55 1696.99 437.09C1727.51 469.09C1736.5 482.04C1743.32 492.76C1750.07 505.33C1757.56 521.32 1763.6 540.09C1770.64 571.59C1772.19 1001.06 1772.42 1234.53 1772.02 1427.88C1757.48 1429.97C1788.63 1431.09 1836.05 1432.04C1836.67 1418.9 1838.18 1396.91C1836.5 850.59C1836.75 305.69 1837.75 304.67C1858 281.67C1868.41 269.16 1882.5 253.09C1895.5 238.08C1914.47 216.08C1932.52 195.09C1951.04 173.59C1974.5 146.13C1988.5 130.09C2007 108.59C2030.01 81.59C2050.39 58.14C2063.75 42.83C2086.5 16.03C2097.91 3.11 2094.38 4.29Z M307.5 423.09C307.5 553.98 309 571.09C310.33 571.09 310.5 553.98 310.5 423.09C310.5 292.2 309 275.09C307.67 275.09 307.5 292.2 307.5 423.09Z"
          />
          {/* Structural wall lines */}
          <line x1="307" y1="275" x2="307" y2="571" stroke="#948E85" strokeWidth="2" opacity="0.5" />
          <line x1="310" y1="275" x2="310" y2="571" stroke="#948E85" strokeWidth="2" opacity="0.5" />
          <line x1="749" y1="279" x2="749" y2="1126" stroke="#948E85" strokeWidth="2" opacity="0.5" />
          <line x1="1835" y1="279" x2="1835" y2="1431" stroke="#948E85" strokeWidth="2" opacity="0.5" />
          <line x1="771" y1="279" x2="1836" y2="279" stroke="#948E85" strokeWidth="2" opacity="0.5" />
          <line x1="749" y1="1124" x2="1224" y2="1124" stroke="#948E85" strokeWidth="2" opacity="0.5" />
          <line x1="727" y1="1124" x2="727" y2="1431" stroke="#948E85" strokeWidth="2" opacity="0.5" />
          <line x1="1774" y1="1431" x2="1836" y2="1431" stroke="#948E85" strokeWidth="2" opacity="0.5" />
        </svg>

        {/* Mantra text */}
        <div className="preloader-copy-stage">
          <div className="sb-container">
            <div className="mantra-text-wrapper">
              <p className="preloader-mantra">
                <span className="word">A </span>
                <span className="word">home </span>
                <span className="word">becomes </span>
                <span className="word">personal </span>
                <span className="word">when </span>
                <span className="word">its </span>
                <span className="word">plan </span>
                <span className="word">begins </span>
                <span className="word">to </span>
                <span className="word">recognize </span>
                <span className="word">the </span>
                <span className="word">life </span>
                <span className="word">inside </span>
                <span className="word">it.</span>
              </p>
              <p className="mantra-subtext" ref={mantraSubRef}>
                Studio Bespoke Design — Dubai
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="preloader-story-shade" ref={storyShadeRef} />

      {/* Scroll cue */}
      <button id="enter-button" className="scroll-cue" ref={enterBtnRef} type="button" aria-label="Begin exploring the Studio Bespoke story">
        <div className="scroll-cue-line" />
        <span>Enter</span>
      </button>
    </div>
  );
}
