import { useEffect, useRef, useState } from 'react'
import { TokenIcon } from '@shared/ui'
import type { Token } from '../model/useSwapForm'
import styles from './TokenSelect.module.css'

interface Props {
  value: Token
  options: Token[]
  onChange: (token: Token) => void
  compact?: boolean
}

export function TokenSelect({ value, options, onChange, compact = false }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function select(token: Token) {
    onChange(token)
    setOpen(false)
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        className={`${styles.trigger} ${compact ? styles.triggerCompact : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <TokenIcon letter={value.letter} color={value.color} logo={value.logo} size={compact ? 24 : 40} />
        <span className={`${styles.name} ${compact ? styles.nameCompact : ''}`}>{value.symbol}</span>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>▾</span>
      </button>

      {open && (
        <div className={styles.dropdownWrapper}>
          <div className={styles.dropdown}>
            {options.map(token => (
              <button
                key={token.symbol}
                className={`${styles.option} ${token.symbol === value.symbol ? styles.optionActive : ''}`}
                onClick={() => select(token)}
              >
                <TokenIcon letter={token.letter} color={token.color} logo={token.logo} size={32} />
                <div className={styles.optionInfo}>
                  <span className={styles.optionSymbol}>{token.symbol}</span>
                  <span className={styles.optionNetwork}>{token.network}</span>
                </div>
                {token.symbol === value.symbol && <span className={styles.check}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
