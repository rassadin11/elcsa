import { useState } from 'react'
import { TOKENS } from '../model/tokens'
import styles from './TokenTable.module.css'

export function TokenTable() {
  const [favs, setFavs] = useState<boolean[]>(TOKENS.map((t) => t.fav))

  function toggleFav(i: number) {
    setFavs((prev) => prev.map((v, idx) => (idx === i ? !v : v)))
  }

  const sendIcon = (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A6DFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )

  return (
    <>
      <div className={styles.wrap}>
        {/* Desktop table */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thStar}>☆</th>
              <th>Токены</th>
              <th className={styles.right}>Цена</th>
              <th className={styles.right}>Изменение</th>
              <th className={styles.right}>Баланс</th>
              <th className={styles.center}></th>
            </tr>
          </thead>
          <tbody>
            {TOKENS.map((t, i) => (
              <tr key={t.ticker}>
                <td>
                  <button
                    className={`${styles.star} ${favs[i] ? styles.starOn : ''}`}
                    onClick={() => toggleFav(i)}
                    type="button"
                    aria-label={favs[i] ? 'Убрать из избранного' : 'В избранное'}
                  >
                    ★
                  </button>
                </td>
                <td>
                  <div className={styles.tokId}>
                    <div className={styles.tokLogo} style={{ background: t.color }}>
                      {t.logo && <img src={t.logo} alt={t.ticker} className={t.ticker === 'ARB' ? styles.arb : ''} />}
                    </div>
                    <div className={styles.balCol}>
                      <b className={styles.cardTicker}>{t.ticker}</b>
                      <span className={styles.noFont}>{t.name}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.right}>
                  <span className={styles.price}>{t.price}</span>
                </td>
                <td className={styles.right}>
                  <span className={`${styles.change} ${t.change >= 0 ? styles.up : styles.dn}`}>
                    {t.change >= 0 ? '↑' : '↓'} {t.change >= 0 ? '+' : ''}{t.change}%
                  </span>
                </td>
                <td className={styles.right}>
                  <div className={styles.balCol}>
                    <b>{t.bal}</b>
                    <span>{t.usd}</span>
                  </div>
                </td>
                <td className={styles.center}>
                  <button className={styles.sendBtn} type="button" onClick={(e) => e.stopPropagation()}>
                    {sendIcon}
                    Отправить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile card list */}
        <div className={styles.mobileList}>
          {TOKENS.map((t, i) => (
            <div key={t.ticker} className={styles.card}>
              <button
                className={`${styles.star} ${favs[i] ? styles.starOn : ''}`}
                onClick={() => toggleFav(i)}
                type="button"
                aria-label={favs[i] ? 'Убрать из избранного' : 'В избранное'}
              >
                ★
              </button>
              <div className={styles.tokLogo} style={{ background: t.color }}>
                {t.logo
                  ? <img src={t.logo} alt={t.ticker} className={t.ticker === 'ARB' ? styles.arb : ''} />
                  : t.ticker[0]}
              </div>
              <div className={styles.cardInfo}>
                <div className={styles.cardTop}>
                  <div>
                    <span className={styles.cardTicker}>{t.ticker}</span>
                    <span className={styles.cardName}>{t.name}</span>
                  </div>
                  <span className={styles.cardBalCrypto}>{t.bal}</span>
                </div>
                <div className={styles.cardBot}>
                  <span className={styles.cardPrice}>{t.price}</span>
                  <div className={styles.cardBotRight}>
                    <span className={styles.cardBalUsd}>{t.usd}</span>
                    <span className={`${styles.change} ${t.change >= 0 ? styles.up : styles.dn}`}>
                      {t.change >= 0 ? '↑' : '↓'} {Math.abs(t.change)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.mobileActions}>
        <button className={styles.sendBtn} type="button">
          {sendIcon}
          Отправить
        </button>
      </div>
    </>
  )
}
