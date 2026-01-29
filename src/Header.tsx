import { NavLink } from "react-router-dom";
import "./css/header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="headerInner">
        <NavLink to="/" className="brand">
          Nocturne
        </NavLink>

        <nav className="headerNav">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/topics">Topics</NavLink>
          <NavLink to="/notauthorized">FAQ</NavLink>
        </nav>

        <div className="headerActions">
          <NavLink to="/login" className="btn btnGhost">
            Sign in
          </NavLink>
          <NavLink to="/register" className="btn btnPrimary">
            Get started
          </NavLink>
        </div>
      </div>
    </header>
  );
}
