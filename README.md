# VitalSync

VitalSync is a fullstack healthcare dashboard capstone. This repository now contains the Sprint 14 authentication walking skeleton: a React/Vite client, Express API, MongoDB persistence, bcrypt password hashing, JWT sessions, and protected dashboard routing.

## Stack

- Frontend: React, Vite, React Router, Context API
- Backend: Node.js, Express, Mongoose
- Authentication: bcryptjs password hashing and JWT access tokens
- Database: MongoDB / MongoDB Atlas
- Deployment target: Vercel frontend, Render API, MongoDB Atlas

## Repository layout

```text
client/   React/Vite SPA with /login, /register, and protected /dashboard
server/   Express API with MongoDB user persistence and JWT middleware
docs/     Product, wireframe, and architecture planning documents
```

## Local setup

### 1. Install dependencies

```bash
npm install
npm run install:all
```

### 2. Configure the API

```bash
cp server/.env.example server/.env
```

Set these values in `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/vitalsync
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=1d
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Configure the client

```bash
cp client/.env.example client/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run both applications

Terminal 1:

```bash
npm run dev:server
```

Terminal 2:

```bash
npm run dev:client
```

Open `http://localhost:5173`.

## Authentication API

- `GET /api/health` — API health check
- `POST /api/auth/register` — creates a user and returns a JWT plus safe user payload
- `POST /api/auth/login` — validates credentials and returns a JWT plus safe user payload
- `GET /api/auth/me` — protected session restoration endpoint
- `GET /api/dashboard` — protected example endpoint

Example registration:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Demo Patient","email":"patient@example.com","password":"Password123!"}'
```

Example protected request:

```bash
curl http://localhost:5000/api/dashboard \
  -H 'Authorization: Bearer YOUR_JWT_HERE'
```

## Security implementation

- Passwords are hashed with bcryptjs before MongoDB persistence.
- Password hashes are never included in API responses.
- JWTs are signed server-side and verified by centralized middleware.
- Protected frontend routes redirect to `/login` without a valid session.
- Invalid or expired tokens are removed from localStorage and the user is redirected.
- Secrets are supplied through environment variables and are not committed.

This is demonstration software and is not HIPAA-certified production software. Do not use real patient data.

## Sprint 14 QA checklist

1. Register a new user at `/register`.
2. Confirm the browser navigates to `/dashboard`.
3. Refresh the dashboard and confirm `/api/auth/me` restores the session.
4. Log out and confirm `/dashboard` redirects to `/login`.
5. Log in again at `/login`.
6. Inspect MongoDB and verify the stored password is a bcrypt hash, not plaintext.
7. Attempt `/api/dashboard` without a token and verify it returns `401`.

## Future roadmap

The planning documents describe the next feature areas: role-specific dashboards, providers, appointments, medical timelines, prescriptions, authorization rules, audit events, testing, and deployment configuration.

- GitHub: https://github.com/vivekk-rajj/prodesk-capstone-vitalsync
- Figma: https://www.figma.com/design/PralBDxLJIJji3gLhrnZ4J/Untitled?t=h1RPR4WgQWJkSLGi-1
- Demo video: `DEMO_VIDEO_LINK_PENDING`
