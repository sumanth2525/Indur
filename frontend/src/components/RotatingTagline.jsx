import useRotatingTagline from '../hooks/useRotatingTagline'
import { useLanguage } from '../i18n/LanguageContext'

export default function RotatingTagline({ className = '', as: Tag = 'span' }) {
  const { t } = useLanguage()
  const slide = useRotatingTagline()

  const text = t('findTypeInArea')
    .replace('{type}', t(slide.typeKey))
    .replace('{area}', slide.area)

  return (
    <Tag className={className} aria-live="polite">
      {text}
    </Tag>
  )
}
