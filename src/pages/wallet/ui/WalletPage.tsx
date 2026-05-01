import { BalanceCard } from '@widgets/balance-card'
import { TokenTable } from '@widgets/token-table'
import { WalletHeader } from '@widgets/wallet-header'
import styles from './WalletPage.module.css'

export function WalletPage() {
  return (
    <div className={styles.page}>
      <WalletHeader />
      <main className={styles.main}>
        <div className={styles.glow} />
        <BalanceCard />
        <TokenTable />
      </main>
    </div>
  )
}
