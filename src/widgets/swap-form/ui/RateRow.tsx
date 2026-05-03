import styles from './RateRow.module.css'

interface Props {
  fromSymbol: string
  toSymbol: string
  rate: number
  isRefreshing: boolean
  onRefresh: () => void
}

export function RateRow({ fromSymbol, toSymbol, rate, isRefreshing, onRefresh }: Props) {
  return (
    <div className={styles.row}>
      <span>1 {fromSymbol} = {rate.toFixed(4)} {toSymbol}</span>
      <button
        className={styles.refresh}
        style={{ transform: isRefreshing ? 'rotate(360deg)' : 'rotate(0deg)' }}
        onClick={onRefresh}
        aria-label="Обновить курс"
      >
        ⟳
      </button>
    </div>
  )
}
