import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

const CONTENT = {
  terms: {
    titleKey: 'termsTitle',
    bodyKey: 'termsBody',
  },
  privacy: {
    titleKey: 'privacyTitle',
    bodyKey: 'privacyBody',
  },
}

export default function LegalPage({ type }) {
  const { t } = useLanguage()
  const config = CONTENT[type]

  return (
    <div className="min-h-dvh bg-white px-6 py-10 lg:px-16">
      <div className="mx-auto max-w-2xl">
        <Link to="/login" className="text-sm text-muted hover:text-text">
          ← {t('back')}
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">{t(config.titleKey)}</h1>
        <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-muted">{t(config.bodyKey)}</p>
      </div>
    </div>
  )
}
