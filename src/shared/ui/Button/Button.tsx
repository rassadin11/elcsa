import styles from './Button.module.css'

interface Props {
  variant: 'primary' | 'danger' | 'ghost' | 'outline'
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
}

export function Button({ variant, children, onClick, type = 'button' }: Props) {
  return (
    <button type={type} className={`${styles.btn} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  )
}
