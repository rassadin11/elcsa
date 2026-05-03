import logo from '@shared/assets/logo-full-white.png'
import styles from './WalletHeader.module.css'
import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/config/routes'

const TICKERS = [
  { symbol: 'BTC', price: '$66,916.00', change: 0.12, },
  { symbol: 'ETH', price: '$2,053.97', change: -0.12 },
  { symbol: 'SOL', price: '$163.84', change: -1.57 },
]

export function WalletHeader() {
  return (
    <nav className={styles.nav}>
      <a href="/" className={styles.logo}>
        <img src={logo} alt="ЭКСА" />
      </a>
      <div className={styles.ticker}>
        {TICKERS.map(({ symbol, price, change }) => (
          <div key={symbol} className={styles.tick}>
            <b>{symbol}</b>
            <span>{price}</span>
            <span className={change >= 0 ? styles.up : styles.dn}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
          </div>
        ))}
      </div>
      <Link to={ROUTES.PROFILE} className={styles.account}>
        <div className={styles.avatar} />
        <span>Test account</span>
      </Link>
    </nav>
  )
}
