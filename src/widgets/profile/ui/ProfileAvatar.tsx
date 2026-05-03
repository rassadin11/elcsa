import { Button } from '@shared/ui'
import styles from './ProfileAvatar.module.css'

export function ProfileAvatar() {
  return (
    <div className={styles.col}>
      <div className={styles.avatar}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
        </svg>
        <div className={styles.overlay}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
      </div>
      <div className={styles.addPhoto}>
        <Button variant="ghost">ДОБАВИТЬ ФОТО</Button>
      </div>
      <Button variant="danger">УДАЛИТЬ ФОТО</Button>
    </div>
  )
}
