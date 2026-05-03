import { PrimaryButton } from '@shared/ui'
import { TOKENS_LIST, useSwapForm } from '../model/useSwapForm'
import { RateRow } from './RateRow'
import { SwapCard } from './SwapCard'
import { SwapDirectionButton } from './SwapDirectionButton'
import { SwapInfoPanel } from './SwapInfoPanel'
import styles from './SwapForm.module.css'

const RATE = 82.2578

export function SwapForm() {
  const {
    fromAmount, toAmount, fromUsd, toUsd,
    fromToken, toToken,
    isRefreshing,
    setFromAmount, setPercent, swapTokens, refreshRate,
    setFromToken, setToToken,
  } = useSwapForm()

  return (
    <div className={styles.form}>
      <SwapCard
        mode="from"
        token={fromToken}
        tokenOptions={TOKENS_LIST}
        amount={fromAmount}
        usd={fromUsd}
        onAmountChange={setFromAmount}
        onSetPercent={setPercent}
        onTokenChange={setFromToken}
      />

      <SwapDirectionButton onClick={swapTokens} />

      <SwapCard
        mode="to"
        token={toToken}
        tokenOptions={TOKENS_LIST}
        amount={toAmount}
        usd={toUsd}
        slippage="−0.16%"
        onTokenChange={setToToken}
      />

      <RateRow
        fromSymbol={fromToken.symbol}
        toSymbol={toToken.symbol}
        rate={RATE}
        isRefreshing={isRefreshing}
        onRefresh={refreshRate}
      />

      <SwapInfoPanel />

      <PrimaryButton />
    </div>
  )
}
