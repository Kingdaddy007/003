'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SiteHeader({ isVisible }) {
  const [theme, setTheme] = useState('opening');

  useEffect(() => {
    if (!isVisible) return undefined;

    const triggers = [
      ScrollTrigger.create({
        trigger: '#tension',
        start: 'top 12%',
        end: 'bottom 12%',
        onEnter: () => setTheme('tension'),
        onEnterBack: () => setTheme('tension'),
        onLeaveBack: () => setTheme('opening'),
      }),
      ScrollTrigger.create({
        trigger: '#proof',
        start: 'top 12%',
        end: 'bottom 12%',
        onEnter: () => setTheme('proof'),
        onEnterBack: () => setTheme('proof'),
        onLeave: () => setTheme('opening'),
        onLeaveBack: () => setTheme('tension'),
      }),
    ];

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [isVisible]);

  return (
    <header className={`site-header-shell theme-${theme} ${isVisible ? 'is-visible' : ''}`}>
      <div className="sb-container site-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://studiobespoke.design/wp-content/uploads/2021/02/Studio-Bspoke_Icon-03.png"
          alt="Studio Bespoke Design"
          className="nav-logo"
        />
        <nav aria-label="Primary navigation">
          <ul className="nav-menu">
            <li><a href="#work" className="nav-link">Work</a></li>
            <li><a href="#approach" className="nav-link">Approach</a></li>
            <li><a href="#studio" className="nav-link">Studio</a></li>
            <li><a href="#journal" className="nav-link">Journal</a></li>
            <li><a href="#footer" className="nav-link">Enquire</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
