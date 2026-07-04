import { useState } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'

import Icon from '../components/Icon'

import { useAuth } from '../context/AuthContext'

import { useLanguage } from '../i18n/LanguageContext'

import { isValidPhone } from '../utils/validation'

import { sanitizeGuestPath, sanitizeInternalPath } from '../utils/safeRedirect'

import { getAuthErrorMessage } from '../utils/authErrors'

import LanguageToggle from '../components/LanguageToggle'
import RotatingTagline from '../components/RotatingTagline'
import LoginConsents from '../components/LoginConsents'
import WhatsAppContactButton from '../components/WhatsAppContactButton'

import { MOCK_IMAGES } from '../data/mockImages'



const BRAND_ICONS = [

  { name: 'home', top: '10%', left: '6%', size: 36, rotate: -12, delay: '0s' },

  { name: 'key', top: '18%', right: '10%', size: 28, rotate: 18, delay: '1.2s' },

  { name: 'location_on', top: '52%', left: '8%', size: 32, rotate: -6, delay: '2.4s' },

  { name: 'apartment', top: '62%', right: '7%', size: 40, rotate: 8, delay: '0.6s' },

  { name: 'park', top: '78%', left: '14%', size: 30, rotate: -4, delay: '1.8s' },

]



const SHOWCASE_IMAGES = [

  {

    src: MOCK_IMAGES.bhk2[0],

    alt: 'Modern apartment in Nizamabad',

    top: '14%',

    right: '8%',

    width: '11.5rem',

    height: '8.5rem',

    rotate: '-6deg',

    delay: '0.15s',

    floatDelay: '0s',

  },

  {

    src: MOCK_IMAGES.villa[0],

    alt: 'Family home',

    top: '38%',

    right: '18%',

    width: '10rem',

    height: '12rem',

    rotate: '4deg',

    delay: '0.35s',

    floatDelay: '1.5s',

  },

  {

    src: MOCK_IMAGES.land[0],

    alt: 'Land plot',

    bottom: '22%',

    right: '6%',

    width: '12rem',

    height: '8rem',

    rotate: '-3deg',

    delay: '0.55s',

    floatDelay: '3s',

  },

  {

    src: MOCK_IMAGES.bhk3[1],

    alt: 'Spacious flat',

    bottom: '12%',

    right: '28%',

    width: '9.5rem',

    height: '9.5rem',

    rotate: '7deg',

    delay: '0.75s',

    floatDelay: '2s',

  },

]



const PROPERTY_TYPES = [

  { icon: 'home', labelKey: 'house' },

  { icon: 'landscape', labelKey: 'land' },

  { icon: 'agriculture', labelKey: 'agriculture' },

  { icon: 'apartment', labelKey: 'apartment' },

]



function GoogleIcon() {

  return (

    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>

      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />

      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />

      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />

      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />

    </svg>

  )

}



function BrandMark({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  )
}


export default function Login() {

  const { user, loginWithGoogle, loginWithPhone, requestPhoneOtp, continueAsGuest, loading } = useAuth()

  const { t } = useLanguage()

  const navigate = useNavigate()
  const routeLocation = useLocation()
  const afterLoginPath = sanitizeInternalPath(routeLocation.state?.from)
  const afterLoginState = routeLocation.state?.search ? { search: routeLocation.state.search } : undefined

  const [phone, setPhone] = useState('')

  const [otp, setOtp] = useState('')

  const [otpSent, setOtpSent] = useState(false)

  const [sendingOtp, setSendingOtp] = useState(false)

  const [error, setError] = useState('')

  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const [acceptedFreeProject, setAcceptedFreeProject] = useState(false)

  const loginConsentComplete = acceptedTerms && acceptedFreeProject



  const ensureLoginConsent = () => {
    if (loginConsentComplete) return true
    if (!acceptedTerms) {
      setError(t('termsMustAccept'))
    } else if (!acceptedFreeProject) {
      setError(t('freeProjectMustAccept'))
    } else {
      setError(t('loginConsentMustAccept'))
    }
    return false
  }



  if (user && !user.isGuest) {

    navigate(afterLoginPath, { replace: true, state: afterLoginState })

    return null

  }



  const handleGuest = () => {

    if (!ensureLoginConsent()) return

    setError('')

    continueAsGuest()

    navigate(sanitizeGuestPath(afterLoginPath), { replace: true, state: afterLoginState })

  }



  const handleGoogle = async () => {

    if (!ensureLoginConsent()) return

    setError('')

    try {

      await loginWithGoogle()

      navigate(afterLoginPath, { state: afterLoginState })

    } catch {

      setError('Login failed')

    }

  }



  const handleSendOtp = async () => {

    if (!ensureLoginConsent()) return

    if (!isValidPhone(phone)) {

      setError('Enter a valid 10-digit Indian phone number')

      return

    }

    setError('')

    setSendingOtp(true)

    try {

      await requestPhoneOtp(phone)

      setOtpSent(true)

    } catch (err) {

      setError(getAuthErrorMessage(err, 'Could not send OTP'))

    } finally {

      setSendingOtp(false)

    }

  }



  const handleVerifyOtp = async () => {

    if (!ensureLoginConsent()) return

    setError('')

    try {

      await loginWithPhone(phone, otp)

      navigate(afterLoginPath, { state: afterLoginState })

    } catch (err) {

      setError(getAuthErrorMessage(err, 'Invalid OTP'))

    }

  }



  return (

    <div className="min-h-dvh flex flex-col lg:flex-row">

      {/* Brand panel — desktop */}

      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] bg-text relative overflow-hidden">

        <div className="login-brand-bg" aria-hidden>

          <img src={MOCK_IMAGES.bhk3[0]} alt="" />

          <img src={MOCK_IMAGES.agriculture[0]} alt="" />

          <div className="login-brand-overlay" />

        </div>



        <div className="absolute inset-0 pointer-events-none" aria-hidden>

          {SHOWCASE_IMAGES.map((item) => (

            <div

              key={item.src}

              className="login-showcase-card ring-1 ring-white/15"

              style={{

                top: item.top,

                right: item.right,

                bottom: item.bottom,

                width: item.width,

                height: item.height,

                '--login-rotate': item.rotate,

                animationDelay: `${item.delay}, ${item.floatDelay}`,

              }}

            >

              <img src={item.src} alt={item.alt} loading="lazy" />

            </div>

          ))}



          {BRAND_ICONS.map(({ name, top, left, right, size, rotate, delay }, i) => (

            <Icon

              key={i}

              name={name}

              size={size}

              className="absolute text-white login-drift-icon"

              style={{

                top,

                left,

                right,

                '--login-rotate': `${rotate}deg`,

                animationDelay: delay,

              }}

            />

          ))}

        </div>



        <div className="relative z-10 flex flex-col justify-between w-full p-12 xl:p-16">

          <div className="flex items-center gap-3 login-animate-up" style={{ animationDelay: '0.1s' }}>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 text-white">

              <BrandMark size={24} />

            </div>

            <span className="font-bold tracking-tight text-white text-sm">{t('appName')}</span>

          </div>



          <div className="max-w-lg login-animate-up" style={{ animationDelay: '0.25s' }}>

            <h1 className="text-[2.75rem] xl:text-5xl font-bold text-white leading-[1.12] tracking-tight">

              {t('tagline')}

            </h1>

            <p className="mt-5 text-white/65 text-lg leading-relaxed">{t('taglineSub')}</p>

          </div>



          <div className="flex flex-wrap gap-3 login-animate-up" style={{ animationDelay: '0.45s' }}>

            {PROPERTY_TYPES.map(({ icon, labelKey }, i) => (

              <div

                key={labelKey}

                className="login-pill-hover inline-flex items-center gap-2 rounded-full bg-white/[0.08] ring-1 ring-white/10 px-4 py-2 text-sm text-white/90"

                style={{ animationDelay: `${0.5 + i * 0.08}s` }}

              >

                <Icon name={icon} size={18} className="text-white/80" />

                {t(labelKey)}

              </div>

            ))}

          </div>

        </div>

      </div>



      {/* Mobile hero strip */}

      <div className="relative h-36 overflow-hidden lg:hidden">

        <img

          src={MOCK_IMAGES.bhk2[1]}

          alt=""

          className="absolute inset-0 h-full w-full object-cover"

        />

        <div className="absolute inset-0 bg-gradient-to-r from-text/95 via-text/80 to-text/60" />

        <div className="relative flex h-full items-end px-6 pb-5 login-animate-in">

          <p className="text-sm font-medium text-white/80">{t('taglineSub')}</p>

        </div>

      </div>



      {/* Form panel */}

      <div className="relative flex flex-1 flex-col bg-white lg:justify-center lg:px-16 lg:py-12 xl:px-24">

        <div className="absolute top-4 right-4 z-10 lg:top-8 lg:right-8 login-animate-in" style={{ animationDelay: '0.2s' }}>

          <LanguageToggle />

        </div>



        <div className="flex flex-1 flex-col justify-start w-full max-w-md mx-auto px-6 pt-6 pb-8 lg:justify-center lg:px-0 lg:py-0">

          <div className="mb-8 lg:hidden login-animate-up" style={{ animationDelay: '0.1s' }}>

            <div className="flex items-center gap-2.5">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-text text-white">

                <BrandMark size={20} />

              </div>

              <span className="font-bold tracking-tight text-sm">{t('appName')}</span>

            </div>

          </div>



          <div className="lg:mb-10 login-animate-slide" style={{ animationDelay: '0.15s' }}>

            <h2 className="text-3xl font-bold leading-tight tracking-tight lg:hidden">
              <RotatingTagline />
            </h2>

            <h2 className="hidden lg:block text-[2rem] xl:text-[2.25rem] font-bold leading-tight tracking-tight">

              {t('login')}

            </h2>

            <p className="text-muted mt-2 text-sm lg:mt-3 lg:text-base lg:leading-relaxed">

              {t('loginSubtitle')}

            </p>

          </div>



          <LoginConsents
            acceptedTerms={acceptedTerms}
            onTermsChange={(next) => {
              setAcceptedTerms(next)
              if (next && acceptedFreeProject) setError('')
            }}
            acceptedFreeProject={acceptedFreeProject}
            onFreeProjectChange={(next) => {
              setAcceptedFreeProject(next)
              if (next && acceptedTerms) setError('')
            }}
            className="login-animate-in mb-4"
            style={{ animationDelay: '0.2s' }}
          />



          <div className="space-y-3">

            <button

              type="button"

              onClick={handleGoogle}

              disabled={loading || !loginConsentComplete}

              className="login-animate-slide flex w-full items-center justify-center gap-3 rounded-full border border-border-strong bg-white py-3.5 px-6 text-sm font-medium hover:bg-surface transition-colors disabled:cursor-not-allowed disabled:opacity-50 lg:py-4"

              style={{ animationDelay: '0.25s' }}

            >

              <GoogleIcon />

              {t('continueGoogle')}

            </button>



            <div className="relative py-2 login-animate-in" style={{ animationDelay: '0.28s' }}>

              <div className="absolute inset-0 flex items-center" aria-hidden>

                <div className="w-full border-t border-border" />

              </div>

              <div className="relative flex justify-center">

                <span className="bg-white px-3 text-xs font-medium uppercase tracking-wider text-muted-light">

                  {t('orDivider')}

                </span>

              </div>

            </div>



            {!otpSent ? (

              <div className="space-y-3">

                <input

                  type="tel"

                  placeholder={t('enterPhone')}

                  value={phone}

                  onChange={(e) => setPhone(e.target.value)}

                  className="login-animate-slide w-full rounded-full border border-border-strong px-5 py-3.5 text-sm outline-none focus:border-text lg:py-4"

                  style={{ animationDelay: '0.38s' }}

                />

                <button

                  type="button"

                  onClick={handleSendOtp}

                  disabled={sendingOtp || !loginConsentComplete}

                  className="login-animate-slide flex w-full items-center justify-center rounded-full bg-text py-3.5 px-6 text-sm font-medium text-white hover:bg-black transition-colors disabled:cursor-not-allowed disabled:opacity-50 lg:py-4"

                  style={{ animationDelay: '0.46s' }}

                >

                  {sendingOtp ? t('sendingOtp') : t('sendOtp')}

                </button>

              </div>

            ) : (

              <div className="space-y-3">

                <p className="text-sm text-muted text-center login-animate-in">{t('otpSent')}</p>

                <input

                  type="text"

                  placeholder={t('enterOtp')}

                  value={otp}

                  onChange={(e) => setOtp(e.target.value)}

                  maxLength={6}

                  className="login-animate-slide w-full rounded-full border border-border-strong px-5 py-3.5 text-sm text-center tracking-widest outline-none focus:border-text lg:py-4"

                  style={{ animationDelay: '0.1s' }}

                />

                <button

                  type="button"

                  onClick={handleVerifyOtp}

                  disabled={loading || !loginConsentComplete}

                  className="login-animate-slide flex w-full items-center justify-center rounded-full bg-text py-3.5 px-6 text-sm font-medium text-white hover:bg-black transition-colors disabled:cursor-not-allowed disabled:opacity-50 lg:py-4"

                  style={{ animationDelay: '0.18s' }}

                >

                  {t('verifyOtp')}

                </button>

              </div>

            )}



            <div className="relative py-2 login-animate-in" style={{ animationDelay: '0.52s' }}>

              <div className="absolute inset-0 flex items-center" aria-hidden>

                <div className="w-full border-t border-border" />

              </div>

              <div className="relative flex justify-center">

                <span className="bg-white px-3 text-xs font-medium uppercase tracking-wider text-muted-light">

                  {t('orDivider')}

                </span>

              </div>

            </div>



            <button

              type="button"

              onClick={handleGuest}

              disabled={!loginConsentComplete}

              className="login-animate-slide flex w-full items-center justify-center rounded-full border-2 border-text bg-white py-3.5 px-6 text-sm font-semibold text-text shadow-sm hover:bg-surface transition-colors disabled:cursor-not-allowed disabled:opacity-50 lg:py-4"

              style={{ animationDelay: '0.58s' }}

            >

              {t('continueGuest')}

            </button>



            <WhatsAppContactButton

              className="login-animate-slide"

              style={{ animationDelay: '0.64s' }}

            />

          </div>



          {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}

          {import.meta.env.DEV && (
            <p className="mt-2 text-xs text-muted-light text-center login-animate-in" style={{ animationDelay: '0.62s' }}>
              {t('demoNote')}
            </p>
          )}

          <div id="recaptcha-container" className="sr-only" aria-hidden />

        </div>

      </div>

    </div>

  )

}


