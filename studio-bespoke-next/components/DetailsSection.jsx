export default function DetailsSection() {
  return (
    <section id="details" data-header-theme="mineral-light">
      <span id="approach" className="section-anchor" tabIndex={-1} aria-label="Approach" />
      <div className="sb-container">
        <span className="eyebrow">Rituals Made Spatial</span>
        <h2 className="section-title">Ease is designed, not improvised.</h2>

        <div className="details-grid">
          {/* 01 — Storage Seams */}
          <div className="detail-card">
            <div className="detail-img-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://studiobespoke.design/wp-content/uploads/2026/01/Studio-bespoke_mira_32-scaled.jpg"
                alt="Concealed joinery and integrated storage panels"
                className="detail-img"
              />
            </div>
            <div className="detail-blueprint-label">
              <span className="detail-label-coord">01 / Storage Seams</span>
              <p className="detail-label-desc">
                Appliances and daily clutter absorbed into flush wood panels.
              </p>
            </div>
          </div>

          {/* 02 — Plaster Arches */}
          <div className="detail-card">
            <div className="detail-img-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://studiobespoke.design/wp-content/uploads/2026/01/Lakes_16-scaled.jpg"
                alt="Arched threshold geometries framing circulation"
                className="detail-img"
              />
            </div>
            <div className="detail-blueprint-label">
              <span className="detail-label-coord">02 / Plaster Arches</span>
              <p className="detail-label-desc">
                Arched geometries frame circulation paths and diffuse daylight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
