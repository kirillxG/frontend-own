import "./css/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerInner">
        <div className="footerLeft">
          <span className="footerBrand">Nocturne</span>
          <span className="footerCopy">© {new Date().getFullYear()}</span>
        </div>

        <nav className="footerNav">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
