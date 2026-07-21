'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/motion';
import styles from './site-footer.module.css';

const navigation = [
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
  { label: 'Services', href: '#services' },
  { label: 'Inquiry', href: '#inquiry' },
];

export default function SiteFooter() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return undefined;

    const mediaQuery = gsap.matchMedia();

    mediaQuery.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const panel = footer.querySelector('[data-footer-panel]');
        const information = footer.querySelector('[data-footer-information]');
        const image = footer.querySelector('[data-footer-image]');
        const inquiryField = footer.previousElementSibling?.querySelector('[data-inquiry-field]');

        gsap.set(panel, { yPercent: -45 }); // Starts tucked under the previous section
        gsap.set(information, { autoAlpha: 0, y: 32 });
        gsap.set(image, { scale: 1.09, yPercent: 12 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom', // Start exactly when footer enters viewport
            end: 'bottom bottom',
            scrub: true,
          },
        });

        timeline
          .to(panel, {
            yPercent: 0,
            duration: 1,
            ease: 'none',
          }, 0)
          .to(image, {
            scale: 1.035,
            yPercent: 0,
            duration: 1,
            ease: 'none',
          }, 0)
          .to(information, {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
            ease: 'power2.out',
          }, 0.5);

        if (inquiryField) {
          timeline.to(inquiryField, {
            yPercent: -3.5,
            scale: 0.992,
            transformOrigin: 'top center',
            duration: 0.68,
            ease: 'none',
          }, 0);
        }
      }, footer);

      return () => context.revert();
    });

    return () => mediaQuery.revert();
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer} aria-label="Studio Bespoke footer">
      <div className={styles.footerPanel} data-footer-panel>
        <div className={styles.information} data-footer-information>
          <div className={styles.identity}>
            <span>Studio Bespoke</span>
            <strong>Design</strong>
          </div>

          <nav className={styles.footerNavigation} aria-label="Footer navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <address className={styles.contact}>
            <span>Dubai, United Arab Emirates</span>
            <a href="tel:+971569229240">+971 56 922 9240</a>
            <a href="mailto:info@studiobespoke.design">info@studiobespoke.design</a>
          </address>
        </div>

        <figure className={styles.groundingImage}>
          <video
            src="/videos/footer-ambient-v2.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, objectFit: 'cover', objectPosition: 'top' }}
            data-footer-image
          />
          <figcaption>Cinematic Sunlit Wall · Studio Bespoke</figcaption>
        </figure>

        <div className={styles.baseLine}>
          <span>© {new Date().getFullYear()} Studio Bespoke Design</span>
          <span>Interior design · Dubai and worldwide</span>
        </div>
      </div>
    </footer>
  );
}
