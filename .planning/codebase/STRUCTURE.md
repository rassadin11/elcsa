# Codebase Structure

**Analysis Date:** 2026-05-03

## Directory Layout

```
elcsa/
├── .claude/               # Claude configuration and planning
├── .planning/
│   └── codebase/         # Generated documentation (this file)
├── dist/                 # Build output (Vite)
├── src/
│   ├── app/              # Application bootstrap and providers
│   ├── pages/            # Route-level page components
│   ├── widgets/          # Reusable section/feature components
│   ├── features/         # Feature-specific logic (stub)
│   ├── entities/         # Domain entity models (stub)
│   └── shared/           # Shared UI, utilities, config, types
├── index.html            # HTML entry point
├── main.tsx              # React bootstrap
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration with path aliases
└── vite.config.ts        # Vite build configuration
```

## Directory Purposes

**`src/app/`:**
- Purpose: Application initialization, routing setup, global styles
- Contains: Root App component, RouterProvider, global CSS files, style variables
- Key files: `App.tsx`, `providers/RouterProvider.tsx`, `styles/` directory
- Note: No state management providers currently (Redux dependencies present but unused)

**`src/pages/`:**
- Purpose: Full-page components corresponding to routes
- Contains: Directories for each page (home, wallet, swap, profile, login, register, seed-phrase)
- Structure: Each page directory has `index.ts` (barrel export) and `ui/PageName.tsx` (component)
- Pattern: Pages compose widgets to form complete views
- Key pages:
  - `home/` - Landing page with header, hero, about, converter, networks table, footer
  - `wallet/` - Wallet view with balance card and token table
  - `swap/` - Crypto swap interface with swap form
  - `profile/` - User profile section
  - `login/` - Login form
  - `register/` - Registration form
  - `seed-phrase/` - Seed phrase display/management

**`src/widgets/`:**
- Purpose: Reusable section-level and feature-specific components
- Contains: 14 widget directories, each a self-contained feature section
- Structure Pattern: `{widget-name}/ui/` for components, `{widget-name}/model/` for hooks, `{widget-name}/lib/` for helpers
- Key widgets:
  - `header/` - Navigation header
  - `hero/` - Hero section with countdown
  - `about/` - About company section
  - `currency-converter/` - Buy/sell USDT converter with commission table
  - `networks-table/` - Supported blockchain networks table
  - `footer/` - Footer navigation
  - `wallet-header/` - Wallet page header
  - `balance-card/` - Account balance display
  - `token-table/` - Token holdings table
  - `swap-form/` - Crypto swap form with token selection
  - `profile/` - User profile sections
  - `login-form/` - Login form
  - `register-form/` - Registration form
  - `seed-phrase/` - Seed phrase widget
- State Management: Local state via custom hooks in `model/` directories

**`src/shared/`:**
- Purpose: Cross-cutting concerns - reusable components, utilities, types, config
- Contains: `ui/`, `config/`, `lib/`, `types/`, `api/`, `assets/`

**`src/shared/ui/`:**
- Purpose: Atomic UI components reused across widgets and pages
- Contains:
  - `Button/` - Base button component with variants (primary, danger, ghost, outline)
  - `PrimaryButton/` - Primary action button (default export)
  - `FormField/` - Form input with password visibility toggle, copy to clipboard
  - `TokenIcon/` - Token avatar/icon component
  - `Title/` - Page/section title component
  - `Pill/` - Badge/pill component for labels
- Pattern: Each component has its own directory with `.tsx`, `.module.css`, and `index.ts`
- Exports: Centralized in `ui/index.ts` for easy imports

**`src/shared/config/`:**
- Purpose: Application-wide configuration and constants
- Contains:
  - `routes.ts` - ROUTES object with all application routes (HOME, WALLET, SWAP, LOGIN, REGISTER, PROFILE, SEED_PHRASE)
  - `constants.ts` - COUNTDOWN_DAYS, USDT_RATE, GAS_PRICE
  - `env.ts` - Environment variable handling (empty in current state)

**`src/shared/lib/`:**
- Purpose: Reusable hooks and utility functions
- Contains:
  - `hooks/` - Custom React hooks
    - `useDebounce.ts` - Debounce hook (file present, implementation stub)
    - `useLocalStorage.ts` - Local storage hook (file present, implementation stub)
  - `utils/` - Helper functions
    - `cn.ts` - Classname composition utility (file present, implementation stub)

**`src/shared/types/`:**
- Purpose: Shared TypeScript type definitions
- Contains: `index.ts` (centralized exports)
- Note: Currently minimal; types defined inline in components/hooks

**`src/shared/api/`:**
- Purpose: HTTP client and API types
- Contains:
  - `base.ts` - Base API client setup (file present, implementation stub)
  - `types.ts` - API response/request types (file present, implementation stub)

**`src/shared/assets/`:**
- Purpose: Static assets (images, SVGs)
- Contains: SVG logos for cryptocurrencies (btc.svg, eth.svg, sol.svg, trx.svg, arb.svg), header logo, topup icon

**`src/entities/` (Stub):**
- Purpose: Domain entity definitions and their associated APIs
- Contains: Modeled structure at `user/api/`, `user/model/`, `user/ui/`
- Current State: Directories exist but no implementation files

**`src/features/` (Stub):**
- Purpose: User-facing features with complex logic
- Contains: Modeled structure at `auth/api/`, `auth/model/`, `auth/ui/`
- Current State: Directories exist but no implementation files

**`src/app/styles/`:**
- Purpose: Global styles and design tokens
- Contains:
  - `fonts.css` - Font definitions (Manrope, JetBrains Mono)
  - `reset.css` - CSS reset
  - `variables.css` - CSS custom properties (colors, fonts)
  - `global.css` - Global element styles

## Key File Locations

**Entry Points:**
- `index.html` - HTML template with `<div id="root">` mount point
- `src/main.tsx` - React application bootstrap, imports global styles
- `src/app/App.tsx` - Root component

**Routing:**
- `src/shared/config/routes.ts` - All route path constants
- `src/app/providers/RouterProvider.tsx` - Route to component mapping

**Configuration:**
- `tsconfig.json` - TypeScript with path aliases (@app, @pages, @widgets, @features, @entities, @shared)
- `vite.config.ts` - Vite dev server (port 3000) and build config
- `package.json` - Dependencies and scripts

**Core Logic Examples:**
- `src/widgets/swap-form/model/useSwapForm.ts` - Swap form state (tokens, amounts, rates)
- `src/widgets/currency-converter/model/useConverter.ts` - Converter state (buy/sell mode, commission)
- `src/widgets/hero/lib/useCountdown.ts` - Countdown timer logic

**Testing:**
- No test files detected in current codebase

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `HomePage.tsx`, `SwapForm.tsx`, `Button.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useSwapForm.ts`, `useConverter.ts`)
- Styles: Same as component name with `.module.css` suffix (e.g., `SwapForm.module.css`)
- Constants/Utilities: camelCase or UPPERCASE_SNAKE_CASE for constants (e.g., `TOKENS_LIST`)
- Barrel exports: Always `index.ts`

**Directories:**
- Feature/component directories: kebab-case (e.g., `swap-form`, `currency-converter`, `wallet-header`)
- Layer directories: lowercase plural (e.g., `pages`, `widgets`, `shared`)
- Sub-layer directories: lowercase (e.g., `ui`, `model`, `lib`, `config`)

**Components/Exports:**
- Exported components: PascalCase matching filename (e.g., `HomePage` from `HomePage.tsx`)
- Props interfaces: `Props` suffix or named generically (e.g., `interface Props { ... }`)
- Custom hooks: `use` prefix (e.g., `useSwapForm`, `useConverter`)

## Where to Add New Code

**New Page:**
1. Create directory: `src/pages/{page-name}/`
2. Create: `src/pages/{page-name}/ui/{PageName}.tsx`
3. Create: `src/pages/{page-name}/index.ts` with barrel export
4. Add route constant to `src/shared/config/routes.ts`
5. Add Route to `src/app/providers/RouterProvider.tsx`

**New Widget:**
1. Create directory: `src/widgets/{widget-name}/`
2. Create: `src/widgets/{widget-name}/ui/{WidgetName}.tsx`
3. Create: `src/widgets/{widget-name}/index.ts` with barrel export
4. If widget has state logic, create: `src/widgets/{widget-name}/model/use{WidgetName}.ts`
5. If widget has helper functions, create: `src/widgets/{widget-name}/lib/` directory

**New Shared UI Component:**
1. Create directory: `src/shared/ui/{ComponentName}/`
2. Create: `src/shared/ui/{ComponentName}/{ComponentName}.tsx`
3. Create: `src/shared/ui/{ComponentName}/{ComponentName}.module.css`
4. Create: `src/shared/ui/{ComponentName}/index.ts` with export
5. Add export to `src/shared/ui/index.ts`

**New Custom Hook (Shared):**
1. Create in: `src/shared/lib/hooks/use{HookName}.ts`
2. Export and document purpose

**New Utility Function:**
1. Create in: `src/shared/lib/utils/{utilityName}.ts`
2. Keep functions pure and focused

**New Type Definition:**
1. Define inline in component if component-specific
2. Or add to `src/shared/types/index.ts` if widely used

## Special Directories

**`dist/`:**
- Purpose: Build output directory
- Generated: Yes (by Vite on `npm run build`)
- Committed: No (in .gitignore)
- Contents: HTML, CSS, JS bundles

**`.planning/codebase/`:**
- Purpose: Generated architecture and structure documentation
- Generated: Yes (by GSD tools)
- Committed: Yes (for reference)

**`src/app/styles/`:**
- Purpose: Global styles not owned by specific components
- Committed: Yes
- Design: Dark theme with gradient accents, crypto/fintech aesthetic

---

*Structure analysis: 2026-05-03*
