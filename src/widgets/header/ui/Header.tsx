import logo from '@shared/assets/logo-full-white.png'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/config/routes'

export function Header() {
  return (
    <nav className={styles.nav}>
      <a className={styles.logo} href="/">
        <img src={logo} alt="ЭКСА" />
      </a>
      <div className={styles.right}>
        <a className={styles.link} href="#about">
          О нас
        </a>
        <Link className={styles.btn} to={ROUTES.WALLET}>
          Личный кабинет
        </Link>
      </div>
    </nav>
  )
}
