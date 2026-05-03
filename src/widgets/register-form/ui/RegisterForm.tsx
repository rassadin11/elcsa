import { useState } from 'react'
import { FormField } from '@shared/ui'
import { PrimaryButton } from '@shared/ui'
import { Button } from '@shared/ui'
import logo from '@shared/assets/logo-full-white.png'
import styles from './RegisterForm.module.css'

export function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState('')

  return (
    <form className={styles.card}>
      <div className={styles.logo}>
        <img src={logo} alt="ЭКСА" />
      </div>
      <h1 className={styles.title}>Создать кошелёк ЭКСА</h1>

      <div className={styles.twoCol}>
        <div className={styles.leftCol}>
          <FormField
            label="Введите адрес электронной почты"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="example@mail.ru"
            required
          />
          <FormField
            label="Придумайте пароль"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            required
          />
          <FormField
            label="Повторите пароль"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="••••••••"
            required
          />
        </div>

        <div className={styles.rightCol}>
          <Button variant="ghost" type="button">
            Получить проверочный код
          </Button>
          <span className={styles.codeHint}>Код не пришёл</span>
          <FormField
            label="Ввести код"
            type="text"
            value={verificationCode}
            onChange={setVerificationCode}
            placeholder="000 000"
            required
          />
        </div>
      </div>

      <div className={styles.submitWrapper}>
        <PrimaryButton label="Создать" />
      </div>

      <p className={styles.legal}>
        Нажимая «Создать», вы принимаете<br />
        <a href="#">Пользовательское соглашение</a> и <a href="#">Политику конфиденциальности</a>
      </p>
    </form>
  )
}
