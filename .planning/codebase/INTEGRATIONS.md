# External Integrations

**Analysis Date:** 2026-05-03

## APIs & External Services

**Backend API:**
- Generic HTTP client configured for backend communication
  - SDK/Client: Axios 1.7.9 (installed but not actively used in current codebase)
  - Configuration: Environment variable `VITE_API_URL` in `.env.example`
  - Auth: No active authentication implementation detected

**Cryptocurrency Networks:**
- Bitcoin (BTC) - Display and swap capabilities
- Ethereum (ETH) - Display and swap capabilities
- Solana (SOL) - Display and swap capabilities
- Tron (TRX) - Display and swap capabilities
- Arbitrum (ARB) - Display and swap capabilities

**Token Operations:**
- USDC - Stablecoin on Solana network
- USDT - Stablecoin on Ethereum network
- Display-only implementation with mock rates and balances

## Data Storage

**Databases:**
- Not integrated - No database client detected

**File Storage:**
- Local filesystem only - Static assets (images, SVGs) bundled with Vite

**Caching:**
- Browser localStorage integration via custom hook `useLocalStorage` in `src/shared/lib/hooks/useLocalStorage.ts`
- No distributed cache system detected

## State Management

**Current State Management:**
- React hooks (useState) - Primary state management throughout codebase
- Redux Toolkit 2.5.1 installed but not configured or used
- Redux store not initialized anywhere in the application

**Local State:**
- useState hooks for form data, UI toggles, and component state
- Example: Login form manages email and password state in `src/widgets/login-form/ui/LoginForm.tsx`
- Example: Swap form state managed via `useSwapForm` hook in `src/widgets/swap-form/model/useSwapForm.ts`

## Authentication & Identity

**Auth Provider:**
- Custom implementation (not integrated with external provider)
- Login page: `src/pages/login/ui/LoginPage.tsx`
- Register page: `src/pages/register/ui/RegisterPage.tsx`
- No OAuth2, JWT validation, or third-party auth detected

**Wallet/Account Features:**
- Profile page: `src/pages/profile/ui/ProfilePage.tsx`
- Seed phrase page: `src/pages/seed-phrase/ui/SeedPhrasePage.tsx`
- Implementation not integrated with blockchain wallet libraries

## Monitoring & Observability

**Error Tracking:**
- Not detected - No error tracking service configured

**Logs:**
- Browser console logging only - No structured logging framework

## CI/CD & Deployment

**Hosting:**
- Not specified - Project includes `dist/` output directory for static hosting

**CI Pipeline:**
- Not detected - No GitHub Actions, GitLab CI, or other CI service configured

## Environment Configuration

**Required env vars:**
- `VITE_API_URL` - Backend API endpoint URL
- `VITE_APP_NAME` - Application display name (default: "Elcsa")

**Configuration location:**
- `.env.example` - Template for environment variables
- Runtime access via `import.meta.env.VITE_*` in code

**Secrets location:**
- Secrets should be placed in `.env` file (not committed)
- `.env` listed in `.gitignore`

## Webhooks & Callbacks

**Incoming:**
- Not implemented - No webhook endpoints detected

**Outgoing:**
- Not implemented - No external webhook integrations detected

## Hard-coded Data

**Token Prices & Exchange Rates:**
- Hard-coded in `src/widgets/swap-form/model/useSwapForm.ts`:
  - BTC: $67,412
  - ETH: $3,521
  - SOL: $163.84
  - TRX: $0.12
  - ARB: $0.92
  - USDC/USDT: $1
  - Exchange rate BTC→USDC: 82.2578

**Gas Prices & Constants:**
- Hard-coded in `src/shared/config/constants.ts`:
  - `COUNTDOWN_DAYS = 3`
  - `USDT_RATE = 79.83`
  - `GAS_PRICE = 63.68`

**Token Display Data:**
- Mock token list in `src/widgets/token-table/model/tokens.ts` with static prices, balances, and price changes

---

*Integration audit: 2026-05-03*
