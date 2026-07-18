'use client';

import styles from './selected-work-introduction.module.css';

export default function SelectedWorkIntroduction() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Selected Work</p>
        <h2 className={styles.heading}>Different lives. Different answers.</h2>
      </div>
    </section>
  );
}
