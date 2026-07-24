import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  registerRequest,
  logoutRequest,
  refreshRequest,
  getMeRequest,
} from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  function applyAuth(data) {
    setUser(data.user);
    setAccessToken(data.accessToken);
  }

  function clearAuth() {
    setUser(null);
    setAccessToken(null);
  }

  async function login(email, password) {
    const data = await loginRequest(email, password);
    applyAuth(data);
    return data;
  }

  async function register(name, email, password) {
    const data = await registerRequest(name, email, password);
    applyAuth(data);
    return data;
  }

  async function logout() {
    await logoutRequest();
    clearAuth();
  }

  // On first load, try to silently restore the session using the refresh cookie
  useEffect(() => {
    (async () => {
      try {
        const refreshData = await refreshRequest();
        const meData = await getMeRequest(refreshData.accessToken);
        setAccessToken(refreshData.accessToken);
        setUser(meData.user);
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, login, register, logout, setAccessToken, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}