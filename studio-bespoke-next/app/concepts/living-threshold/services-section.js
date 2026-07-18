'use client';

import styles from './services-section.module.css';

const services = [
  {
    key: 'turnkey',
    title: 'Full Turnkey Interior Design',
    copy: 'From first idea to final detail, one studio carries the whole.',
    evidence: 'Pre-Concept · Schematic Design · Detail Design · BOQ Coordination · Procurement, Furnishing & Styling · Construction Supervision',
  },
  {
    key: 'worldwide',
    title: 'Worldwide Interior Design',
    copy: 'The same personal design process, carried beyond Dubai.',
    evidence: 'Dubai · Cambridge · South Africa',
  },
];

export default function ServicesSection() {
  return (
    <section
      className={styles.servicesSection}
      aria-labelledby="services-section-title"
      id="services"
    >
      <h2 id="services-section-title" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Our Services</h2>
      
      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <article
            key={service.key}
            className={styles.serviceState}
          >
            <p className={styles.serviceIndex} aria-hidden="true">
              {service.key === 'turnkey' ? '01 / The whole journey' : '02 / Wherever home is'}
            </p>
            <h3>{service.title}</h3>
            <p className={styles.serviceCopy}>{service.copy}</p>
            <div className={styles.evidenceRail}>{service.evidence}</div>
            
            {/* The central seam divider for desktop */}
            {index === 0 && <div className={styles.divider} aria-hidden="true" />}
          </article>
        ))}
      </div>
    </section>
  );
}
