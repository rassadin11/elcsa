import { GAS_PRICE, USDT_RATE } from '@shared/config/constants'
import { useConverter } from '../model/useConverter'
import { AgreementCheckbox } from './AgreementCheckbox'
import { CommissionTable } from './CommissionTable'
import styles from './Converter.module.css'
import { Title } from '@shared/ui/Title/Title'

export function Converter() {
  const c = useConverter({ usdtRate: USDT_RATE })

  return (
    <section className={styles.section} id="converter">
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div>
            <Title>Конвертация</Title>
            <div className={styles.subtitle}>Данные обновляются в реальном времени</div>
          </div>
          <div className={styles.pills}>
            <div className={styles.pill}>
              Цена газа в RUB <span className={styles.pillValue}>{GAS_PRICE.toFixed(2)} RUB</span>
            </div>
            <div className={styles.pill}>
              USDT/RUB <span className={styles.pillValue}>{USDT_RATE.toFixed(2)} ₽</span>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <div>
            <div className={styles.tabs}>
              <button
                type="button"
                className={styles.tab}
                data-active={c.mode === 'buy' || undefined}
                onClick={() => c.setMode('buy')}
              >
                КУПИТЬ
              </button>
              <button
                type="button"
                className={styles.tab}
                data-active={c.mode === 'sell' || undefined}
                onClick={() => c.setMode('sell')}
              >
                ПРОДАТЬ
              </button>
            </div>

            <div className={styles.field}>
              <div className={styles.fieldLabel}>Конвертируете</div>
              <div className={styles.fieldInput}>
                <input
                  type="text"
                  value={c.rubVal}
                  onChange={(e) => c.updateRub(e.target.value)}
                  placeholder="0"
                  inputMode="decimal"
                />
                <div className={styles.currency}>
                  <span className={`${styles.currencyIcon} ${styles.currencyRub}`}>₽</span> RUB
                </div>
              </div>
            </div>

            <div className={styles.swapWrap}>
              <button
                type="button"
                className={styles.swapBtn}
                onClick={c.toggleMode}
                aria-label="Поменять направление"
              >
                <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2v12M4 10l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.field}>
              <div className={styles.fieldLabel}>Получаете</div>
              <div className={styles.fieldInput}>
                <input type="text" value={c.usdtVal} readOnly />
                <div className={styles.currency}>
                  <span className={`${styles.currencyIcon} ${styles.currencyUsdt}`}>₮</span> USDT
                </div>
              </div>
            </div>
          </div>

          <CommissionTable
            amount={c.numRub}
            progress={c.progress}
            commission={c.commission}
            effectiveRate={c.effectiveRate}
          />
        </div>

        <div className={styles.bottom}>
          <AgreementCheckbox checked={c.agreed} onToggle={() => c.setAgreed(!c.agreed)} />
        </div>
      </div>
    </section>
  )
}
