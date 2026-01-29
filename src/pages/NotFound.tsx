import { Link } from "react-router-dom";
import "../css/notfound.css";

export default function NotFound() {
  return (
    <div className="notFound">
      <div className="notFoundInner">
        <p className="pill">404</p>
        <h1>Page not found</h1>
        <p className="nfSub">
          You followed a bad link or typed something creative. Either way, this
          page doesn’t exist.
        </p>

        <div className="nfActions">
          <Link to="/" className="btn btnPrimary">
            Go home
          </Link>
          <Link to="/login" className="btn btnGhost">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
