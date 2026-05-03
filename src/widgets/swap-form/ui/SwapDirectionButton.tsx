import { useState } from 'react'
import styles from './SwapDirectionButton.module.css'

interface Props {
  onClick: () => void
}

export function SwapDirectionButton({ onClick }: Props) {
  const [rotated, setRotated] = useState(false)

  function handle() {
    setRotated(true)
    setTimeout(() => setRotated(false), 300)
    onClick()
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.line} />
      <button
        className={styles.circle}
        style={{ transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)' }}
        onClick={handle}
        aria-label="Поменять токены"
      >
        ⇅
      </button>
    </div>
  )
}
