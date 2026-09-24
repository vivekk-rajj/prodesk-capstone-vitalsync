import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const AuthContext = createContext(null);

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.message || 'Request failed');
  return body;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('vitalsync_token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    request('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(({ user: currentUser }) => setUser(currentUser))
      .catch(() => {
        localStorage.removeItem('vitalsync_token');
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const authenticate = async (path, credentials) => {
    const result = await request(path, { method: 'POST', body: JSON.stringify(credentials) });
    localStorage.setItem('vitalsync_token', result.token);
    setToken(result.token);
    setUser(result.user);
    return result;
  };

  const logout = () => {
    localStorage.removeItem('vitalsync_token');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, token, loading, login: (data) => authenticate('/auth/login', data), register: (data) => authenticate('/auth/register', data), logout }), [user, token, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
