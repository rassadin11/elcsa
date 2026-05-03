import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField } from '@shared/ui'
import { PrimaryButton } from '@shared/ui'
import { Button } from '@shared/ui'
import { ROUTES } from '@shared/config/routes'
import logo from '@shared/assets/logo-full-white.png'
import styles from './LoginForm.module.css'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  return (
    <form className={styles.card}>
      <div className={styles.logo}>
        <img src={logo} alt="ЭКСА" />
      </div>
      <h1 className={styles.title}>Войти в кошелёк ЭКСА</h1>

      <div className={styles.fields}>
        <FormField
          label="Адрес электронной почты"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="example@mail.ru"
          required
        />
        <FormField
          label="Пароль"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          required
        />
      </div>

      <a className={styles.forgot}>Забыли пароль?</a>

      <div className={styles.actions}>
        <PrimaryButton label="Войти" />
        <div className={styles.divider}><span>или</span></div>
        <Button variant="outline" onClick={() => navigate(ROUTES.REGISTER)}>
          Создать новый кошелёк
        </Button>
      </div>
    </form>
  )
}
