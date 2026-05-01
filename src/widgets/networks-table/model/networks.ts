export interface Network {
  name: string
  ticker: string
  cls: 'btc' | 'eth' | 'trx' | 'sol' | 'bnb'
  icon: string
  speed: number
  color: string
  fee: string
  confirm: string
}

export const NETWORKS: readonly Network[] = [
  {
    name: 'Bitcoin',
    ticker: 'BTC',
    cls: 'btc',
    icon: '₿',
    speed: 30,
    color: 'rgba(247,147,26,0.8)',
    fee: '~0.0001 BTC',
    confirm: '~10 мин',
  },
  {
    name: 'Ethereum',
    ticker: 'ETH',
    cls: 'eth',
    icon: 'Ξ',
    speed: 60,
    color: 'rgba(98,126,234,0.8)',
    fee: '~2–15 Gwei',
    confirm: '~15 сек',
  },
  {
    name: 'Tron',
    ticker: 'TRX',
    cls: 'trx',
    icon: '◈',
    speed: 90,
    color: 'rgba(255,6,10,0.8)',
    fee: '~1 TRX',
    confirm: '~3 сек',
  },
  {
    name: 'Solana',
    ticker: 'SOL',
    cls: 'sol',
    icon: '◎',
    speed: 98,
    color: 'rgba(153,69,255,0.8)',
    fee: '~0.000005 SOL',
    confirm: '~1 сек',
  },
  {
    name: 'BNB Chain',
    ticker: 'BNB',
    cls: 'bnb',
    icon: '◆',
    speed: 88,
    color: 'rgba(243,186,47,0.8)',
    fee: '~0.0005 BNB',
    confirm: '~3 сек',
  },
] as const
