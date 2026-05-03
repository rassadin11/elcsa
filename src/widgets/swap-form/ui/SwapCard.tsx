import type { Token } from '../model/useSwapForm'
import { TokenSelect } from './TokenSelect'
import styles from './SwapCard.module.css'

interface Props {
  mode: 'from' | 'to'
  token: Token
  tokenOptions: Token[]
  amount: string
  usd: string
  slippage?: string
  onTokenChange: (token: Token) => void
  onAmountChange?: (v: string) => void
  onSetPercent?: (p: number) => void
}

const PERCENTS = [25, 50, 100]

export function SwapCard({
  mode, token, tokenOptions, amount, usd, slippage,
  onTokenChange, onAmountChange, onSetPercent,
}: Props) {
  const [intPart, decPart] = amount.split('.')

  const pills = onSetPercent && (
    <>
      {PERCENTS.map(p => (
        <button key={p} className={styles.pill} onClick={() => onSetPercent(p)}>
          {p}%
        </button>
      ))}
    </>
  )

  return (
    <div className={styles.wrapper}>
      {/* Пиллы над карточкой — только мобайл */}
      {mode === 'from' && pills && (
        <div className={styles.pillsOuter}>{pills}</div>
      )}

      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.label}>
            <span className={styles.tag}>{mode === 'from' ? 'ОТ' : 'К'}</span>
            <span className={styles.network}>{token.network}</span>
          </div>

          {/* Пиллы внутри карточки — только десктоп */}
          {mode === 'from' && pills && (
            <div className={styles.pillsInner}>{pills}</div>
          )}

          {/* Селект в топ-строке — только мобайл */}
          <div className={styles.selectTop}>
            <TokenSelect value={token} options={tokenOptions} onChange={onTokenChange} compact />
          </div>
        </div>

        <div className={styles.mid}>
          {mode === 'from' ? (
            <input
              className={styles.input}
              type="text"
              value={amount}
              onChange={e => onAmountChange?.(e.target.value)}
              placeholder="0"
            />
          ) : (
            <div className={styles.display}>
              <span className={styles.int}>{intPart}</span>
              <span className={styles.dec}>.{decPart}</span>
            </div>
          )}

          {/* Селект справа от инпута — только десктоп */}
          <div className={styles.selectMid}>
            <TokenSelect value={token} options={tokenOptions} onChange={onTokenChange} />
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.usd}>
            ≈ ${usd}
            {slippage && <span className={styles.neg}> ({slippage})</span>}
          </span>
          <span className={styles.balance}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
              <rect x="2" y="6" width="20" height="14" rx="3" />
              <path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
            </svg>
            {token.balance.toFixed(mode === 'from' ? 3 : 2)}
            {mode === 'from' && onSetPercent && (
              <button className={styles.max} onClick={() => onSetPercent(100)}>МАКС</button>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
