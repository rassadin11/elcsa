import { useCallback, useEffect, useRef, useState } from 'react'

const INITIAL_COUNTDOWN = 52

export function useSeedPhrase(words: string[]) {
  const [hidden, setHidden] = useState(false)
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN)
  const [copied, setCopied] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startCountdown = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setCountdown(INITIAL_COUNTDOWN)
    intervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          setHidden(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  useEffect(() => {
    startCountdown()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [startCountdown])

  const handleHide = useCallback(() => {
    setHidden(prev => {
      if (prev) {
        startCountdown()
        return false
      }
      if (intervalRef.current) clearInterval(intervalRef.current)
      return true
    })
  }, [startCountdown])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(words.join(' ')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [words])

  return { hidden, countdown, copied, handleHide, handleCopy }
}
