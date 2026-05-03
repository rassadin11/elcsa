import styles from './ProfileSection.module.css'

interface Props {
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function ProfileSection({ title, children, actions }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      {children}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}
