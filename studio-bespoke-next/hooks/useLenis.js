'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/motion';

export default function useLenis() {
  useEffect(() => {
    const desktopMotionQuery = window.matchMedia(
      '(min-width: 901px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    let lenis;
    let ticker;
    let initialHashFrame;
    let settledHashFrame;

    const getHashTarget = () => {
      if (!window.location.hash) return null;

      try {
        return document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      } catch {
        return null;
      }
    };

    const focusHashTarget = () => {
      getHashTarget()?.focus({ preventScroll: true });
    };

    const restoreInitialHash = () => {
      const target = getHashTarget();
      if (!target) return;

      target.scrollIntoView({ block: 'start' });
      target.focus({ preventScroll: true });
    };

    const stopLenis = () => {
      if (!lenis) return;
      if (ticker) gsap.ticker.remove(ticker);
      lenis.destroy();
      lenis = undefined;
      ticker = undefined;
    };

    const startLenis = () => {
      if (!desktopMotionQuery.matches || lenis) return;

      lenis = new Lenis({
        duration: 1.05,
        easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        smoothWheel: true,
        anchors: true,
      });
      lenis.on('scroll', ScrollTrigger.update);
      ticker = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();

      initialHashFrame = window.requestAnimationFrame(() => {
        settledHashFrame = window.requestAnimationFrame(restoreInitialHash);
      });
    };

    const handlePreferenceChange = () => {
      stopLenis();
      startLenis();
    };

    startLenis();
    desktopMotionQuery.addEventListener('change', handlePreferenceChange);
    window.addEventListener('hashchange', focusHashTarget);

    return () => {
      window.cancelAnimationFrame(initialHashFrame);
      window.cancelAnimationFrame(settledHashFrame);
      desktopMotionQuery.removeEventListener('change', handlePreferenceChange);
      window.removeEventListener('hashchange', focusHashTarget);
      stopLenis();
    };
  }, []);
}
