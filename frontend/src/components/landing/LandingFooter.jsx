import { Link } from 'react-router-dom'
import Icon from '../Icon'
import { useLanguage } from '../../i18n/LanguageContext'
import { FOOTER_CITIES } from '../../data/landingData'

export default function LandingFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-border bg-text text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-bold text-brand text-sm">IR</span>
              <span className="font-semibold text-white">{t('appName')}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              India&apos;s premium property platform for buying, selling, and renting residential & commercial real estate.
            </p>
            <div className="mt-4 flex gap-3">
              {['public', 'share', 'mail'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                  aria-label={icon}
                >
                  <Icon name={icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Properties by City</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {FOOTER_CITIES.map((city) => (
                <li key={city}>
                  <Link to="/login" className="hover:text-accent transition-colors">
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-accent">About Us</Link></li>
              <li><Link to="/login" className="hover:text-accent">Careers</Link></li>
              <li><Link to="/login" className="hover:text-accent">Contact</Link></li>
              <li><Link to="/login" className="hover:text-accent">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-accent">Privacy Policy</Link></li>
              <li><Link to="/login" className="hover:text-accent">Terms of Service</Link></li>
              <li><Link to="/login" className="hover:text-accent">RERA Disclaimer</Link></li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-white/50">
              RERA registration details are provided by builders and verified where possible. {t('appName')} is an intermediary platform and not a RERA-registered real estate agent unless stated otherwise.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {t('appName')}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
