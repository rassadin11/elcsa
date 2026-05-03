import { RegisterForm } from '@widgets/register-form'
import styles from './RegisterPage.module.css'

export function RegisterPage() {
  return (
    <div className={styles.page}>
      <RegisterForm />
    </div>
  )
}
