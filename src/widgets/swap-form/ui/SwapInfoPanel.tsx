import styles from './SwapInfoPanel.module.css'

const ROWS = [
  { label: 'ПРОВАЙДЕР', value: 'ЛУЧШИЙ', link: false },
  { label: 'СКОЛЬЖЕНИЕ', value: 'АВТО (0.5%)', link: true },
  { label: 'СЕТЕВОЙ СБОР', value: '$0.10', link: false },
]

export function SwapInfoPanel() {
  return (
    <div className={styles.panel}>
      {ROWS.map(({ label, value, link }) => (
        <div key={label} className={styles.row}>
          <span className={styles.label}>{label}</span>
          <span className={`${styles.value} ${link ? styles.link : ''}`}>{value}</span>
        </div>
      ))}
    </div>
  )
}
