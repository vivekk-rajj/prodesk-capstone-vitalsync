
## 9. Sprint 14 MVP implementation

**Prompt:**

> Implement the VitalSync Fullstack Engineering walking skeleton with a React/Vite client, Express/Mongoose API, bcrypt password hashing, JWT authentication, protected routes, session restoration, and a working dashboard. Prioritize secure registration, login, route protection, and clear local setup over visual polish.

**Decision:**

The MVP was implemented with a `server/` Express API and `client/` React/Vite SPA. Registration and login return a JWT and safe user payload, passwords are hashed with bcryptjs before persistence, `/api/auth/me` restores sessions, `/api/dashboard` proves protected API access, and React Router redirects unauthenticated users to `/login`.
