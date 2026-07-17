'use client';

import { useEffect, useRef, useState } from 'react';
import { navigationItems } from '@/content/homepage';

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('plan-light');
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const themedSections = Array.from(document.querySelectorAll('[data-header-theme]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const activeSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (activeSection) {
          setTheme(activeSection.target.dataset.headerTheme || 'plan-light');
        }
      },
      { rootMargin: '-10% 0px -78% 0px', threshold: [0, 0.2, 0.6] },
    );

    themedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavigation = (href) => {
    setIsMenuOpen(false);
    window.setTimeout(() => {
      document.querySelector(href)?.focus({ preventScroll: true });
    }, 0);
  };

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = Array.from(
        headerRef.current?.querySelectorAll('a[href], button:not([disabled])') ?? [],
      ).filter((element) => element.getClientRects().length > 0);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 901px)');
    const closeDesktopMenu = () => {
      if (desktopQuery.matches) setIsMenuOpen(false);
    };

    desktopQuery.addEventListener('change', closeDesktopMenu);
    return () => desktopQuery.removeEventListener('change', closeDesktopMenu);
  }, []);

  return (
    <header
      className="site-header-shell is-visible"
      data-theme={theme}
      data-menu-open={isMenuOpen ? 'true' : 'false'}
      ref={headerRef}
    >
      <div className="sb-container site-header">
        <a className="text-wordmark" href="#opening" aria-label="Studio Bespoke Design, return to opening">
          <span>Studio Bespoke</span>
          <small>Design</small>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          ref={menuButtonRef}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>

        <nav
          id="primary-navigation"
          className="primary-navigation"
          data-open={isMenuOpen ? 'true' : 'false'}
          aria-label="Primary navigation"
        >
          <ul className="nav-menu">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a className="nav-link" href={item.href} onClick={() => handleNavigation(item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <noscript>
          <nav className="noscript-navigation" aria-label="Primary navigation fallback">
            <ul>
              {navigationItems.map((item) => (
                <li key={item.href}><a href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </nav>
        </noscript>
      </div>
    </header>
  );
}
