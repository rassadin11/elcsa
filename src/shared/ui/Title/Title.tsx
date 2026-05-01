import type { ReactNode } from 'react'
import styles from './Title.module.css'

interface Props {

    children: ReactNode
}

export function Title({ children }: Props) {
    return <h2 className={styles.title}>{children}</h2>
}
