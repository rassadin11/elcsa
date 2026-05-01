import { TIERS } from "../model/tiers"
import styles from './CommissionTable.module.css'

const ru = (n: number) => n.toLocaleString('ru-RU')

type TiersProps = {
    tiers: typeof TIERS
    amount: number
}

export const Tiers = ({ tiers, amount }: TiersProps) => {
    return (
        <>
            {tiers.map((tier, i) => {
                const active = amount >= tier.min && amount <= tier.max
                return (
                    <div key={i} className={styles.row} data-active={active || undefined}>
                        <span className={styles.range}>
                            {ru(tier.min)} – {ru(tier.max)} ₽
                        </span>
                        <span className={styles.pct}>{tier.pct}%</span>
                    </div>
                )
            })}
        </>
    )
}