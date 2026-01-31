import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";

const base = import.meta.env.VITE_API_BASE ?? "/v1";
const opts = (method: string, body?: any) => ({
  method,
  credentials: "include" as const,
  headers: body ? { "Content-Type": "application/json" } : undefined,
  body: body ? JSON.stringify(body) : undefined,
});

export default function LogoutPage() {
  const navigate = useNavigate();

  const { refreshUser } = useAuth();

  useEffect(() => {
    let cancelled = false;

    async function logout() {
      try {
        await fetch(`${base}/auth/logout`, opts("POST"));
        await refreshUser();
      } catch {
        // ignore network errors; logout is best-effort
      } finally {
        if (!cancelled) {
          navigate("/login", { replace: true });
        }
      }
    }

    logout();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div style={{ padding: 24, color: "var(--muted)" }}>Signing you out…</div>
  );
}
