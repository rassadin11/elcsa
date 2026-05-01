import type { ReactNode } from 'react'
import styles from './Pill.module.css'

interface Props {
  children: ReactNode
}

export function Pill({ children }: Props) {
  return <span className={styles.pill}>{children}</span>
}
