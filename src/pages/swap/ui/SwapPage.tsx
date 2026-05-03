import { useState } from 'react'
import { Footer } from '@widgets/footer'
import { SwapForm } from '@widgets/swap-form'
import { WalletHeader } from '@widgets/wallet-header'
import styles from './SwapPage.module.css'

type Tab = 'swap' | 'bridge'

export function SwapPage() {
  const [tab, setTab] = useState<Tab>('swap')

  return (
    <div className={styles.page}>
      <WalletHeader />

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === 'swap' ? styles.active : styles.inactive}`}
          onClick={() => setTab('swap')}
        >
          СВОП
        </button>
        <button
          className={`${styles.tab} ${tab === 'bridge' ? styles.active : styles.inactive}`}
          onClick={() => setTab('bridge')}
        >
          БРИДЖ
        </button>
      </div>

      <main className={styles.main}>
        <SwapForm />
      </main>

      <Footer />
    </div>
  )
}
