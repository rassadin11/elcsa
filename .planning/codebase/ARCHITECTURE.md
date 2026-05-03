# Architecture

**Analysis Date:** 2026-05-03

## Pattern Overview

**Overall:** Feature-Layered Monolith with Modular UI Architecture

**Key Characteristics:**
- Page-based routing with component composition
- Separation of concerns across pages, widgets, and shared modules
- Local state management using React hooks (useState, useContext)
- Strict TypeScript with module path aliases for clean imports
- CSS modules for scoped styling with design tokens
- Custom hooks for feature-specific logic

## Layers

**App Layer (Bootstrap):**
- Purpose: Root component and router configuration
- Location: `src/app/`
- Contains: React root setup, global styles, routing provider
- Depends on: React, React Router DOM
- Used by: `src/main.tsx` entry point
- Key files: `src/app/App.tsx`, `src/app/providers/RouterProvider.tsx`, `src/app/styles/`

**Pages Layer (Routes):**
- Purpose: Route-level components mapped to URLs
- Location: `src/pages/`
- Contains: Full-page components (HomePage, WalletPage, SwapPage, ProfilePage, LoginPage, RegisterPage, SeedPhrasePage)
- Depends on: Widgets, Shared UI, React Router
- Used by: RouterProvider for route mapping
- Pattern: Each page is an `index.ts` barrel export wrapping a `ui/PageName.tsx` component
- Responsibilities: Page layout composition, tab state management at page level

**Widgets Layer (Feature Sections):**
- Purpose: Reusable section-level components composed into pages
- Location: `src/widgets/`
- Contains: Headers, forms, tables, cards, converters, and domain-specific sections
- Depends on: Shared UI, shared config, custom hooks from own `model/` directories
- Used by: Pages and other widgets
- Structure: Widget directories contain `ui/` (component files), `model/` (custom hooks), `lib/` (helper functions)
- Examples: `src/widgets/swap-form/`, `src/widgets/currency-converter/`, `src/widgets/token-table/`
- Key pattern: Business logic isolated in custom hooks (e.g., `useSwapForm`, `useConverter`)

**Shared Layer (Cross-Cutting):**
- Purpose: Reusable UI components, utilities, configs, and types
- Location: `src/shared/`
- Contains:
  - `ui/`: Atomic UI components (Button, FormField, TokenIcon, Title, Pill)
  - `config/`: Application constants and route definitions (ROUTES, USDT_RATE, GAS_PRICE)
  - `lib/`: Custom hooks (useDebounce, useLocalStorage) and utilities (cn classname helper)
  - `types/`: TypeScript type definitions
  - `api/`: Base API clients and response types
  - `assets/`: Images, SVGs, fonts
- Depends on: React only
- Used by: All other layers

**Entities Layer (Domain Models):**
- Purpose: Domain entities and their APIs
- Location: `src/entities/user/`
- Contains: User entity model, user API endpoints, user UI components
- Current state: Structure exists but implementation pending
- Pattern: Modeled as `api/`, `model/`, `ui/` subdirectories

**Features Layer (User Interactions):**
- Purpose: Specific user-facing features with associated logic
- Location: `src/features/auth/`
- Contains: Auth feature endpoints, state, and components
- Current state: Structure exists but implementation pending
- Pattern: Modeled as `api/`, `model/`, `ui/` subdirectories

## Data Flow

**Page Rendering:**

1. Browser requests `/` or another route
2. `RouterProvider` in `src/app/providers/RouterProvider.tsx` matches route against ROUTES
3. Corresponding page component loads from `src/pages/*/ui/PageName.tsx`
4. Page composes widgets from `src/widgets/*/`
5. Widgets compose shared UI from `src/shared/ui/`
6. Each widget may use custom hooks from `src/widgets/*/model/` for feature state
7. Shared styling from `src/app/styles/` applies globally

**Form/Widget State:**

1. Component calls custom hook (e.g., `useSwapForm()` from `src/widgets/swap-form/model/useSwapForm.ts`)
2. Hook manages local state with `useState`
3. Hook returns state + setter functions
4. Component renders UI and binds handlers

**Example: Swap Widget (`src/widgets/swap-form/ui/SwapForm.tsx`):**
- Imports custom hook `useSwapForm` from sibling `model/` directory
- Hook manages: fromToken, toToken, amounts, USD values, refresh state
- Hook defines constants: TOKENS list, TOKENS_LIST array
- Hook provides: getters, setters (setFromAmount, setPercent, swapTokens, refreshRate, etc.)
- Component renders: Two SwapCard components, direction button, rate row, info panel, button

## Key Abstractions

**Custom Hooks (Model Layer in Widgets):**
- Purpose: Encapsulate feature-specific business logic
- Examples: 
  - `useSwapForm()` - Manages token swap form state (tokens, amounts, rates)
  - `useConverter()` - Manages currency conversion (buy/sell mode, commission calculation)
  - `useCountdown()` - Manages countdown timer state
- Pattern: Hook receives config, returns state + handlers

**Barrel Exports (index.ts):**
- Purpose: Simplify imports, control what's exported from each module
- Pattern: Every page, widget, and shared UI component has an `index.ts`
- Example: `src/pages/swap/index.ts` exports { SwapPage } from './ui/SwapPage'
- Benefits: Hides internal structure, allows reorganization without breaking imports

**Route Configuration:**
- Location: `src/shared/config/routes.ts`
- Exports: ROUTES object with all route paths as constants
- Used by: `RouterProvider` for mapping, components for navigation links
- Benefits: Single source of truth for route definitions

**Design Tokens:**
- Location: `src/app/styles/variables.css`
- Contains: CSS custom properties (--bg-deep, --interactive, --highlight, --error, etc.)
- Used by: CSS modules throughout the codebase
- Theme: Dark mode crypto/fintech aesthetic

## Entry Points

**Browser Entry (`src/main.tsx`):**
- Location: `src/main.tsx`
- Triggers: Page load
- Responsibilities: 
  - Import global styles (fonts, reset, variables, global)
  - Create React root
  - Render `App` component with `StrictMode`

**App Root (`src/app/App.tsx`):**
- Location: `src/app/App.tsx`
- Triggers: After root render
- Responsibilities: Render RouterProvider (which provides all routing)

**Router Provider (`src/app/providers/RouterProvider.tsx`):**
- Location: `src/app/providers/RouterProvider.tsx`
- Triggers: App render
- Responsibilities:
  - Set up BrowserRouter
  - Define all Routes matching ROUTES constants
  - Map each route to its page component
  - Routes: HOME (/), WALLET, SWAP, PROFILE, LOGIN, REGISTER, SEED_PHRASE

## Error Handling

**Strategy:** Implicit error handling via React's StrictMode and TypeScript strict mode

**Patterns:**
- TypeScript prevents type mismatches at compile time (`strict: true` in tsconfig)
- React.StrictMode helps identify potential problems in development
- No explicit try/catch blocks detected; components assume valid props
- Forms validate input with regex (e.g., `removeAllNonNumeric` pattern in Converter)

## Cross-Cutting Concerns

**Styling:** 
- Global styles from `src/app/styles/` apply to all pages
- CSS modules for component-scoped styles (e.g., `SwapForm.module.css`)
- Design tokens from variables.css (colors, fonts, spacing)
- Utility: `cn()` function from `src/shared/lib/utils/cn.ts` for className composition

**Configuration:**
- Constants centralized in `src/shared/config/constants.ts` (USDT_RATE, GAS_PRICE, COUNTDOWN_DAYS)
- Routes centralized in `src/shared/config/routes.ts`
- Environment variables via `src/shared/config/env.ts`

**Utilities:**
- Custom hooks in `src/shared/lib/hooks/` (useDebounce, useLocalStorage)
- Helper functions in `src/shared/lib/utils/` (cn for classNames)

---

*Architecture analysis: 2026-05-03*
