export default function FooterSection() {
  return (
    <footer id="inquiry" data-header-theme="inquiry-light" tabIndex={-1}>
      <div className="sb-container footer-container">
        <p id="studio" className="footer-note" tabIndex={-1}>Studio Bespoke / Dubai</p>
        <p className="footer-prompt">
          Tell us what no longer works in the way you live at home.
        </p>
        <p className="footer-link footer-link-pending" aria-label="Inquiry destination pending confirmation">
          Discuss your home
        </p>
      </div>
    </footer>
  );
}
