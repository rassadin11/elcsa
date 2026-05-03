# Codebase Concerns

**Analysis Date:** 2026-05-03

## Tech Debt

**Hardcoded Values and Mock Data:**
- Issue: Critical business values are hardcoded throughout the codebase instead of being loaded from API or configuration
- Files: `src/widgets/swap-form/model/useSwapForm.ts`, `src/shared/config/constants.ts`, `src/widgets/token-table/model/tokens.ts`
- Impact: Exchange rates, gas prices, token data, and conversion rates cannot be updated without code changes. Rates will become stale and incorrect over time, breaking financial calculations
- Fix approach: Migrate to API-driven data fetching. Create API endpoints in `src/shared/api/` for real-time rates and token metadata. Implement periodic refresh of conversion rates using Redux or context providers

**Incomplete API Layer:**
- Issue: `src/shared/api/base.ts` is empty (1 line only) despite being the foundation for API integration
- Files: `src/shared/api/base.ts`, `src/shared/api/types.ts`
- Impact: No API infrastructure exists. Cannot connect to backend or external services. All data operations fail at scale
- Fix approach: Implement Axios base instance with interceptors, error handling, and auth tokens. Create proper API client with typed endpoints. Establish error boundary patterns

**No Authentication Implementation:**
- Issue: Login and Register pages exist but have no real authentication logic or backend integration
- Files: `src/widgets/login-form/ui/LoginForm.tsx`, `src/widgets/register-form/ui/RegisterForm.tsx`, `src/pages/login/`, `src/pages/register/`
- Impact: Forms collect user data but don't authenticate. No session management. User state is not persisted. No access control
- Fix approach: Implement JWT or session-based auth. Create auth context/Redux slice for user state. Add protected routes. Implement logout functionality

**No Error Handling:**
- Issue: Zero try-catch blocks, error boundaries, or error handling patterns across the codebase
- Files: All files in `src/`
- Impact: Network errors, validation failures, and edge cases crash the application silently. Users get no feedback on failures
- Fix approach: Add error boundaries in page components. Implement async try-catch in hooks. Add user-facing error notifications. Create error logging system

**Placeholder Content Everywhere:**
- Issue: ProfilePage displays hardcoded user data instead of loading from user state or API
- Files: `src/pages/profile/ui/ProfilePage.tsx` (shows "Иванов Иван Иванович", fixed balance)
- Impact: Cannot display real user data. Profile is non-functional
- Fix approach: Connect to user profile API. Load data into Redux store on login. Implement edit functionality

## Known Bugs

**Form State Not Persisted:**
- Symptoms: Form values reset on page navigation or refresh. Login/Register form input lost
- Files: `src/widgets/login-form/ui/LoginForm.tsx`, `src/widgets/register-form/ui/RegisterForm.tsx`
- Trigger: User fills form, navigates away, comes back
- Workaround: Use form libraries (React Hook Form, Formik) or localStorage for draft persistence

**TokenTable and SwapForm Key Prop Issue:**
- Symptoms: Potential list re-renders on array reordering due to index-based keys
- Files: `src/widgets/token-table/ui/TokenTable.tsx` (line 35: `key={t.ticker}`), `src/widgets/swap-form/ui/SwapForm.tsx`
- Trigger: If token order changes in TOKENS array or TOKENS_LIST changes
- Workaround: Already using ticker as key (acceptable) but ensure TOKENS never reorder unexpectedly

**Rate Display Doesn't Update:**
- Symptoms: User sees "RATE = 82.2578" hardcoded in SwapForm, doesn't update in real time
- Files: `src/widgets/swap-form/ui/SwapForm.tsx` (line 9)
- Trigger: Exchange rate changes in market
- Workaround: Manual "refresh" button exists (line 50) but only simulates with 400ms timeout

**Modal/Hidden Content Accessibility:**
- Symptoms: SeedPhraseWidget hides content (••••• display) but uses simple span elements, not proper hidden attributes
- Files: `src/widgets/seed-phrase/ui/SeedPhraseWidget.tsx` (line 41)
- Trigger: When `hidden` state is true
- Workaround: Add `aria-hidden="true"` or use proper visibility attributes

## Security Considerations

**Seed Phrase Display Without Confirmation:**
- Risk: User can view and copy entire seed phrase without re-authentication or confirmation dialog
- Files: `src/widgets/seed-phrase/ui/SeedPhraseWidget.tsx`, `src/pages/profile/ui/ProfilePage.tsx` (line 57: "⚠ Показать мнемонику")
- Current mitigation: Auto-hide after countdown, but not triggered on button click—only on initial render
- Recommendations: 
  - Require password confirmation before showing seed phrase
  - Implement timeout timer that resets on ANY interaction
  - Never log or store seed phrase in localStorage
  - Add audit logging for seed phrase views

**Sensitive Data in JSX:**
- Risk: ProfilePage displays sensitive user data (passport number, INN, private key, address) in plain text
- Files: `src/pages/profile/ui/ProfilePage.tsx` (lines 32, 33, 47)
- Current mitigation: Shows hardcoded placeholder values (not real data yet), has lock icons
- Recommendations:
  - Implement field-level encryption for sensitive fields
  - Mask sensitive displays (show only last 4 digits)
  - Require password verification for viewing
  - Log all sensitive field accesses

**Email/Password Form Submission Without HTTPS:**
- Risk: Login/Register forms submit credentials without HTTPS enforcement or CSRF tokens
- Files: `src/widgets/login-form/ui/LoginForm.tsx`, `src/widgets/register-form/ui/RegisterForm.tsx`
- Current mitigation: None visible
- Recommendations:
  - Enforce HTTPS-only in production
  - Add CSRF token to forms
  - Implement Content Security Policy headers
  - Use httpOnly cookies for session tokens (not localStorage)

**No Input Validation:**
- Risk: FormField component accepts any input without validation. Currency converter accepts user input without sanitization
- Files: `src/shared/ui/FormField/FormField.tsx`, `src/widgets/currency-converter/ui/Converter.tsx` (line 56)
- Current mitigation: Some basic regex replacement (line 33: `replace(/[^0-9.]/g, '')`) in converter only
- Recommendations:
  - Add schema validation using Zod (already installed but unused)
  - Validate on blur and submit
  - Sanitize all user input
  - Implement rate limiting on API calls

**Copy-to-Clipboard Without User Intent:**
- Risk: FormField auto-copies to clipboard on click, could be triggered accidentally or by scripts
- Files: `src/shared/ui/FormField/FormField.tsx` (lines 23-27)
- Current mitigation: Requires readOnly field + user click
- Recommendations:
  - Add confirmation dialog for sensitive data copies
  - Log clipboard events for audit trail
  - Limit copy frequency to prevent DOS

## Performance Bottlenecks

**Token Icons and Logos:**
- Problem: Token logos are imported as static assets but rendered in list (TokenTable) and swap forms. No image optimization or lazy loading
- Files: `src/widgets/swap-form/model/useSwapForm.ts` (lines 2-6: svg imports), `src/widgets/token-table/ui/TokenTable.tsx` (line 49)
- Cause: All token images loaded upfront, no code splitting or lazy loading
- Improvement path: Use dynamic imports for token logos. Implement image lazy loading with Intersection Observer. Consider using CSS background images with data URIs for small icons

**No Memoization in TokenTable:**
- Problem: TokenTable re-renders entire table when ANY state changes. Token rows have no memo optimization
- Files: `src/widgets/token-table/ui/TokenTable.tsx` (lines 34-78)
- Cause: No React.memo() on row components. useState for favorites causes full table re-render on toggle
- Improvement path: Extract TokenRow as separate memoized component. Move favorites state to Redux or Context. Use useCallback for handlers

**Converter and Swap Form Calculations:**
- Problem: useConverter and useSwapForm perform calculations on every render via useMemo but strings are converted to numbers repeatedly
- Files: `src/widgets/currency-converter/model/useConverter.ts` (lines 15, 22), `src/widgets/swap-form/model/useSwapForm.ts` (lines 38-41)
- Cause: Multiple parseFloat() and toFixed() calls per render
- Improvement path: Memoize parsed values. Cache calculation results. Consider BigInt for precise financial calculations

**No Virtual Scrolling:**
- Problem: If token list grows beyond current TOKENS array (7 tokens), entire list renders even if not visible
- Files: `src/widgets/token-table/ui/TokenTable.tsx`
- Cause: Simple map() without virtualization
- Improvement path: Implement react-window or tanstack/react-virtual for large lists

## Fragile Areas

**Currency Converter Tier Logic:**
- Files: `src/widgets/currency-converter/model/tiers.ts`, `src/widgets/currency-converter/model/useConverter.ts` (lines 17-29)
- Why fragile: Tier-based commission calculation depends on findTier() function returning correct objects. If tier boundaries change, calculations break silently. No validation that tier.pct is a valid percentage
- Safe modification: Add unit tests for all tier boundaries. Validate tier.pct is between 0-100. Add type guards
- Test coverage: No test files found for tiers or converter logic

**TokenTable Favorites State:**
- Files: `src/widgets/token-table/ui/TokenTable.tsx` (lines 6, 8-10)
- Why fragile: Favorites array initialized from TOKENS.map((t) => t.fav). If TOKENS changes order or count, array indices become misaligned. No persistence of favorites
- Safe modification: Use token ticker as key, not index. Persist favorites in localStorage or Redux. Add validation that array length matches TOKENS length
- Test coverage: No tests for toggle functionality

**Seed Phrase Widget Countdown:**
- Files: `src/widgets/seed-phrase/ui/SeedPhraseWidget.tsx` (lines 10, 32-33)
- Why fragile: countdown value comes from useSeedPhrase hook but is unclear what happens if countdown never completes. No cleanup if component unmounts during countdown
- Safe modification: Add useEffect cleanup. Validate countdown >= 0. Add tests for timer behavior
- Test coverage: No tests for countdown logic

**SwapForm Token Swap Logic:**
- Files: `src/widgets/swap-form/model/useSwapForm.ts` (lines 51-53)
- Why fragile: swapTokens() just swaps references. If RATE is fixed globally, swapped direction might not recalculate properly. No validation that fromToken !== toToken
- Safe modification: Validate tokens are different. Recalculate rate based on swapped direction. Add test for swap state consistency
- Test coverage: No swap tests

## Scaling Limits

**Hardcoded RATE Constant:**
- Current capacity: Works for 7 tokens with fixed 82.2578 rate
- Limit: Cannot scale to multiple currency pairs or dynamic rates
- Scaling path: Move to API-driven exchange rate service (Coingecko, Kraken API, etc.). Implement rate caching with TTL. Use Redux for rate state management

**Token Array Growth:**
- Current capacity: 7 tokens in TOKENS constant
- Limit: Adding tokens requires code change and rebuild. Not database-driven
- Scaling path: Move TOKENS to API endpoint. Implement pagination for token lists. Add token search/filter

**Static Constants for Business Logic:**
- Current capacity: USDT_RATE, GAS_PRICE hardcoded for single region/market
- Limit: No multi-market or dynamic pricing support
- Scaling path: Create backend configuration service. Store in database. Implement feature flags for different markets

## Dependencies at Risk

**Redux Unused:**
- Risk: @reduxjs/toolkit and react-redux are installed (package.json lines 13-14) but NOT used anywhere in codebase
- Impact: Dead dependency increases bundle size. Maintenance burden. Confuses developers
- Migration plan: Either remove if not needed, or migrate state management to Redux (recommended for auth, user data, rates)

**Axios Installed but Unused:**
- Risk: axios ^1.7.9 installed but no API calls made anywhere
- Impact: Dead dependency. Package manager won't update it
- Migration plan: Use for API client in `src/shared/api/base.ts`. Implement interceptors for auth and error handling

**No Testing Framework:**
- Risk: No test runner installed (Jest, Vitest, Playwright). Cannot write or run tests
- Impact: No ability to verify fixes or prevent regressions
- Migration plan: Install Vitest (recommended for Vite). Add test files alongside components. Target 80%+ coverage

## Missing Critical Features

**No Backend Integration:**
- Problem: App is frontend-only. No API endpoints for authentication, data fetching, or persistence
- Blocks: Cannot authenticate users. Cannot save user data. Cannot fetch real exchange rates
- Expected dependencies: Backend API service with endpoints for auth, user profile, rates, transactions

**No Data Persistence:**
- Problem: All data is lost on page refresh. No localStorage, no state management
- Blocks: Users cannot log in. Wallet data not saved. Form data not preserved
- Expected dependencies: Redux store, localStorage utilities, session management

**No Error Boundaries:**
- Problem: No error boundary components. Entire app crashes on component error
- Blocks: User experience degrades with any error. No error recovery
- Expected dependencies: React error boundaries in layout, error page component

**No Loading States:**
- Problem: No loading indicators for async operations. No isLoading flags in hooks
- Blocks: Users don't know if app is working or frozen
- Expected dependencies: Loading states in Redux, global loading context, skeleton screens

**No Environment Configuration:**
- Problem: `src/shared/config/env.ts` is empty (1 line). Hardcoded values everywhere
- Blocks: Cannot change API endpoint for different environments (dev, staging, prod)
- Expected dependencies: .env file support via Vite, environment validation with Zod

## Test Coverage Gaps

**No Tests Exist:**
- What's not tested: Entire codebase has zero test files (.test.ts, .spec.ts)
- Files: All files in `src/`
- Risk: Changes break functionality silently. No regression detection. Cannot refactor safely
- Priority: High - Must add unit tests for all hooks and components before major refactoring

**Token Selection Logic Untested:**
- What's not tested: useSwapForm token swap, setFromToken, setToToken, TOKENS_LIST filtering
- Files: `src/widgets/swap-form/model/useSwapForm.ts`
- Risk: Token selection could silently fail or display wrong token
- Priority: High - Critical business logic

**Currency Conversion Untested:**
- What's not tested: useConverter calculations, commission logic, tier-based rates
- Files: `src/widgets/currency-converter/model/useConverter.ts`, `src/widgets/currency-converter/model/tiers.ts`
- Risk: Financial calculations could be incorrect. Users charged wrong amounts
- Priority: Critical - Financial calculations must be verified

**Form Validation Untested:**
- What's not tested: FormField input handling, password toggle, copy-to-clipboard
- Files: `src/shared/ui/FormField/FormField.tsx`
- Risk: Form behavior inconsistent. Clipboard issues undetected
- Priority: High - Core UI component

**Timer/Countdown Logic Untested:**
- What's not tested: useCountdown, useSeedPhrase countdown behavior, auto-hide timing
- Files: `src/widgets/hero/lib/useCountdown.ts`, `src/widgets/seed-phrase/model/useSeedPhrase.ts`
- Risk: Timing issues, countdown never completes or completes incorrectly
- Priority: Medium - UI enhancement but affects seed phrase security

---

*Concerns audit: 2026-05-03*
