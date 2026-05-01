import { USDT_RATE } from '@shared/config/constants'
import logo from '@shared/assets/logo-full-white.png'
import styles from './ExchangeCard.module.css'

export function ExchangeCard() {
  return (
    <div className={styles.card}>
      <div className={styles.statusPill}>
        <span className={styles.statusDot} />
        Операция завершена
      </div>

      <div className={styles.flowRow}>
        <div className={styles.curBlock}>
          <div className={`${styles.curIcon} ${styles.rub}`}>₽</div>
          <div className={styles.curAmount}>10 000 ₽</div>
          <div className={styles.curLabel}>Отправлено</div>
        </div>

        <div className={styles.bridge}>
          <div className={styles.bridgeLine}>
            <svg width={48} height={12} viewBox="0 0 48 12" fill="none" aria-hidden="true">
              <line
                x1={0} y1={6} x2={36} y2={6}
                stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 3"
                className={styles.flowLine}
              />
              <path
                d="M34 2l6 4-6 4"
                stroke="currentColor" strokeWidth={1.5}
                strokeLinecap="round" strokeLinejoin="round" fill="none"
              />
            </svg>
          </div>
          <div className={styles.bridgeLabel}>
            <img src={logo} alt="ЭКСА" />
          </div>
          <div className={styles.bridgeLine}>
            <svg width={48} height={12} viewBox="0 0 48 12" fill="none" aria-hidden="true">
              <line
                x1={0} y1={6} x2={36} y2={6}
                stroke="currentColor" strokeWidth={1.5} strokeDasharray="4 3"
                className={styles.flowLine}
              />
              <path
                d="M34 2l6 4-6 4"
                stroke="currentColor" strokeWidth={1.5}
                strokeLinecap="round" strokeLinejoin="round" fill="none"
              />
            </svg>
          </div>
        </div>

        <div className={styles.curBlock}>
          <div className={`${styles.curIcon} ${styles.usdt}`}>₮</div>
          <div className={styles.curAmount}>125.3 USDT</div>
          <div className={styles.curCheck}>
            <svg width={12} height={12} viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 6l3 3 5-5"
                stroke="#26A17B" strokeWidth={1.5}
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
            Зачислено
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.details}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Курс</span>
          <span className={styles.detailValue}>{USDT_RATE.toFixed(2)} ₽ / USDT</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Комиссия</span>
          <span className={`${styles.detailValue} ${styles.green}`}>0%</span>
        </div>
      </div>
    </div>
  )
}
