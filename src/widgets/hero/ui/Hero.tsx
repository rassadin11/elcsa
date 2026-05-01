import { COUNTDOWN_DAYS } from '@shared/config/constants'
import { ConversionFlow } from './ConversionFlow'
import { Countdown } from './Countdown'
import { ExchangeCard } from './ExchangeCard'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.desktop}>
            <ConversionFlow />
          </div>
          <div className={styles.mobile}>
            <ExchangeCard />
          </div>
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>
            Ваш мост
            <span className={styles.reflection} aria-hidden="true">
              Ваш мост
            </span>
            <span className={styles.line2}>
              в мир
              <br />
              цифровых
              <br />
              активов
            </span>
          </h1>
          <div>
            <Countdown days={COUNTDOWN_DAYS} />
            <a href="#converter" className={styles.cta}>
              Попробовать калькулятор
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
