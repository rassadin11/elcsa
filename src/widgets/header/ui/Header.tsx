import logo from '@shared/assets/logo-full-white.png'
import styles from './Header.module.css'

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
        <button className={styles.btn} type="button">
          Личный кабинет
        </button>
      </div>
    </nav>
  )
}
