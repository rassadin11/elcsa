import styles from './AgreementCheckbox.module.css'

interface Props {
  checked: boolean
  onToggle: () => void
}

export function AgreementCheckbox({ checked, onToggle }: Props) {
  return (
    <button
      type="button"
      className={styles.wrap}
      onClick={onToggle}
      aria-pressed={checked}
    >
      <span className={styles.box} data-checked={checked || undefined}>
        <svg width={12} height={12} viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M2 6l3 3 5-5"
            stroke="#fff"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={styles.text}>
        Я ознакомлен и согласен с{' '}
        <a
          href="#"
          className={styles.link}
          onClick={(e) => e.preventDefault()}
        >
          публичной офертой
        </a>
        . Вся деятельность компании соответствует законодательству Российской Федерации.
        <br />
        <span className={styles.required}>ОБЯЗАТЕЛЬНОЕ ПОЛЕ</span>
      </span>
    </button>
  )
}
