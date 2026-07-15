function BlueprintField() {
  return (
    <svg
      className="tension-blueprint-field"
      viewBox="0 0 1200 900"
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <path d="M84 756V118H438V756" />
      <path d="M438 184H862V756" />
      <path d="M862 118H1116V756" />
      <path d="M84 330H438M84 548H438M438 430H862M438 642H862" />
      <path d="M552 642V356C552 267 624 195 713 195C802 195 874 267 874 356V642" />
      <path d="M592 642V362C592 295 646 241 713 241C780 241 834 295 834 362V642" />
      <path d="M84 756H1116" />
      <circle cx="510" cy="270" r="25" />
      <circle cx="510" cy="340" r="25" />
      <path d="M918 218H1064V642H918Z" />
      <path d="M918 330H1064M918 450H1064M990 218V642" />
    </svg>
  );
}

export default function TensionSection() {
  return (
    <section id="tension" aria-labelledby="tension-title">
      <BlueprintField />
      <div className="sb-container tension-container">
        <div className="tension-copy">
          <span className="eyebrow tension-eyebrow">The Inherited Plan</span>
          <h2 id="tension-title" className="section-title tension-title">
            Closed rooms.<br />Borrowed habits.
          </h2>
          <p className="tension-body">
            Before the intervention, the Mira ground floor worked as separate rooms. The enclosed
            kitchen interrupted light, movement, and the family&apos;s everyday gathering. The
            question was not how to decorate it, but what the plan needed to release.
          </p>
        </div>
        <p className="tension-note">01 / Constraint before intervention</p>
      </div>
    </section>
  );
}
