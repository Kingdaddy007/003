import Link from 'next/link';
import styles from './living-portfolio.module.css';

export const metadata = {
  title: 'Living Portfolio Hero Concept | Studio Bespoke Design',
  description: 'A static homepage hero concept prepared for Studio Bespoke Design.',
};

const navigationItems = [
  { label: 'Work', href: '/#work' },
  { label: 'Approach', href: '/#approach' },
  { label: 'Studio', href: '/#studio' },
  { label: 'Press', href: '/#press' },
  { label: 'Enquire', href: '/#inquiry' },
];

export default function LivingPortfolioConceptPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="living-portfolio-title">
        <div className={styles.media}>
          {/* This public Studio Bespoke image is used only for a local concept preview. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.roomImage}
            src="https://studiobespoke.design/wp-content/uploads/2026/01/SBD_Mira_K14-scaled.jpg"
            alt="A warm Studio Bespoke kitchen interior framed by arched openings"
          />
          <div className={styles.imageWash} aria-hidden="true" />
        </div>

        <header className={styles.header}>
          <Link className={styles.brand} href="/" aria-label="Studio Bespoke Design homepage">
            {/* This is the mark currently published by Studio Bespoke. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://studiobespoke.design/wp-content/uploads/2021/02/Studio-Bspoke_Icon-03.png"
              alt=""
            />
            <span className={styles.brandName}>
              <strong>Studio Bespoke</strong>
              <small>Design</small>
            </span>
          </Link>

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

        <div className={styles.heroCopy}>
          <p className={styles.location}>Dubai · Interior Design</p>
          <h1 id="living-portfolio-title" className={styles.title}>
            <span>Interior</span>
            <span className={styles.titleSecondLine}>Design</span>
          </h1>
          <p className={styles.promise}>Not just a pretty space.</p>
        </div>

        <div className={styles.projectNote} aria-label="Displayed project">
          <span>Featured residence</span>
          <strong>Mira</strong>
        </div>

        <Link className={styles.workLink} href="/#work">
          <span>View selected work</span>
          <span className={styles.workLinkLine} aria-hidden="true" />
        </Link>

        <p className={styles.previewLabel}>Concept 01 · Static study</p>
      </section>
    </main>
  );
}
