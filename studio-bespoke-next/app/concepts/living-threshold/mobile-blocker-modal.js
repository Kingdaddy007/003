'use client';

import { useEffect, useState } from 'react';
import styles from './mobile-blocker-modal.module.css';

export default function MobileBlockerModal() {
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.card}>
        <div className={styles.logo}>Studio Bespoke Design</div>
        <span className={styles.eyebrow}>Desktop Showroom Experience</span>
        <h2>The Living Threshold</h2>
        <p>
          This spatial digital showcase is engineered exclusively for high-resolution desktop displays and fine pointer interaction.
        </p>
        <p className={styles.subtext}>
          Please open this link on your laptop or desktop browser to explore the full interactive experience.
        </p>
        <button type="button" className={styles.copyBtn} onClick={handleCopyLink}>
          {copied ? 'Link Copied to Clipboard' : 'Copy Desktop Link'}
        </button>
      </div>
    </div>
  );
}
