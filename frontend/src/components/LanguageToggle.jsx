import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageToggle({ className = '' }) {
  const { t, toggleLanguage } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`inline-flex min-w-[5.5rem] items-center justify-center rounded-full border border-border bg-white px-3 py-1.5 text-sm font-semibold text-text hover:bg-surface transition-colors ${className}`}
      aria-label="Toggle language"
    >
      {t('language')}
    </button>
  )
}
