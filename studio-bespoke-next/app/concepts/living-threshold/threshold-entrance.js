'use client';

import gsap from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './living-threshold.module.css';

const ENTRANCE_TIMEOUT_MS = 4000;

export default function ThresholdEntrance({ heroImage, mobileHeroImage }) {
  const [entranceState, setEntranceState] = useState('loading');
  const entranceRef = useRef(null);
  const identityRef = useRef(null);
  const imageRef = useRef(null);
  const roomRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;

    if (!image) {
      setEntranceState('failed');
      return undefined;
    }

    let cancelled = false;

    const finishImageReadiness = () => {
      if (!cancelled) {
        setEntranceState(image.naturalWidth > 0 ? 'ready' : 'failed');
      }
    };

    const handleImageError = () => {
      if (!cancelled) {
        setEntranceState('failed');
      }
    };

    if (image.complete) {
      finishImageReadiness();
    } else {
      image.addEventListener('load', finishImageReadiness, { once: true });
      image.addEventListener('error', handleImageError, { once: true });
    }

    return () => {
      cancelled = true;
      image.removeEventListener('load', finishImageReadiness);
      image.removeEventListener('error', handleImageError);
    };
  }, []);

  useEffect(() => {
    if (entranceState !== 'loading') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setEntranceState('failed');
    }, ENTRANCE_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [entranceState]);

  useLayoutEffect(() => {
    if (entranceState === 'loading' || !entranceRef.current) {
      return undefined;
    }

    const stage = entranceRef.current.closest('[data-threshold-stage]');
    const page = stage?.closest('main');
    const header = page?.querySelector('[data-threshold-header]');
    const message = stage?.querySelector('[data-threshold-message]');
    const titleLines = stage?.querySelectorAll('[data-threshold-line]');
    const support = stage?.querySelector('[data-threshold-support]');
    const cue = stage?.querySelector('[data-threshold-cue]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!stage || !header || !message || !titleLines || !support || !cue) {
      return undefined;
    }

    const context = gsap.context(() => {
      if (reducedMotion || entranceState === 'failed') {
        gsap.set(entranceRef.current, { autoAlpha: 0, pointerEvents: 'none' });
        gsap.set([header, message, support, cue], { autoAlpha: 1, clearProps: 'transform' });
        gsap.set(titleLines, { yPercent: 0, clearProps: 'transform' });
        return;
      }

      gsap.set(header, { autoAlpha: 0, y: -12 });
      gsap.set(message, { autoAlpha: 1 });
      gsap.set(titleLines, { yPercent: 112, rotate: 1.5 });
      gsap.set(support, { autoAlpha: 0, y: 18 });
      gsap.set(cue, { autoAlpha: 0, y: 10 });
      gsap.set(roomRef.current, { clipPath: 'circle(0 at 50% 52%)' });

      const entranceTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          gsap.set(entranceRef.current, { pointerEvents: 'none' });
        },
      });

      entranceTimeline
        .to(identityRef.current, {
          autoAlpha: 0,
          scale: 0.92,
          duration: 0.55,
          ease: 'power2.inOut',
        }, 0.2)
        .to(roomRef.current, {
          clipPath: 'circle(8vmin at 50% 52%)',
          duration: 0.6,
          ease: 'power2.out',
        }, 0.42)
        .to(roomRef.current, {
          clipPath: 'circle(150vmax at 50% 52%)',
          duration: 1.25,
          ease: 'power3.inOut',
        }, 0.82)
        .to(entranceRef.current, {
          autoAlpha: 0,
          duration: 0.24,
          ease: 'none',
        }, 1.98)
        .to(header, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
        }, 1.78)
        .to(titleLines, {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          stagger: 0.13,
        }, 1.94)
        .to(support, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
        }, 2.34)
        .to(cue, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
        }, 2.48);
    }, stage);

    return () => context.revert();
  }, [entranceState]);

  return (
    <div ref={entranceRef} className={styles.entrance} aria-hidden="true">
      <picture ref={roomRef} className={styles.entranceRoom}>
        <source media="(max-width: 900px)" srcSet={mobileHeroImage} />
        <img
          ref={imageRef}
          src={heroImage}
          alt=""
        />
      </picture>

      <div ref={identityRef} className={styles.entranceIdentity}>
        <span className={styles.entranceMarkFrame}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://studiobespoke.design/wp-content/uploads/2021/02/Studio-Bspoke_Icon-03.png"
            alt=""
          />
        </span>
        <span className={styles.entranceWordmark}>
          <strong>Studio Bespoke</strong>
          <small>Design</small>
        </span>
      </div>
    </div>
  );
}
