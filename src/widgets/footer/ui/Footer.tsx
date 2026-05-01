import instagram from '@shared/assets/instagram.svg'
import telegram from '@shared/assets/telegram.svg'
import whatsapp from '@shared/assets/whatsapp.svg'
import styles from './Footer.module.css'

const SOCIALS = [
  { href: '#', icon: telegram, label: 'Telegram' },
  { href: '#', icon: whatsapp, label: 'WhatsApp' },
  { href: '#', icon: instagram, label: 'Instagram' },
]

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.col}>
          <p className={styles.companyName}>ООО «ЭКСА»</p>
          <p>ИНН 9810001062</p>
          <p>ОГРН 1257800060990</p>
        </div>
        <div className={styles.col}>
          <h4 className={styles.heading}>О компании</h4>
          <a href="#">Документы</a>
          <a href="#">Публичная оферта</a>
          <a href="#">Реквизиты</a>
        </div>
        <div className={styles.col}>
          <p className={styles.phone}>+7 (812) 123-33-23</p>
          <h4 className={styles.heading}>Адрес</h4>
          <p>196158, г. Санкт-Петербург, Московское шоссе, 25А, к.1, ПОМЕЩ. 3-Н</p>
          <a href="mailto:company@elcsa.ru" className={styles.email}>
            company@elcsa.ru
          </a>
        </div>
        <div className={styles.col}>
          <h4 className={styles.heading}>Мы в соцсетях</h4>
          <div className={styles.socialIcons}>
            {SOCIALS.map(({ href, icon, label }) => (
              <a key={label} href={href} className={styles.socialLink} aria-label={label}>
                <img src={icon} alt={label} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.bottom}>
        <p>© 2026. Все права защищены.</p>
        <p>Компания не является кредитной организацией.</p>
      </div>
    </footer>
  )
}
