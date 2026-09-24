import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [message, setMessage] = useState('Loading protected dashboard data…');

  useEffect(() => {
    fetch(`${API_URL}/dashboard`, { headers: { Authorization: `Bearer ${token}` } })
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) throw new Error(body.message || 'Unable to load dashboard');
        return body;
      })
      .then((body) => setMessage(body.message))
      .catch((error) => setMessage(error.message));
  }, [token]);

  return <main className="page"><header className="topbar"><div><p className="eyebrow">VITALSYNC DASHBOARD</p><h1>Hello, {user.name}</h1></div><button className="secondary" onClick={logout}>Log out</button></header><section className="grid"><article className="card"><h2>Authenticated successfully</h2><p>{message}</p><dl><dt>Name</dt><dd>{user.name}</dd><dt>Email</dt><dd>{user.email}</dd><dt>Role</dt><dd>{user.role}</dd><dt>User ID</dt><dd>{user.id}</dd></dl></article><article className="card"><h2>Walking skeleton</h2><p>Your registration, login, JWT persistence, protected API request, and route guard are connected end-to-end.</p><ul><li>Appointments — next sprint</li><li>Provider directory — next sprint</li><li>Medical timeline — next sprint</li></ul></article></section></main>;
}
