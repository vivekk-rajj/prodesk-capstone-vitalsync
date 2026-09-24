import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthForm({ mode }) {
  const isRegister = mode === 'register';
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await (isRegister ? register(form) : login({ email: form.email, password: form.password }));
      navigate('/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-layout">
      <section className="brand-panel"><p className="eyebrow">VITALSYNC</p><h1>Care coordination with a clearer view.</h1><p>Secure access to appointments, providers, prescriptions, and patient history.</p></section>
      <form className="card form" onSubmit={submit}>
        <h2>{isRegister ? 'Create your account' : 'Welcome back'}</h2>
        <p className="muted">{isRegister ? 'Start your secure VitalSync workspace.' : 'Sign in to continue to your dashboard.'}</p>
        {error && <div className="error" role="alert">{error}</div>}
        {isRegister && <label>Name<input name="name" value={form.name} onChange={update} required minLength="2" autoComplete="name" /></label>}
        <label>Email<input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" /></label>
        <label>Password<input name="password" type="password" value={form.password} onChange={update} required minLength="8" autoComplete={isRegister ? 'new-password' : 'current-password'} /></label>
        <button disabled={submitting}>{submitting ? 'Please wait…' : isRegister ? 'Register' : 'Log in'}</button>
        <p className="muted">{isRegister ? 'Already registered?' : 'New to VitalSync?'} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Log in' : 'Create an account'}</Link></p>
      </form>
    </main>
  );
}
