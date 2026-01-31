import { NavLink } from "react-router-dom";
import "./css/header.css";

import { useAuth } from "./providers/AuthContext";

export default function Header() {
  const { user } = useAuth();
  const isAuthed = !!user;

  return (
    <header className="header">
      <div className="headerInner">
        <NavLink to="/" className="brand">
          kiri-IT
        </NavLink>

        <nav className="headerNav">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/topics">Topics</NavLink>
          <NavLink to="/notauthorized">FAQ</NavLink>
        </nav>

        {!isAuthed ? (
          <div className="headerActions">
            <NavLink to="/login" className="btn btnGhost">
              Sign in
            </NavLink>
            <NavLink to="/register" className="btn btnPrimary">
              Get started
            </NavLink>
          </div>
        ) : (
          <div className="headerActions">
            <NavLink to="/" className="btn btnGhost">
              {user.displayName}
            </NavLink>
            <NavLink to="/settings" className="btn btnPrimary">
              Settings
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
