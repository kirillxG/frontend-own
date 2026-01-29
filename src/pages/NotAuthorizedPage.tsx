import { Link, useLocation } from "react-router-dom";
import "../css/auth.css";
import "../css/notauthorized.css";

export default function NotAuthorizedPage() {
  const location = useLocation();

  return (
    <div className="authPage">
      <div className="authWrap">
        <section className="authCard">
          <div className="authHeader">
            <p className="pill">403</p>
            <h1>Not authorized</h1>
            <p className="authSub">
              You don’t have permission to view this page.
              {location.pathname ? ` (${location.pathname})` : ""}
            </p>
          </div>

          <div className="naActions">
            <Link to="/login" className="btn btnPrimary btnBlock">
              Sign in
            </Link>
            <Link to="/" className="btn btnSecondary btnBlock">
              Go home
            </Link>
          </div>

          <p className="finePrint">
            Think this is a mistake? Contact an admin.
          </p>
        </section>
      </div>
    </div>
  );
}
