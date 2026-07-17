import Link from 'next/link';
import styles from './spatial-lens.module.css';

export const metadata = {
  title: 'Spatial Lens Hero Concept | Studio Bespoke Design',
  description: 'A static full-bleed homepage hero concept prepared for Studio Bespoke Design.',
};

const heroImage = 'https://studiobespoke.design/wp-content/uploads/2026/01/Lakes_16-scaled.jpg';

const navigationItems = [
  { label: 'Work', href: '/#work' },
  { label: 'Approach', href: '/#approach' },
  { label: 'Studio', href: '/#studio' },
  { label: 'Press', href: '/#press' },
  { label: 'Enquire', href: '/#inquiry' },
];

function PublishedBrandMark() {
  return (
    <Link className={styles.brand} href="/" aria-label="Studio Bespoke Design homepage">
      {/* This is the mark currently published by Studio Bespoke. */}
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
  );
}

export default function SpatialLensConceptPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="spatial-lens-title">
        <div className={styles.media} aria-hidden="true">
          {/* Public project photography is used only for this local concept preview. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.baseImage} src={heroImage} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.focusImage} src={heroImage} alt="" />
          <div className={styles.lensEdge} />
          <div className={styles.mediaVeil} />
        </div>

        <header className={styles.header}>
          <PublishedBrandMark />

          <nav className={styles.desktopNavigation} aria-label="Concept primary navigation">
            <ul>
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link className={styles.mobileMenu} href="/#work">Menu</Link>
        </header>

        <h1 id="spatial-lens-title" className={styles.srOnly}>Studio Bespoke Design</h1>

        <Link className={styles.workLink} href="/#work">
          <span className={styles.workLinkIndex}>01</span>
          <span>Enter the portfolio</span>
        </Link>

        <p className={styles.previewLabel}>Concept 02 · Spatial Lens</p>
      </section>
    </main>
  );
}
