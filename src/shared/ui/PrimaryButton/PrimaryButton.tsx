import styles from './PrimaryButton.module.css'

interface Props {
  label?: string
  onClick?: () => void
}

export function PrimaryButton({ label = 'Подтвердить своп', onClick }: Props) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {label}
    </button>
  )
}
