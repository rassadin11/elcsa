import styles from './TokenIcon.module.css'

interface Props {
  letter: string
  color: string
  logo?: string
  size?: number
}

export function TokenIcon({ letter, color, logo, size = 40 }: Props) {
  return (
    <div
      className={styles.icon}
      style={{ background: logo ? 'transparent' : color, width: size, height: size, fontSize: size * 0.45 }}
    >
      {logo
        ? <img src={logo} alt={letter} style={{ width: size * 0.7, height: size * 0.7 }} />
        : letter
      }
    </div>
  )
}
