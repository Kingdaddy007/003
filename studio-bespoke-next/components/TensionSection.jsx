export default function TensionSection() {
  return (
    <section id="tension">
      <div className="sb-container">
        <div className="tension-grid">
          {/* Left: editorial copy */}
          <div>
            <span className="eyebrow" style={{ color: 'var(--color-anchor)' }}>
              The Inherited Plan
            </span>
            <h2 className="section-title" style={{ color: 'var(--color-neutral)' }}>
              Closed rooms. Borrowed habits.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--color-support)' }}>
              Before the intervention, the ground floor of this Mira villa resisted the way this
              family actually lived. The kitchen was entirely isolated, casting shadows across the
              dining area and separating the cook from the family&apos;s daily movements.
            </p>
          </div>

          {/* Right: restrained architectural crop */}
          <div className="tension-image-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://studiobespoke.design/wp-content/uploads/2026/01/Al-barari-2-500x500.jpg"
              alt="Prior closed layout space — Mira villa ground floor"
              className="tension-img"
            />
            <div className="image-overlay" />
          </div>
        </div>
      </div>
    </section>
  );
}
