import { Button, FormField } from '@shared/ui'
import { WalletHeader } from '@widgets/wallet-header'
import { ProfileAvatar, ProfileSection } from '@widgets/profile'
import styles from './ProfilePage.module.css'

export function ProfilePage() {
  return (
    <div className={styles.page}>
      <WalletHeader />
      <main className={styles.main}>
        <div className={styles.profileTop}>
          <ProfileAvatar />
          <div className={styles.userInfo}>
            <span className={styles.userName}>Иванов Иван Иванович</span>
            <span className={styles.userBalance}>$245.00</span>
            <span className={styles.userBalanceRub}>≈ 22 340,50 ₽</span>
          </div>
        </div>

        <div className={styles.sections}>
          <ProfileSection title="Личные данные">
            <div className={styles.grid2}>
              <FormField label="Полное ФИО" value="Иванов Иван Иванович" placeholder="Например: Иванов Иван Иванович" />
              <FormField label="Адрес электронной почты" value="ivanov@mail.ru" type="email" icon="check" placeholder="example@mail.ru" readOnly />
              <FormField label="Серия и номер паспорта" value="4515 123456" placeholder="4515 123456" readOnly />
              <FormField label="Номер телефона" value="+7 (999) 123-45-67" type="tel" icon="check" placeholder="+7 (999) 000-00-00" readOnly />
            </div>
          </ProfileSection>

          <ProfileSection title="Верификация">
            <div className={styles.grid2}>
              <FormField label="ИНН" value="7712345678" readOnly icon="lock" placeholder="123456789012" />
              <FormField label="ID аккаунта" value="ECSA-00184729" readOnly icon="lock" placeholder="ECSA-00000000" />
            </div>
          </ProfileSection>

          <ProfileSection
            title="Безопасность"
            actions={
              <>
                <Button variant="danger">⚠️ Посмотреть приватный ключ</Button>
                <Button variant="primary">СОХРАНИТЬ</Button>
              </>
            }
          >
            <div className={styles.grid1}>
              <FormField label="Адрес ERC-20" readOnly icon="lock" value="0x1a2B3c4D5e6F7a8B9c0D1e2F3a4B5c6D7e8F9a0b" placeholder="0x0000000000000000000000000000000000000000" />
            </div>
          </ProfileSection>

          <ProfileSection title="Мнемоника">
            <div className={styles.mnemonicRow}>
              <div className={styles.mnemonicInfo}>
                <span className={styles.mnemonicIcon}>🔑</span>
                <span className={styles.mnemonicText}>Сид-фраза из 12 слов для восстановления кошелька</span>
              </div>
              <Button variant="danger">⚠ Показать мнемонику</Button>
            </div>
          </ProfileSection>
        </div>
      </main>
    </div>
  )
}
