export default function SiteHeader({ isVisible }) {
  return (
    <header className={`site-header-shell ${isVisible ? 'is-visible' : ''}`}>
      <div className="sb-container site-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://studiobespoke.design/wp-content/uploads/2021/02/Studio-Bspoke_Icon-03.png"
          alt="Studio Bespoke Design"
          className="nav-logo"
        />
        <nav aria-label="Primary navigation">
          <ul className="nav-menu">
            <li><a href="#work" className="nav-link">Work</a></li>
            <li><a href="#approach" className="nav-link">Approach</a></li>
            <li><a href="#studio" className="nav-link">Studio</a></li>
            <li><a href="#journal" className="nav-link">Journal</a></li>
            <li><a href="#footer" className="nav-link">Enquire</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
