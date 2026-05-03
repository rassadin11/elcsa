# Coding Conventions

**Analysis Date:** 2026-05-03

## Naming Patterns

**Files:**
- React components: PascalCase with `.tsx` extension (e.g., `Header.tsx`, `TokenSelect.tsx`)
- Utility/hook files: camelCase with `.ts` extension (e.g., `useCountdown.ts`, `useConverter.ts`)
- Module CSS files: `[ComponentName].module.css` (e.g., `Button.module.css`, `Header.module.css`)
- Config/constant files: camelCase (e.g., `routes.ts`, `constants.ts`, `types.ts`)
- Model/logic files: lowercase with descriptive names (e.g., `tiers.ts`, `networks.ts`, `tokens.ts`)

**Functions:**
- Component functions: PascalCase (e.g., `Header()`, `TokenSelect()`, `useCountdown()`)
- Hook functions: camelCase with `use` prefix (e.g., `useCountdown()`, `useConverter()`, `useSwapForm()`)
- Utility/helper functions: camelCase (e.g., `findTier()`, `progressPercent()`, `setFromAmount()`)
- Event handlers: camelCase starting with `on` or action verb (e.g., `handleClick()`, `select()`, `toggleMode()`)
- Internal/private functions: camelCase with implied scope (e.g., `updateRub()`, `refreshRate()`, `onClickOutside()`)

**Variables:**
- Constants (exported): UPPER_SNAKE_CASE or camelCase depending on scope (e.g., `COUNTDOWN_DAYS`, `USDT_RATE`, `ROUTES`, `TOKENS`)
- State variables: camelCase (e.g., `rubVal`, `email`, `password`, `mode`, `fromAmount`)
- Component props: camelCase (e.g., `value`, `options`, `onChange`, `children`, `compact`)
- Local state variables: camelCase (e.g., `open`, `copied`, `isVisible`, `isRefreshing`)
- Object/Record keys: camelCase or snake_case based on context (e.g., `TICKERS: [{ symbol, price, change }]`, `TOKENS: { BTC, ETH, SOL }`)

**Types:**
- Interfaces: PascalCase (e.g., `Props`, `Token`, `Tier`, `CountdownValue`, `UseConverterArgs`)
- Type aliases: PascalCase (e.g., `ConverterMode`)
- Generic types: PascalCase (e.g., `Token`, `Network`, `Tier`)

## Code Style

**Formatting:**
- No Prettier or ESLint config file present; code follows implicit conventions
- Imports: grouped by source, newline between groups (e.g., React → external packages → aliases → relative)
- Single quotes for strings (not double quotes)
- Semicolons at end of statements
- Trailing commas in objects/arrays across lines
- 2-space indentation
- JSX attributes on same line or break to new lines for readability

**Linting:**
- ESLint 9.17.0 configured (referenced in `package.json`)
- Run with: `npm run lint`
- No custom `.eslintrc` file; using defaults from `@eslint/js` v9.17.0 with TypeScript support
- typescript-eslint v8.18.2 for TS/TSX linting
- eslint-plugin-react-hooks v5.0.0 for React hook rules
- eslint-plugin-react-refresh v0.4.16 for React refresh compatibility

## Import Organization

**Order (observed pattern):**
1. React/React DOM imports
2. React Router imports (e.g., `react-router-dom`)
3. External packages (e.g., `axios`, Redux, etc.)
4. Absolute path imports (using `@` alias, e.g., `@shared/ui`, `@widgets/`, `@pages/`)
5. Relative imports (sibling files in same directory, e.g., `../model/useConverter`)
6. Style imports (`.module.css`)

**Path Aliases (tsconfig.json):**
- `@app/*` → `src/app/*` - Application-level providers and wrappers
- `@pages/*` → `src/pages/*` - Page components
- `@widgets/*` → `src/widgets/*` - Reusable widget components
- `@features/*` → `src/features/*` - Feature-level logic (currently unused)
- `@entities/*` → `src/entities/*` - Entity/domain models (currently unused)
- `@shared/*` → `src/shared/*` - Shared utilities, UI components, config, types, hooks

**Example import pattern from `src/app/providers/RouterProvider.tsx`:**
```typescript
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '@pages/home'
import { WalletPage } from '@pages/wallet'
import { ROUTES } from '@shared/config/routes'
```

## Error Handling

**Patterns:**
- No try/catch blocks found in codebase; errors are not currently handled explicitly
- Form validation is implicit (e.g., `FormField` component handles input type validation)
- Input sanitization done inline (e.g., `updateRub()` in `useConverter.ts` strips non-numeric characters: `raw.replace(/[^0-9.]/g, '')`)
- Numeric parsing with fallback to 0: `Number.parseFloat(rubVal) || 0`, `Number.parseInt(saved, 10)`
- DOM operations assume elements exist (e.g., `document.getElementById('root')!` with non-null assertion)

## Logging

**Framework:** `console` only (not used in current codebase)

**Patterns:**
- No logging framework detected
- No `console.log()`, `console.error()`, or custom logging utilities in source code
- Development done without logging utilities; debugging relies on browser DevTools

## Comments

**When to Comment:**
- Comments not observed in codebase
- Code is self-documenting through descriptive function/variable names
- Complex business logic (tier calculations, countdown math) is explained through clear variable names

**JSDoc/TSDoc:**
- No JSDoc comments found in codebase
- Type inference used via TypeScript instead of JSDoc type annotations

## Function Design

**Size:** 
- Small, focused functions (10-40 lines typical)
- Example: `useCountdown()` hook is 26 lines with all logic contained
- Utility functions are 5-15 lines (e.g., `findTier()`, `progressPercent()`)

**Parameters:**
- Named parameters for complex functions using object destructuring
- Example: `useConverter({ usdtRate }: UseConverterArgs)`
- Inline parameters for simple callbacks (e.g., `(token: Token) => { ... }`)
- Optional parameters with defaults (e.g., `compact = false`, `size = 40`)

**Return Values:**
- Hook functions return objects with state and handlers (e.g., `useConverter()` returns `{ mode, rubVal, updateRub, ... }`)
- Components return JSX (implicit React.ReactNode)
- Utility functions return typed values (e.g., `CountdownValue`, `Pick<Tier, 'pct'>`)
- Memoized results in hooks using `useMemo()` for expensive calculations

## Module Design

**Exports:**
- Barrel files in index.ts re-export main component/function from `ui/` or model subdirectories
- Pattern: `export { ComponentName } from './ui/ComponentName'` or `export { HookName } from './model/HookName'`
- Example files:
  - `src/widgets/header/index.ts`: `export { Header } from './ui/Header'`
  - `src/shared/ui/index.ts`: exports all UI components (Button, FormField, Pill, etc.)

**Barrel Files:** 
- Used throughout codebase for cleaner imports
- All widget directories have `index.ts` exporting main component
- Shared UI components re-exported via `src/shared/ui/index.ts`
- Reduces import depth: `import { Header } from '@widgets/header'` instead of `import { Header } from '@widgets/header/ui/Header'`

## Component Architecture

**Structure (Feature Folder Pattern):**
```
[feature]/
├── ui/                    # React components
│   ├── ComponentName.tsx
│   └── ComponentName.module.css
├── model/                 # Business logic, hooks, data
│   ├── useHookName.ts
│   └── constants.ts
└── index.ts               # Barrel export
```

**Interface Props Pattern:**
- Props defined as `interface Props { ... }` before component function
- Destructured in function signature (e.g., `export function TokenSelect({ value, options, onChange, compact = false }: Props)`)
- Optional props handled with default parameters

**Example from `src/shared/ui/Button/Button.tsx`:**
```typescript
interface Props {
  variant: 'primary' | 'danger' | 'ghost' | 'outline'
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
}

export function Button({ variant, children, onClick, type = 'button' }: Props) {
  return (
    <button type={type} className={`${styles.btn} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  )
}
```

---

*Convention analysis: 2026-05-03*
