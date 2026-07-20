'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './living-threshold.module.css';

const leftNavigationItems = [
  { label: 'Work', href: '#work' },
  { label: 'Studio', href: '#studio' },
];

const rightNavigationItems = [
  { label: 'Services', href: '#services' },
  { label: 'Enquire', href: '#inquiry' },
];

export default function ThresholdHeader() {
  const [hasLeftHero, setHasLeftHero] = useState(false);

  useEffect(() => {
    let updateFrame;

    const updateHeaderState = () => {
      window.cancelAnimationFrame(updateFrame);
      updateFrame = window.requestAnimationFrame(() => {
        const heroStory = document.querySelector('[data-threshold-story]');
        const heroReleasePoint = heroStory
          ? heroStory.offsetTop + heroStory.offsetHeight - (window.innerHeight * 0.42)
          : window.innerHeight;

        setHasLeftHero(window.scrollY >= heroReleasePoint);
      });
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState);

    return () => {
      window.cancelAnimationFrame(updateFrame);
      window.removeEventListener('scroll', updateHeaderState);
      window.removeEventListener('resize', updateHeaderState);
    };
  }, []);

  return (
    <header
      className={`${styles.header} ${hasLeftHero ? styles.headerScrolled : ''}`}
      data-threshold-header
    >
      <div className={styles.headerInner}>
        <nav
          className={`${styles.navigation} ${styles.navigationLeft}`}
          aria-label="Work and studio navigation"
        >
          <ul>
            {leftNavigationItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link className={styles.brand} href="/" aria-label="Studio Bespoke Design homepage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://studiobespoke.design/wp-content/uploads/2021/02/Studio-Bspoke_Icon-03.png"
            alt=""
          />
          <span>
            <strong>Studio Bespoke</strong>
            <small>Design</small>
          </span>
        </Link>

        <nav
          className={`${styles.navigation} ${styles.navigationRight}`}
          aria-label="Services and inquiry navigation"
        >
          <ul>
            {rightNavigationItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link className={styles.mobileMenu} href="#work">Menu</Link>
      </div>
    </header>
  );
}
