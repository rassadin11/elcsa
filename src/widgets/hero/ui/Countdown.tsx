import { useCountdown } from '../lib/useCountdown'
import styles from './Countdown.module.css'

const UNITS: Array<['d' | 'h' | 'm' | 's', string]> = [
  ['d', 'ДНЕЙ'],
  ['h', 'ЧАСОВ'],
  ['m', 'МИНУТ'],
  ['s', 'СЕКУНД'],
]

interface Props {
  days: number
}

export function Countdown({ days }: Props) {
  const cd = useCountdown(days)

  return (
    <div>
      <div className={styles.label}>ДО ЗАПУСКА ОСТАЛОСЬ</div>
      <div className={styles.row}>
        {UNITS.map(([key, label]) => (
          <div key={key} className={styles.unit}>
            <div className={styles.num}>{cd[key]}</div>
            <div className={styles.lbl}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
