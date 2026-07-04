import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import ConsentCheckbox from './ConsentCheckbox'

function AgreementText() {
  const { t } = useLanguage()

  return t('termsConsent')
    .replace('{terms}', '__TERMS__')
    .replace('{privacy}', '__PRIVACY__')
    .split(/(__TERMS__|__PRIVACY__)/)
    .map((part, i) => {
      if (part === '__TERMS__') {
        return (
          <Link
            key={`terms-${i}`}
            to="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-text underline underline-offset-2"
            onClick={(e) => e.stopPropagation()}
          >
            {t('termsLink')}
          </Link>
        )
      }
      if (part === '__PRIVACY__') {
        return (
          <Link
            key={`privacy-${i}`}
            to="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-text underline underline-offset-2"
            onClick={(e) => e.stopPropagation()}
          >
            {t('privacyLink')}
          </Link>
        )
      }
      return part
    })
}

export default function LoginConsents({
  acceptedTerms,
  onTermsChange,
  acceptedFreeProject,
  onFreeProjectChange,
  className = '',
  style,
}) {
  const { t } = useLanguage()

  return (
    <div className={`space-y-3 ${className}`} style={style}>
      <ConsentCheckbox
        id="login-consent-terms"
        checked={acceptedTerms}
        onChange={onTermsChange}
      >
        <AgreementText />
        <span className="sr-only"> ({t('required')})</span>
      </ConsentCheckbox>

      <ConsentCheckbox
        id="login-consent-free-project"
        checked={acceptedFreeProject}
        onChange={onFreeProjectChange}
      >
        {t('freeProjectConsent')}
        <span className="sr-only"> ({t('required')})</span>
      </ConsentCheckbox>
    </div>
  )
}
