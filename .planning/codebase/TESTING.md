# Testing Patterns

**Analysis Date:** 2026-05-03

## Test Framework

**Runner:**
- Not detected - no test framework installed or configured
- No Jest, Vitest, or other test runner in `package.json`

**Assertion Library:**
- Not applicable - no testing infrastructure present

**Run Commands:**
- No test commands defined in `package.json`
- Current scripts: `dev`, `build`, `preview`, `lint`
- Testing not integrated into development workflow

## Test File Organization

**Location:**
- No test files found in codebase
- No `.test.`, `.spec.`, or `__tests__` directories
- All files are focused on implementation only

**Naming:**
- No test naming conventions established

**Structure:**
- Not applicable

## Test Structure

**Suite Organization:**
- Not applicable - no tests present

**Patterns:**
- No setup or teardown patterns in use
- No assertions established
- No test suite structure

## Mocking

**Framework:**
- Not implemented

**Patterns:**
- No mocking utilities present

**What to Mock:**
- Not established

**What NOT to Mock:**
- Not established

## Fixtures and Factories

**Test Data:**
- Not implemented

**Location:**
- Not applicable

## Coverage

**Requirements:** 
- No coverage requirements enforced
- No coverage tools configured

**View Coverage:**
- Not applicable

## Test Types

**Unit Tests:**
- Not implemented
- Recommended scope: individual hooks like `useCountdown()`, `useConverter()`, `useSwapForm()`
- Recommended approach: test calculation logic in model files (e.g., `findTier()`, `progressPercent()`)

**Integration Tests:**
- Not implemented
- Recommended scope: form components with state management (e.g., `LoginForm`, `SwapForm`, `Converter`)

**E2E Tests:**
- Not implemented
- Not configured

## Current Testing Status

**Gap Analysis:**

No testing framework or infrastructure is present. The codebase would benefit from test setup covering:

1. **Hooks/Model Logic (High Priority):**
   - `useCountdown()` - localStorage handling, interval cleanup, countdown calculations
   - `useConverter()` - tier selection, commission calculation, mode toggling
   - `useSwapForm()` - token swapping, amount calculations, state management
   - Utility functions: `findTier()`, `progressPercent()`

2. **Components (Medium Priority):**
   - Form components: `LoginForm`, `RegisterForm`, `SwapForm`, `Converter`
   - Input handling: `FormField` (password visibility toggle, clipboard copy)
   - Selection/dropdown: `TokenSelect` (click outside detection, selection)
   - Layout components: `Header`, `Footer`, `NetworksTable`

3. **State and Edge Cases:**
   - Input validation (numeric-only in converters)
   - Empty/null state handling
   - LocalStorage persistence
   - Async state transitions

## Recommended Setup

**For Future Test Implementation:**

1. **Install Testing Framework:**
   ```bash
   npm install --save-dev vitest @testing-library/react @testing-library/user-event
   ```

2. **Test File Locations (co-located):**
   - `src/widgets/hero/lib/useCountdown.test.ts`
   - `src/widgets/currency-converter/model/useConverter.test.ts`
   - `src/widgets/swap-form/model/useSwapForm.test.ts`
   - `src/shared/ui/Button/Button.test.tsx`
   - `src/shared/ui/FormField/FormField.test.tsx`

3. **Hook Testing Pattern (recommended):**
   ```typescript
   // Example: useCountdown.test.ts
   import { renderHook, waitFor } from '@testing-library/react'
   import { useCountdown } from './useCountdown'

   describe('useCountdown', () => {
     beforeEach(() => {
       localStorage.clear()
       vi.useFakeTimers()
     })

     afterEach(() => {
       vi.restoreAllMocks()
     })

     it('should initialize countdown from localStorage or create new target', () => {
       const { result } = renderHook(() => useCountdown(3))
       expect(result.current).toHaveProperty('d')
       expect(result.current).toHaveProperty('h')
       expect(result.current).toHaveProperty('m')
       expect(result.current).toHaveProperty('s')
     })

     it('should update countdown on interval', async () => {
       const { result } = renderHook(() => useCountdown(3))
       const initial = result.current
       vi.advanceTimersByTime(1000)
       await waitFor(() => {
         expect(result.current.s).not.toBe(initial.s)
       })
     })

     it('should cleanup interval on unmount', () => {
       const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
       const { unmount } = renderHook(() => useCountdown(3))
       unmount()
       expect(clearIntervalSpy).toHaveBeenCalled()
     })
   })
   ```

4. **Component Testing Pattern (recommended):**
   ```typescript
   // Example: FormField.test.tsx
   import { render, screen, userEvent } from '@testing-library/react'
   import { FormField } from './FormField'

   describe('FormField', () => {
     it('should render label and input', () => {
       render(<FormField label="Email" value="" />)
       expect(screen.getByText('Email')).toBeInTheDocument()
       expect(screen.getByRole('textbox')).toBeInTheDocument()
     })

     it('should toggle password visibility', async () => {
       const user = userEvent.setup()
       const { rerender } = render(
         <FormField label="Password" value="test" type="password" />
       )
       const input = screen.getByRole('textbox')
       expect(input).toHaveAttribute('type', 'password')
       
       await user.click(screen.getByLabelText('Показать пароль'))
       rerender(<FormField label="Password" value="test" type="password" />)
       // Would need state management to fully test
     })

     it('should copy to clipboard on read-only field click', async () => {
       const user = userEvent.setup()
       const clipboard = vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue({
         writeText: vi.fn(() => Promise.resolve()),
       })
       
       render(<FormField label="Address" value="0x123" readOnly />)
       await user.click(screen.getByRole('textbox'))
       
       expect(clipboard().writeText).toHaveBeenCalledWith('0x123')
     })
   })
   ```

5. **Config File (`vitest.config.ts`):**
   ```typescript
   import { defineConfig } from 'vitest/config'
   import react from '@vitejs/plugin-react'
   import tsconfigPaths from 'vite-tsconfig-paths'

   export default defineConfig({
     plugins: [react(), tsconfigPaths()],
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: [],
       coverage: {
         provider: 'v8',
         reporter: ['text', 'json', 'html'],
         exclude: ['node_modules/', 'dist/'],
       },
     },
   })
   ```

---

*Testing analysis: 2026-05-03*
