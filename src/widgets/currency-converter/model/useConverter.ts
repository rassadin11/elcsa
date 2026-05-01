import { useMemo, useState } from 'react'
import { findTier, progressPercent } from './tiers'

export type ConverterMode = 'buy' | 'sell'

interface UseConverterArgs {
  usdtRate: number
}

export function useConverter({ usdtRate }: UseConverterArgs) {
  const [mode, setMode] = useState<ConverterMode>('buy')
  const [rubVal, setRubVal] = useState<string>('10000')
  const [agreed, setAgreed] = useState<boolean>(false)

  const numRub = Number.parseFloat(rubVal) || 0

  const result = useMemo(() => {
    const tier = findTier(numRub)
    const commission = (numRub * tier.pct) / 100
    const sign = mode === 'buy' ? 1 : -1
    const effectiveRate = usdtRate * (1 + (sign * tier.pct) / 100)
    const usdtVal = numRub > 0 ? (numRub / effectiveRate).toFixed(2) : '0.00'
    return {
      tierPct: tier.pct,
      commission,
      effectiveRate,
      usdtVal,
      progress: progressPercent(numRub),
    }
  }, [numRub, mode, usdtRate])

  function updateRub(raw: string) {
    setRubVal(raw.replace(/[^0-9.]/g, ''))
  }

  function toggleMode() {
    setMode((m) => (m === 'buy' ? 'sell' : 'buy'))
  }

  return {
    mode,
    setMode,
    rubVal,
    updateRub,
    numRub,
    agreed,
    setAgreed,
    toggleMode,
    ...result,
  }
}
