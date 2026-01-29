import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/auth.css";

type ApiOk<T> = { data: T };
type ApiErr = { error: any };

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

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState(""); // email OR username
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const id = identifier.trim();
    if (!id) {
      setError("Enter your username or email.");
      return;
    }

    setLoading(true);
    try {
      // Change endpoint to match your backend.
      // Important: always respond with success-like message server-side to avoid account enumeration.
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ identifier: id }),
      });

      const json = (await res.json().catch(() => null)) as
        | ApiOk<any>
        | ApiErr
        | null;

      if (!res.ok || !json) throw new Error("Request failed.");
      if ("error" in json && json.error)
        throw new Error(extractErrorMessage(json.error));
      if (!("data" in json)) throw new Error("Request failed.");

      setSent(true);
    } catch (err: any) {
      setError(err?.message || "Request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="authPage">
      <div className="authWrap">
        <section className="authCard">
          <div className="authHeader">
            <p className="pill">Recovery</p>
            <h1>Forgot password</h1>
            <p className="authSub">
              Enter your username or email. If an account exists, you’ll get a
              reset link.
            </p>
          </div>

          {error && (
            <div className="authError" role="alert">
              {error}
            </div>
          )}

          {sent ? (
            <div className="authSuccess" role="status">
              If that account exists, a reset link has been sent.
              <div style={{ marginTop: 10 }}>
                <Link className="btn btnSecondary btnBlock" to="/login">
                  Back to sign in
                </Link>
              </div>
            </div>
          ) : (
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

              <button
                className="btn btnPrimary btnBlock"
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending…" : "Send reset link"}
              </button>

              <p className="finePrint">
                Remembered it?{" "}
                <Link to="/login" className="link">
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
