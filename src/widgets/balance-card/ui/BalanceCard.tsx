import styles from './BalanceCard.module.css'
import topup from '@shared/assets/topup.svg'
import swap from '@shared/assets/swap.svg'

export function BalanceCard() {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.label}>Общий баланс</div>
        <div className={styles.amount}>$245.00</div>
        <div className={styles.rub}>≈ 22 340,50 ₽</div>
      </div>
      <div className={styles.actions}>
        <button className={styles.btn} type="button">
          <img src={swap} alt="swap" />
          Пополнить кошелёк
        </button>
        <button className={styles.btn} type="button">
          <img src={topup} alt="topup" />
          Своп / Бридж
        </button>
      </div>
    </div>
  )
}
