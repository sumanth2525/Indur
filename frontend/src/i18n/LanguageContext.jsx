import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { patchProfile } from '../services/dataApi'
import { translations } from './translations'

const LanguageContext = createContext(null)
const DEFAULT_LANG = 'en'

export function LanguageProvider({ children }) {
  const { user, setUser } = useAuth()
  const [lang, setLang] = useState(DEFAULT_LANG)

  useEffect(() => {
    if (user?.lang === 'en' || user?.lang === 'te') {
      setLang(user.lang)
    } else if (!user) {
      setLang(DEFAULT_LANG)
    }
  }, [user?.id, user?.lang])

  const toggleLanguage = useCallback(async () => {
    const next = lang === 'en' ? 'te' : 'en'
    setLang(next)
    if (!user?.id) return
    try {
      await patchProfile(user.id, { lang: next })
      setUser((prev) => (prev ? { ...prev, lang: next } : prev))
    } catch (err) {
      console.error('Failed to save language preference', err)
      setLang(lang)
    }
  }, [lang, user?.id, setUser])

  const t = useCallback(
    (key) => translations[lang][key] ?? translations.en[key] ?? key,
    [lang],
  )

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
