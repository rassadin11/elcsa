import btc from '@shared/assets/btc.svg'
import eth from '@shared/assets/eth.svg'
import sol from '@shared/assets/sol.svg'
import trx from '@shared/assets/trx.svg'
import arb from '@shared/assets/arb.svg'

export interface Token {
  ticker: string
  name: string
  logo?: string
  color: string
  price: string
  change: number
  bal: string
  usd: string
  fav: boolean
}

export const TOKENS: readonly Token[] = [
  { ticker: 'BTC', name: 'Bitcoin', logo: btc, color: '#F7931A', price: '$66,916.00', change: 0.12, bal: '0.003295', usd: '$220.57', fav: true },
  { ticker: 'ETH', name: 'Ethereum', logo: eth, color: '#627EEA', price: '$2,053.97', change: -0.12, bal: '0.07636', usd: '$156.51', fav: false },
  { ticker: 'SOL', name: 'Solana', logo: sol, color: '#9945FF', price: '$163.84', change: -1.57, bal: '0.07636', usd: '$156.51', fav: false },
  { ticker: 'TRX', name: 'Tron', logo: trx, color: '#FF060A', price: '$0.1197', change: 1.33, bal: '0.07636', usd: '$156.51', fav: false },
  { ticker: 'ARB', name: 'Arbitrum', logo: arb, color: '#4A6DFF', price: '$0.9214', change: 2.56, bal: '0.07636', usd: '$156.51', fav: false },
] as const
