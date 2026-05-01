import logo from '@shared/assets/logo-full-white.png'
import styles from './ConversionFlow.module.css'

export function ConversionFlow() {
  return (
    <div className={styles.flow}>
      <div className={`${styles.ghost} ${styles.ghostBtc}`}>
        <span style={{ fontSize: 20, color: '#F7931A' }}>₿</span>
      </div>
      <div className={`${styles.ghost} ${styles.ghostEth}`}>
        <span style={{ fontSize: 20, color: '#627EEA' }}>Ξ</span>
      </div>

      <div className={`${styles.card} ${styles.cardRub}`}>
        <div className={`${styles.logoCircle} ${styles.logoRub}`}>₽</div>
        <div className={`${styles.badge} ${styles.badgeRub}`}>10 000 ₽</div>
      </div>

      <div className={`${styles.card} ${styles.cardEksa}`}>
        <img src={logo} alt="ЭКСА" className={styles.eksaLogo} />
      </div>

      <div className={`${styles.card} ${styles.cardUsdt}`}>
        <div className={`${styles.logoCircle} ${styles.logoUsdt}`}>₮</div>
        <div className={`${styles.badge} ${styles.badgeUsdt}`}>≈ 125.3 USDT</div>
        <div className={styles.status}>
          <span className={styles.statusDot} /> ✓ Зачислено
        </div>
      </div>

      <svg
        className={styles.path}
        viewBox="0 0 420 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="#26A17B" />
          </linearGradient>
        </defs>
        <path
          d="M60 68 C100 160, 250 140, 210 230 C170 310, 300 320, 350 360"
          stroke="url(#pathGrad)"
          strokeWidth={2}
          strokeDasharray="8 6"
          fill="none"
        />
        <path
          d="M60 68 C100 160, 250 140, 210 230 C170 310, 300 320, 350 360"
          stroke="url(#pathGrad)"
          strokeWidth={8}
          strokeDasharray="8 6"
          opacity={0.08}
          fill="none"
        />
        <circle cx={80} cy={110} r={3} fill="#fff" opacity={0.5} />
        <circle cx={140} cy={160} r={2.5} fill="#fff" opacity={0.4} />
        <circle cx={220} cy={200} r={3} fill="#fff" opacity={0.3} />
        <circle cx={200} cy={270} r={2.5} fill="#26A17B" opacity={0.35} />
        <circle cx={260} cy={310} r={3} fill="#26A17B" opacity={0.25} />
        <circle cx={320} cy={345} r={2} fill="#26A17B" opacity={0.2} />
      </svg>
    </div>
  )
}
