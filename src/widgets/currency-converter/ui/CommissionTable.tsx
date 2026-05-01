import { TIERS } from '../model/tiers'
import styles from './CommissionTable.module.css'
import { Tiers } from './Tiers'

interface Props {
  amount: number
  progress: number
  commission: number
  effectiveRate: number
}

export function CommissionTable({ amount, progress, commission, effectiveRate }: Props) {
  return (
    <div>
      <div className={styles.title}>КОМИССИЯ СЕРВИСА</div>
      <div className={styles.table}>
        <Tiers tiers={TIERS} amount={amount} />
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      <div className={styles.summary}>
        <span className={styles.summaryLabel}>Комиссия</span>
        <span className={styles.summaryValue}>
          {commission.toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ₽
        </span>
      </div>
      <div className={styles.summary}>
        <span className={styles.summaryLabel}>Курс с комиссией</span>
        <span className={styles.summaryValue}>{effectiveRate.toFixed(2)} ₽</span>
      </div>
    </div>
  )
}
