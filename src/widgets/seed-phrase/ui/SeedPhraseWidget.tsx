import { Button } from '@shared/ui'
import { useSeedPhrase } from '../model/useSeedPhrase'
import styles from './SeedPhraseWidget.module.css'

interface Props {
  words: string[]
}

export function SeedPhraseWidget({ words }: Props) {
  const { hidden, countdown, copied, handleHide, handleCopy } = useSeedPhrase(words)

  return (
    <div className={styles.content}>
      <div className={styles.titleRow}>
        <h1 className={styles.title}>СИД ФРАЗА</h1>
        <div className={styles.titleButtons}>
          <div className={styles.btnFixed}>
            <Button variant="outline" onClick={handleHide}>
              {hidden ? 'ПОКАЗАТЬ' : 'СКРЫТЬ'}
            </Button>
          </div>
          <div className={styles.btnFixed}>
            <Button variant="outline" onClick={handleCopy}>
              {copied ? 'СКОПИРОВАНО' : 'КОПИРОВАТЬ'}
            </Button>
          </div>
        </div>
      </div>

      {!hidden && (
        <div className={styles.subtitle}>
          АВТОМАТИЧЕСКОЕ СКРЫТИЕ ЧЕРЕЗ{' '}
          <span className={styles.countdown}>{countdown}</span>С
        </div>
      )}

      <div className={styles.seedGrid}>
        {words.map((word, i) => (
          <div key={i} className={styles.seedCard}>
            <span className={styles.seedNum}>{i + 1}.</span>
            <span className={`${styles.seedWord} ${hidden ? styles.seedWordHidden : ''}`}>
              {hidden ? '•••••' : word}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.warning}>
        <span className={styles.warningIcon}>⚠️</span>
        <p className={styles.warningText}>
          Никогда не передавайте сид-фразу третьим лицам. Тот, кто знает фразу — владеет кошельком.
        </p>
      </div>
    </div>
  )
}
