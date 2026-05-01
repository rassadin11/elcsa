import { useEffect, useState } from 'react'

const STORAGE_KEY = 'eksa_countdown_target'

export interface CountdownValue {
  d: string
  h: string
  m: string
  s: string
}

export function useCountdown(days: number): CountdownValue {
  const [target] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return Number.parseInt(saved, 10)
    const t = Date.now() + days * 86_400_000
    localStorage.setItem(STORAGE_KEY, String(t))
    return t
  })

  const [now, setNow] = useState<number>(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, target - now)
  const pad = (n: number) => String(n).padStart(2, '0')

  return {
    d: pad(Math.floor(diff / 86_400_000)),
    h: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
    m: pad(Math.floor((diff % 3_600_000) / 60_000)),
    s: pad(Math.floor((diff % 60_000) / 1000)),
  }
}
