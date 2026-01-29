# Secure Self‑Hosted Platform

This project is a **security‑first, fully self‑hosted web platform** built with a strict separation between UI, API, authentication, and authorization.

It is intentionally boring in the right places and opinionated where mistakes are expensive.

---

## Core Principles

- **Server is the authority**
  - All authentication and authorization decisions happen server‑side.
  - The client is never trusted for identity, roles, or permissions.

- **Opaque sessions**
  - Authentication uses `httpOnly`, `Secure` cookies.
  - Cookies store an opaque `session_id`, never a user id.
  - Sessions are stored, validated, expired, and revoked server‑side.

- **Default deny**
  - Routes require explicit permissions.
  - Missing or malformed permission config results in denial.

- **UI is not a security boundary**
  - UI rendering decisions are convenience only.
  - Every API request is independently authorized.

---

## Tech Stack

### Frontend

- React (SPA)
- React Router (loader‑based auth checks)
- Dark, token‑driven UI
- No role or permission logic stored in browser storage

### Backend

- Node.js
- Fastify
- PostgreSQL
- argon2 (password hashing)
- Docker (containerized services)
- Nginx (reverse proxy)

### Hosting

- Fully self‑hosted
- Target environment: Hetzner
- No third‑party auth or managed services

---

## API Design

All API endpoints live under `/api/*`.

### Auth / Session Endpoints

These are **actions**, not CRUD.

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/register`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET  /api/auth/me`

`/api/auth/me` is the **only supported way** for the client to determine:

- who is logged in
- what permissions they have

There are **no cookie inspection endpoints**.

---

## Authorization Model

### Permissions

- Permissions follow `object.action` format (e.g. `users.edit`, `roles.assign`)
- Routes declare required permissions explicitly.
- No implicit or global bypasses.

### Roles

- Users may have multiple roles.
- Roles contain permissions.
- Roles have priorities for hierarchy checks.

### Object‑level checks

- Targets are derived from validated route params or DB lookups.
- No permission logic trusts request body blindly.
- Self‑actions are explicit (`users.edit.self`), never assumed.

---

## Route Architecture

Routes are file‑based but **API‑namespaced by the loader**.

Example module shape:

```js
export default {
  route: "/users/:id",
  method: "patch",
  permissions: ["users.edit"],
  enabled: true,
  handler,
};
```

The loader automatically registers this as:

```
PATCH /api/users/:id
```

Auth and CRUD are separated by **domain**, not by prefix avoidance.

---

## Cookies & Sessions

- Cookies are:
  - `httpOnly`
  - `Secure` (in production)
  - `SameSite` configured per deployment model
- "Remember me" affects **session expiration only**
- Sessions are revocable and expire server‑side

---

## Database Notes

- PostgreSQL is the source of truth
- Schema naming is consistent (`username`, `rolename`, `permissionname`)
- Permissions are resolved per request (with optional caching)
- Migrations are explicit and deterministic

---

## What This Project Avoids

- Client‑side role storage
- JWTs stored in localStorage
- UI‑only admin protection
- Implicit permissions
- Magic behavior without enforcement
- Debug endpoints in production

---

## Intended Usage

This project is meant for:

- private or semi‑private communities
- platforms requiring real moderation
- environments where infrastructure ownership matters
- developers who value correctness over shortcuts

---

## Status

Active development.
Architecture stabilized.
Features layered incrementally.

---

## License

Internal / private use unless stated otherwise.
