import { useState } from 'react'
import styles from './FormField.module.css'

interface Props {
  label: string
  value: string
  placeholder?: string
  type?: 'text' | 'email' | 'tel' | 'password'
  onChange?: (value: string) => void
  readOnly?: boolean
  required?: boolean
  icon?: 'check' | 'lock'
}

export function FormField({ label, value, placeholder, type = 'text', onChange, readOnly, required, icon }: Props) {
  const [copied, setCopied] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword ? (isVisible ? 'text' : 'password') : type

  const handleClick = () => {
    if (!readOnly) return
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={styles.wrap} onClick={handleClick}>
        <input
          className={`${styles.input} ${isPassword ? styles.withToggle : ''} ${readOnly ? styles.readonly : ''} ${copied ? styles.copied : ''}`}
          type={inputType}
          {...(onChange
            ? { value, onChange: (e) => onChange(e.target.value) }
            : { defaultValue: value }
          )}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.togglePw}
            onClick={(e) => { e.stopPropagation(); setIsVisible((v) => !v) }}
            aria-label={isVisible ? 'Скрыть пароль' : 'Показать пароль'}
          >
            {isVisible ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" /><circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
        {icon === 'check' && <span className={styles.iconCheck}>✓</span>}
        {icon === 'lock' && <span className={styles.iconLock}>🔒</span>}
      </div>
    </div>
  )
}
