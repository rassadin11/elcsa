import { WalletHeader } from '@widgets/wallet-header'
import { SeedPhraseWidget } from '@widgets/seed-phrase'
import styles from './SeedPhrasePage.module.css'

const MOCK_WORDS = ['egg', 'phone', 'long', 'vibe', 'potato', 'soup', 'skirt', 'black', 'phase', 'word', 'num', 'cucumber']

export function SeedPhrasePage() {
  return (
    <div className={styles.page}>
      <WalletHeader />
      <main className={styles.main}>
        <div className={styles.glow} />
        <SeedPhraseWidget words={MOCK_WORDS} />
      </main>
    </div>
  )
}
