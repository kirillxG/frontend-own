# Frontend Application

Production-ready frontend built with React and Vite. This repository contains the client-side application responsible for rendering the UI, managing client state, and communicating with backend services.

## Tech Stack

- React (TypeScript)
- Vite
- ESLint
- Modern CSS (component-scoped styling)

## Core Features

- Component-based UI architecture (Header, Footer, App shell)
- Client-side routing and layout composition
- Environment-based configuration via Vite
- Strict linting and type safety with TypeScript
- Fast local development with hot module replacement
- Optimized production builds

## Project Structure

- `src/` – Application source code
  - `App.tsx` – Root application component
  - `Header.tsx` / `Footer.tsx` – Layout components
  - `main.tsx` – Application bootstrap
- `public/` – Static assets
- `vite.config.ts` – Build and dev server configuration
- `eslint.config.js` – Linting rules

## Getting Started

### Prerequisites

- Node.js (>=18 recommended)
- npm or pnpm

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Application will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Scripts

- `dev` – Start local development server
- `build` – Create optimized production build
- `preview` – Serve production build locally
- `lint` – Run ESLint

## Architecture Notes

- Single-page application with a clear separation between layout and feature components
- Minimal global state; designed to scale toward feature-based folders
- Configuration favors explicitness over magic

## Environment Variables

Environment variables can be defined using `.env` files supported by Vite:

- `.env.local`
- `.env.production`

All variables must be prefixed with `VITE_`.

## Deployment

The output of `npm run build` is a static bundle located in `dist/`. It can be deployed to any static hosting provider (Vercel, Netlify, S3, Cloudflare Pages).

## Contributing

- Keep components small and focused
- Do not introduce shared state without justification
- Lint and type-check before committing

## License

Proprietary / internal use unless stated otherwise.
