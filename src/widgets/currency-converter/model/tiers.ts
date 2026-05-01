export interface Tier {
  min: number
  max: number
  pct: number
}

export const TIERS: readonly Tier[] = [
  { min: 5_000, max: 30_000, pct: 8 },
  { min: 30_000, max: 100_000, pct: 6 },
  { min: 100_000, max: 600_000, pct: 4 },
] as const

export const TIER_MIN = TIERS[0].min
export const TIER_MAX = TIERS[TIERS.length - 1].max

export function findTier(amount: number): Pick<Tier, 'pct'> {
  const match = TIERS.find((t) => amount >= t.min && amount <= t.max)
  if (match) return match
  if (amount > TIER_MAX) return { pct: TIERS[TIERS.length - 1].pct }
  return { pct: TIERS[0].pct }
}

export function progressPercent(amount: number): number {
  if (amount <= TIER_MIN) return 0
  if (amount >= TIER_MAX) return 100
  return ((amount - TIER_MIN) / (TIER_MAX - TIER_MIN)) * 100
}
