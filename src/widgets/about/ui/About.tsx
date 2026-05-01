import { useState } from 'react'
import { Pill } from '@shared/ui'
import styles from './About.module.css'
import { Title } from '@shared/ui/Title/Title'

const THESES = [
  'Вся деятельность компании соответствует законодательству Российской Федерации и требованиям регуляторов',
  'Вся документация компании открыта и доступна для ознакомления',
  'Операции защищены шифрованием уровня ERC-20 и проходят верификацию в блокчейне',
]

export function About() {
  const [hovered, setHovered] = useState(-1)

  return (
    <section id="about" className={styles.section}>
      <div className={styles.wrap}>
        <div>
          <Pill>О КОМПАНИИ</Pill>
          <Title>О нас</Title>
          <div className={styles.descBlock}>
            <p className={styles.descText}>
              ЭКСА — молодая финтех-компания в сфере цифровых активов. Наша миссия — сделать
              оборот цифровых активов простым, прозрачным и законным.
            </p>
            <p className={styles.descText}>
              Мы создаём инфраструктуру для операций с криптовалютой и комплексные решения для
              физических и юридических лиц.
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.glow} />
          {THESES.map((text, i) => (
            <div
              key={i}
              className={styles.row}
              data-hovered={hovered === i || undefined}
              data-last={i === THESES.length - 1 || undefined}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(-1)}
            >
              <div className={styles.check}>✓</div>
              <span className={styles.text}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
