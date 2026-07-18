import Link from 'next/link';
import ThresholdEntrance from './threshold-entrance';
import ThresholdScrollMedia from './threshold-scroll-media';
import ThresholdSmoothScroll from './threshold-smooth-scroll';
import FounderSection from './founder-section';
import ServicesIntroduction from './services-introduction';
import ServicesSection from './services-section';
import SelectedWorkIntroduction from './selected-work-introduction';
import SelectedWorkSection from './selected-work-section';
import FeaturedMiraSection from './featured-mira-section';
import styles from './living-threshold.module.css';

export const metadata = {
  title: 'The Living Threshold | Studio Bespoke Design',
  description: 'A scroll-led, full-screen hero storyboard for Studio Bespoke Design.',
};

const heroImage = '/images/damac-hills-hero-upscaled-v1.png';
const mobileHeroImage = heroImage;
const heroVideo = '/images/damac-hills-hero-motion-v1.mp4';

const navigationItems = [
  { label: 'Work', href: '/#work' },
  { label: 'Approach', href: '/#approach' },
  { label: 'Studio', href: '/#studio' },
  { label: 'Press', href: '/#press' },
  { label: 'Enquire', href: '/#inquiry' },
];

function BrandMark() {
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

function HeroPicture({ className }) {
  return (
    <picture className={className}>
      <source media="(max-width: 900px)" srcSet={mobileHeroImage} />
      <img src={heroImage} alt="" fetchPriority="high" />
    </picture>
  );
}

export default function LivingThresholdConceptPage() {
  return (
    <main className={styles.page}>
      <ThresholdSmoothScroll />
      <section
        className={styles.story}
        aria-labelledby="living-threshold-title"
        data-threshold-story
      >
        <div className={styles.stickyStage} data-threshold-stage>
          <div className={styles.media} aria-hidden="true">
            <HeroPicture className={styles.heroPicture} />
            <ThresholdScrollMedia poster={heroImage} src={heroVideo} />
            <div className={styles.mediaVeil} />
          </div>

          <ThresholdEntrance heroImage={heroImage} mobileHeroImage={mobileHeroImage} />

          <header className={styles.header} data-threshold-header>
            <BrandMark />
            <nav className={styles.navigation} aria-label="Concept primary navigation">
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

          <h1 id="living-threshold-title" className={styles.srOnly}>
            Studio Bespoke Design
          </h1>

          <article className={styles.messageBeat} data-threshold-message="primary">
            <h2 className={styles.messageTitle}>
              <span className={styles.titleLine}>
                <span className={styles.titleLead} data-threshold-line>Made</span>
              </span>
              <span className={`${styles.titleLine} ${styles.titleAccentLine}`}>
                <span className={styles.titleAccent} data-threshold-line>personal.</span>
              </span>
            </h2>
            <p className={styles.messageSupport} data-threshold-support>
              Spaces shaped around the way you live.
            </p>
          </article>

          <article
            className={`${styles.messageBeat} ${styles.secondaryMessageBeat}`}
            data-threshold-message="secondary"
          >
            <h2 className={`${styles.messageTitle} ${styles.secondaryMessageTitle}`}>
              <span className={styles.titleLine}>
                <span className={styles.secondaryTitleLead} data-threshold-secondary-line>
                  Designed
                </span>
              </span>
              <span className={`${styles.titleLine} ${styles.secondaryAccentLine}`}>
                <span className={styles.secondaryTitleAccent} data-threshold-secondary-line>
                  as a whole.
                </span>
              </span>
            </h2>
            <p
              className={`${styles.messageSupport} ${styles.secondaryMessageSupport}`}
              data-threshold-secondary-support
            >
              Every room, material and detail considered together.
            </p>
          </article>

          <article
            className={`${styles.messageBeat} ${styles.tertiaryMessageBeat}`}
            data-threshold-message="tertiary"
          >
            <h2 className={`${styles.messageTitle} ${styles.tertiaryMessageTitle}`}>
              <span className={styles.titleLine}>
                <span className={styles.tertiaryTitleLead} data-threshold-tertiary-line>
                  Realised
                </span>
              </span>
              <span className={`${styles.titleLine} ${styles.tertiaryAccentLine}`}>
                <span className={styles.tertiaryTitleAccent} data-threshold-tertiary-line>
                  in full.
                </span>
              </span>
            </h2>
            <p
              className={`${styles.messageSupport} ${styles.tertiaryMessageSupport}`}
              data-threshold-tertiary-support
            >
              Full interior design, from concept to completion.
            </p>
          </article>

          <div className={styles.openingCue} aria-hidden="true" data-threshold-cue>
            <small>Scroll to explore</small>
          </div>
        </div>
      </section>
      <FounderSection />
      <ServicesIntroduction />
      <ServicesSection />
      <SelectedWorkIntroduction />
      <SelectedWorkSection />
      <FeaturedMiraSection />
    </main>
  );
}
