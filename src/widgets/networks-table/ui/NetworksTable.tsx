import { NETWORKS } from '../model/networks'
import styles from './NetworksTable.module.css'

export function NetworksTable() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <h2 className={styles.title}>Поддерживаемые сети</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Сеть</th>
                <th>Скорость</th>
                <th>Комиссия</th>
                <th>Подтверждение</th>
              </tr>
            </thead>
            <tbody>
              {NETWORKS.map((n) => (
                <tr key={n.ticker}>
                  <td>
                    <div className={styles.name}>
                      <div className={`${styles.icon} ${styles[`icon_${n.cls}`]}`}>{n.icon}</div>
                      <span className={styles.label}>{n.name}</span>
                      <span className={styles.ticker}>{n.ticker}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.speedBar}>
                      <div
                        className={styles.speedFill}
                        style={{ width: `${n.speed}%`, background: n.color }}
                      />
                    </div>
                  </td>
                  <td>
                    <span className={styles.fee}>{n.fee}</span>
                  </td>
                  <td>
                    <span className={styles.confirm}>{n.confirm}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.footnote}>
          * Комиссии и время подтверждения указаны приблизительно и зависят от загруженности сети
        </div>
      </div>
    </section>
  )
}
