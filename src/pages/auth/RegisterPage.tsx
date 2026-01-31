import { type FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/auth.css";

type ApiOk<T> = { data: T };
type ApiErr = { error: any };

type RegisterData = {
  token?: string;
  accessToken?: string;
  user?: { id: string; username?: string };
};

const base = import.meta.env.VITE_API_BASE ?? "/v1";
const opts = (method: string, body?: any) => ({
  method,
  credentials: "include" as const,
  headers: body ? { "Content-Type": "application/json" } : undefined,
  body: body ? JSON.stringify(body) : undefined,
});

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

export default function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordIssue = useMemo(() => {
    if (!password) return null;
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (confirm && password !== confirm) return "Passwords do not match.";
    return null;
  }, [password, confirm]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const u = username.trim();
    if (!u) {
      setError("Username is required.");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${base}/auth/register`,
        opts("POST", { loginName: u, password }),
      );

      const json = (await res.json().catch(() => null)) as
        | ApiOk<RegisterData>
        | ApiErr
        | null;

      if (!res.ok || !json) {
        throw new Error("Registration failed.");
      }
      if ("error" in json && json.error) {
        throw new Error(extractErrorMessage(json.error));
      }
      if (!("data" in json)) {
        throw new Error("Registration failed.");
      }

      navigate("/login", { replace: true });
    } catch (err: any) {
      setError(err?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="authPage">
      <div className="authWrap">
        <section className="authCard">
          <div className="authHeader">
            <p className="pill">Create account</p>
            <h1>Register</h1>
            <p className="authSub">
              Email is optional later. For now, just pick a username.
            </p>
          </div>

          {error && (
            <div className="authError" role="alert">
              {error}
            </div>
          )}

          <form className="form" onSubmit={onSubmit}>
            <div className="field">
              <label className="label" htmlFor="username">
                Login name
              </label>
              <input
                className="input"
                id="username"
                autoComplete="username"
                placeholder="kiri"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className="input"
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <p className="hint">At least 8 characters.</p>
            </div>

            <div className="field">
              <label className="label" htmlFor="confirm">
                Confirm password
              </label>
              <input
                className="input"
                id="confirm"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                disabled={loading}
              />
              {passwordIssue && <p className="hint">{passwordIssue}</p>}
            </div>

            <button
              className="btn btnPrimary btnBlock"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating…" : "Create account"}
            </button>

            <p className="finePrint">
              Already have an account?{" "}
              <Link to="/login" className="link">
                Sign in
              </Link>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
