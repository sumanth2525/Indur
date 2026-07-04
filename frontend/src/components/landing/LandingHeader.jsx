import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon'
import { useLanguage } from '../../i18n/LanguageContext'
import { NAV_TABS, SERVICE_DISTRICTS } from '../../data/landingData'

export default function LandingHeader({ activeTab, onTabChange, city, onCityChange }) {
  const { t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-brand font-bold text-sm">IR</span>
          <span className="hidden font-semibold tracking-tight text-white sm:block">
            {t('appName')}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange?.(tab.id)}
              className={`min-h-11 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-white/15 text-white' : 'text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setCityOpen(!cityOpen)}
              className="flex min-h-11 items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/15"
            >
              <Icon name="location_on" size={18} />
              <span className="max-w-[100px] truncate sm:max-w-none">{city}</span>
              <Icon name="expand_more" size={18} />
            </button>
            {cityOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setCityOpen(false)} aria-hidden />
                <div className="absolute right-0 top-full z-50 mt-2 max-h-72 w-52 overflow-y-auto rounded-xl border border-border bg-white py-1 shadow-xl">
                  {SERVICE_DISTRICTS.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => { onCityChange?.(c.name); setCityOpen(false) }}
                      className={`flex w-full min-h-11 items-center px-4 py-2.5 text-left text-sm hover:bg-surface ${
                        city === c.name ? 'font-semibold text-brand' : 'text-text'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Link
            to="/login"
            state={{ from: '/browse' }}
            className="hidden min-h-11 items-center rounded-xl border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 sm:inline-flex"
          >
            {t('continueGuest')}
          </Link>
          <Link
            to="/login"
            className="hidden min-h-11 items-center rounded-xl px-4 py-2.5 text-sm font-medium text-white/90 hover:text-white md:inline-flex"
          >
            Login
          </Link>
          <Link
            to="/login"
            className="inline-flex min-h-11 items-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-brand shadow-lg shadow-accent/25 transition hover:bg-accent-hover active:scale-[0.98]"
          >
            Post Property
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-white lg:hidden"
            aria-label="Menu"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-brand px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => { onTabChange?.(tab.id); setMenuOpen(false) }}
                className={`min-h-11 rounded-lg px-4 py-3 text-left text-sm font-medium ${
                  activeTab === tab.id ? 'bg-white/15 text-white' : 'text-white/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <Link
              to="/login"
              state={{ from: '/browse' }}
              className="min-h-11 rounded-lg px-4 py-3 text-left text-sm font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              {t('continueGuest')}
            </Link>
            <Link to="/login" className="min-h-11 rounded-lg px-4 py-3 text-sm font-medium text-white/80" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
