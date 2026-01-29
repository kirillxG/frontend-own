import { type FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/auth.css";

type ApiOk<T> = { data: T };
type ApiErr = { error: any };

type LoginData = {
  token?: string;
  accessToken?: string;
  user?: { id: string; username?: string; email?: string };
};

function extractErrorMessage(err: any): string {
  if (!err) return "Request failed.";
  if (typeof err === "string") return err;
  if (typeof err.message === "string") return err.message;
  if (typeof err.error === "string") return err.error;
  if (Array.isArray(err.errors) && err.errors[0]) {
    const e0 = err.errors[0];
    if (typeof e0 === "string") return e0;
    if (typeof e0.message === "string") return e0.message;
  }
  return "Request failed.";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from ?? "/";

  const [identifier, setIdentifier] = useState(""); // email OR username
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const id = identifier.trim();
    if (!id || !password) {
      setError("Username/email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ identifier: id, password, remember }), // backend should accept identifier
      });

      const json = (await res.json().catch(() => null)) as
        | ApiOk<LoginData>
        | ApiErr
        | null;

      if (!res.ok || !json) {
        throw new Error("Login failed.");
      }
      if ("error" in json && json.error) {
        throw new Error(extractErrorMessage(json.error));
      }
      if (!("data" in json)) {
        throw new Error("Login failed.");
      }

      const data = json.data;
      const token = data.token ?? data.accessToken;
      if (token) localStorage.setItem("auth_token", token);

      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="authPage">
      <div className="authWrap">
        <section className="authCard">
          <div className="authHeader">
            <p className="pill">Welcome back</p>
            <h1>Sign in</h1>
            <p className="authSub">Use your username or email.</p>
          </div>

          {error && (
            <div className="authError" role="alert">
              {error}
            </div>
          )}

          <form className="form" onSubmit={onSubmit}>
            <div className="field">
              <label className="label" htmlFor="identifier">
                Username or email
              </label>
              <input
                className="input"
                id="identifier"
                autoComplete="username"
                placeholder="kiri or you@domain.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="field">
              <div className="rowBetween">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <Link to="/forgotpassword" className="link smallLink">
                  Forgot?
                </Link>
              </div>

              <input
                className="input"
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <label className="checkRow">
              <input
                className="check"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                disabled={loading}
              />
              <span>Remember me</span>
            </label>

            <button
              className="btn btnPrimary btnBlock"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>

            <p className="finePrint">
              No account?{" "}
              <Link to="/register" className="link">
                Create one
              </Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
