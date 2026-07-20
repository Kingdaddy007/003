'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/motion';
import styles from './inquiry-section.module.css';

const projectTypes = ['Renovation', 'New build', 'Commercial / hospitality', 'Other'];

export default function InquirySection() {
  const sectionRef = useRef(null);
  const [formStatus, setFormStatus] = useState('');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const mediaQuery = gsap.matchMedia();

    mediaQuery.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const headingLines = [...section.querySelectorAll('[data-inquiry-heading-line]')];
        const form = section.querySelector('[data-inquiry-form]');

        gsap.set(headingLines, { yPercent: 108 });
        gsap.set(form, { autoAlpha: 0, y: 24 });

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 92%',
            end: 'top 34%',
            scrub: 0.45,
          },
        })
          .to(headingLines, {
            yPercent: 0,
            duration: 0.52,
            stagger: 0.06,
            ease: 'power3.out',
          }, 0)
          .to(form, {
            autoAlpha: 1,
            y: 0,
            duration: 0.48,
            ease: 'power2.out',
          }, 0.18);
      }, section);

      return () => context.revert();
    });

    return () => mediaQuery.revert();
  }, []);

  const handlePrototypeSubmit = (event) => {
    event.preventDefault();
    setFormStatus('Your details are ready. Secure submission will be connected before launch.');
  };

  return (
    <section ref={sectionRef} className={styles.section} id="inquiry" aria-labelledby="inquiry-title">
      <div className={styles.field} data-inquiry-field>
        <div className={styles.introduction}>
          <span className={styles.eyebrow}>Begin an inquiry</span>
          <h2 id="inquiry-title" className={styles.heading}>
            <span><span data-inquiry-heading-line>Every home</span></span>
            <span><span data-inquiry-heading-line>has a story.</span></span>
          </h2>

          <p className={styles.inquiryPrompt}>Begin with what needs to change.</p>

          <div className={styles.fitNote}>
            <p>
              Studio Bespoke accepts a limited number of projects each year. Early inquiry is
              encouraged; urgent completion timelines may not be the right fit.
            </p>
          </div>

        </div>

        <form className={styles.form} data-inquiry-form onSubmit={handlePrototypeSubmit}>
          <div className={styles.formHeading}>
            <h3>Project brief.</h3>
            <span>Required fields are marked *</span>
          </div>

          <div className={styles.fieldGrid}>
            <label className={styles.formField}>
              <span>Name *</span>
              <input type="text" name="name" autoComplete="name" placeholder="Your full name" required />
            </label>

            <label className={styles.formField}>
              <span>Email *</span>
              <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
            </label>

            <label className={styles.formField}>
              <span>Phone</span>
              <input type="tel" name="phone" autoComplete="tel" placeholder="+971" />
            </label>

            <label className={styles.formField}>
              <span>Project location *</span>
              <input type="text" name="location" autoComplete="address-level2" placeholder="City, country" required />
            </label>
          </div>

          <fieldset className={styles.projectType}>
            <legend>Project type *</legend>
            <div>
              {projectTypes.map((projectType) => (
                <label key={projectType}>
                  <input type="radio" name="projectType" value={projectType} required />
                  <span>{projectType}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={styles.fieldGrid}>
            <label className={styles.formField}>
              <span>Preferred start *</span>
              <input type="month" name="preferredStart" required />
            </label>

            <label className={styles.formField}>
              <span>Project investment *</span>
              <select name="investmentReadiness" defaultValue="" required>
                <option value="" disabled>Select one</option>
                <option value="established">Budget established</option>
                <option value="in-progress">Budget range in progress</option>
                <option value="scope-first">Need scope guidance first</option>
              </select>
            </label>
          </div>

          <label className={`${styles.formField} ${styles.storyField}`}>
            <span>What needs to change? *</span>
            <textarea
              name="projectStory"
              rows="4"
              required
              placeholder="Tell us about the home, the rooms involved, what is not working now, and what you want the project to change."
            />
          </label>

          <div className={styles.formFooter}>
            <button type="submit">Share your project</button>
            <p>Prototype form—no information is transmitted yet.</p>
          </div>

          <p className={styles.formStatus} role="status" aria-live="polite">
            {formStatus}
          </p>
        </form>
      </div>
    </section>
  );
}
