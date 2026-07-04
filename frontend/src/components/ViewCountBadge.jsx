import Icon from './Icon'
import { useLanguage } from '../i18n/LanguageContext'

export default function ViewCountBadge({ count = 0, className = '' }) {
  const { t } = useLanguage()
  const views = Number(count) || 0

  return (
    <div
      className={`flex shrink-0 flex-col items-center justify-center rounded-lg border border-border-strong bg-white px-2.5 py-1.5 text-muted ${className}`}
      aria-label={`${views} ${t('views')}`}
    >
      <Icon name="keyboard_arrow_up" size={16} />
      <span className="text-xs font-medium tabular-nums leading-none mt-0.5">{views}</span>
    </div>
  )
}
