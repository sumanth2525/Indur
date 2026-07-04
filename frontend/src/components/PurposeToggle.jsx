import { useLanguage } from '../i18n/LanguageContext'

const BROWSE_OPTIONS = [
  { id: 'buy', labelKey: 'buy' },
  { id: 'rent', labelKey: 'forRent' },
  { id: 'sell', labelKey: 'sell' },
]

const POST_OPTIONS = [
  { id: 'sell', labelKey: 'sell' },
  { id: 'rent', labelKey: 'rentLease' },
]

export default function PurposeToggle({ value, onChange, mode = 'browse', onSell, className = '', trailingAction = null }) {
  const { t } = useLanguage()
  const options = mode === 'post' ? POST_OPTIONS : BROWSE_OPTIONS

  const handleClick = (id) => {
    if (mode === 'browse' && id === 'sell' && onSell) {
      onSell()
      return
    }
    onChange(id)
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className="inline-flex min-w-0 flex-1 rounded-full border border-border-strong bg-white p-0.5"
        role="tablist"
        aria-label={t('listingType')}
      >
        {options.map((opt) => {
          const active = value === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => handleClick(opt.id)}
              className={`min-h-11 flex-1 rounded-full px-2 py-2 text-sm font-medium transition-all sm:px-4 ${
                active
                  ? 'bg-text text-white shadow-sm ring-2 ring-accent ring-inset'
                  : 'text-muted hover:bg-surface hover:text-text'
              }`}
            >
              {t(opt.labelKey)}
            </button>
          )
        })}
      </div>
      {trailingAction}
    </div>
  )
}

/** Map browse toggle → listing purpose for filters & API */
export function browsePurposeToListing(purpose) {
  if (purpose === 'rent') return 'rent'
  return 'sell'
}
