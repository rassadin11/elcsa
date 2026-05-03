import { useState } from 'react'
import btc from '@shared/assets/btc.svg'
import eth from '@shared/assets/eth.svg'
import sol from '@shared/assets/sol.svg'
import trx from '@shared/assets/trx.svg'
import arb from '@shared/assets/arb.svg'

export interface Token {
  symbol: string
  letter: string
  color: string
  logo?: string
  network: string
  balance: number
  usdRate: number
}

const TOKENS: Record<string, Token> = {
  BTC:  { symbol: 'BTC',  letter: '₿', logo: btc, color: '#F7931A', network: 'BITCOIN',   balance: 0,     usdRate: 67412  },
  ETH:  { symbol: 'ETH',  letter: 'E', logo: eth, color: '#627EEA', network: 'ETHEREUM',  balance: 0,     usdRate: 3521   },
  SOL:  { symbol: 'SOL',  letter: 'S', logo: sol, color: '#9945FF', network: 'SOLANA',    balance: 0.994, usdRate: 163.84 },
  TRX:  { symbol: 'TRX',  letter: 'T', logo: trx, color: '#FF060A', network: 'TRON',      balance: 0,     usdRate: 0.12   },
  ARB:  { symbol: 'ARB',  letter: 'A', logo: arb, color: '#4A6DFF', network: 'ARBITRUM',  balance: 0,     usdRate: 0.92   },
  USDC: { symbol: 'USDC', letter: '$', color: '#2775CA', network: 'SOLANA',    balance: 0, usdRate: 1 },
  USDT: { symbol: 'USDT', letter: '$', color: '#26A17B', network: 'ETHEREUM',  balance: 0, usdRate: 1 },
}

export const TOKENS_LIST: Token[] = Object.values(TOKENS)

const RATE = 82.2578

export function useSwapForm() {
  const [fromAmount, setFromAmountRaw] = useState('0.25')
  const [fromToken, setFromToken] = useState<Token>(TOKENS.SOL)
  const [toToken, setToToken] = useState<Token>(TOKENS.USDC)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fromValue = parseFloat(fromAmount) || 0
  const toAmount = (fromValue * RATE).toFixed(4)
  const fromUsd = (fromValue * fromToken.usdRate).toFixed(2)
  const toUsd = (fromValue * RATE * toToken.usdRate).toFixed(2)

  function setFromAmount(v: string) {
    setFromAmountRaw(v)
  }

  function setPercent(p: number) {
    setFromAmountRaw((fromToken.balance * p / 100).toFixed(4))
  }

  function swapTokens() {
    setFromToken(toToken)
    setToToken(fromToken)
  }

  function refreshRate() {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 400)
  }

  return {
    fromAmount, toAmount, fromUsd, toUsd,
    fromToken, toToken,
    isRefreshing,
    setFromAmount, setPercent, swapTokens, refreshRate,
    setFromToken, setToToken,
  }
}
