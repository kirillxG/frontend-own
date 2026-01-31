import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type User = {
  id: string;
  displayName: string;
  avatarUrl?: string;
  createdAt?: string;
};

type MeResponse = {
  data: {
    user: User;
  };
};

type AuthContextValue = {
  user: User | null | undefined; // undefined = loading, null = logged out
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// Use relative base to work with Vite proxy and avoid CORS issues.
// If you don't use the proxy, set VITE_API_BASE to "http://localhost:3000/v1".
const base = import.meta.env.VITE_API_BASE ?? "/v1";

type FetchOptions = Omit<RequestInit, "method" | "body"> & {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

function makeOpts({ method, body, ...rest }: FetchOptions): RequestInit {
  return {
    method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  };
}

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);

  if (!res.ok) {
    let details: any = undefined;
    try {
      details = await res.json();
    } catch {
      // ignore non-json error bodies
    }

    throw Object.assign(new Error(`HTTP ${res.status}`), {
      status: res.status,
      details,
    });
  }

  return (await res.json()) as T;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const refreshUser = useCallback(async () => {
    try {
      const payload = await fetchJson<MeResponse>(
        `${base}/me`,
        makeOpts({ method: "GET" }),
      );
      setUser(payload.data.user);
    } catch (err: any) {
      // 401/403 => not logged in (cookie missing/expired)
      if (err?.status === 401 || err?.status === 403) {
        setUser(null);
        return;
      }

      // Network/server down: keep current user state if any, otherwise show logged-out UI.
      // If you prefer a separate "offline" state, add it explicitly.
      setUser((prev) => (prev === undefined ? null : prev));
      // Optional: console.debug(err.details ?? err);
    }
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, setUser, refreshUser }),
    [user, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
