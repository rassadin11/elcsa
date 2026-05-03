# Technology Stack

**Analysis Date:** 2026-05-03

## Languages

**Primary:**
- TypeScript 5.6.2 - Primary language for all application code and configuration
- JSX/TSX - React component syntax using React 19 with JSX transform

**Secondary:**
- CSS Modules - Component styling (`.module.css` files throughout the codebase)

## Runtime

**Environment:**
- Node.js (version specified in `package-lock.json` lockfile v3)

**Package Manager:**
- npm - JavaScript package manager
- Lockfile: `package-lock.json` present (v3)

## Frameworks

**Core:**
- React 19.0.0 - UI library for building components
- React Router DOM 7.1.5 - Client-side routing and navigation

**State Management:**
- Redux Toolkit 2.5.1 - State management library (installed but not actively used in current codebase)
- React Redux 9.2.0 - React bindings for Redux (installed but not actively used)

**HTTP Client:**
- Axios 1.7.9 - HTTP client for API requests (installed but not actively used)

**Validation:**
- Zod 3.24.1 - TypeScript-first schema validation (installed but not actively used)

**Build/Dev:**
- Vite 6.0.5 - Fast build tool and dev server
- Vite TypeScript Paths Plugin 5.1.4 - Resolves path aliases in TypeScript
- Vite React Plugin 4.3.4 - Fast refresh for React components

## Key Dependencies

**Critical:**
- react@19.0.0 - Core UI framework
- react-router-dom@7.1.5 - Essential for page navigation and routing

**Infrastructure:**
- @vitejs/plugin-react@4.3.4 - Enables React fast refresh during development
- vite-tsconfig-paths@5.1.4 - Maps tsconfig path aliases to Vite bundler
- @types/react@19.0.2 - TypeScript definitions for React
- @types/react-dom@19.0.2 - TypeScript definitions for React DOM

## Configuration

**Environment:**
- Vite development server runs on port 3000 (see `vite.config.ts`)
- Environment variables defined via `.env.example`:
  - `VITE_API_URL` - Backend API endpoint (example: `https://api.example.com`)
  - `VITE_APP_NAME` - Application name (example: `Elcsa`)
- Environment variables access via `import.meta.env.VITE_*` pattern

**Build:**
- TypeScript compilation first: `tsc -b && vite build`
- Source maps and code splitting handled by Vite
- Build output to `dist/` directory

**Linting:**
- ESLint 9.17.0 - Code linting
- ESLint JS config 9.17.0 - Base ESLint rules
- TypeScript ESLint 8.18.2 - TypeScript support for ESLint
- ESLint React Hooks 5.0.0 - Rules for React hooks usage
- ESLint React Refresh 0.4.16 - Rules for Vite React plugin compatibility
- Globals 15.14.0 - Global variable definitions for linting

## Platform Requirements

**Development:**
- Node.js (latest LTS recommended based on npm v3 lockfile)
- npm or compatible package manager
- Code editor with TypeScript support

**Production:**
- Modern browser support (ES2020 target)
- Static hosting capable of serving SPA with client-side routing fallback

---

*Stack analysis: 2026-05-03*
