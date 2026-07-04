import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../Icon'
import { HERO_BG, ALL_LOCALITIES, SERVICE_DISTRICTS } from '../../data/landingData'
import { REVENUE_DIVISIONS } from '../../data/nizamabadLocations'
import { budgetLabel } from '../../utils/indianFormat'
import RotatingTagline from '../RotatingTagline'

const PROPERTY_TYPES = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'plot', label: 'Plot / Land' },
  { value: 'land', label: 'Agriculture Land' },
]

export default function HeroSection({ city, intent, onIntentChange }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [propType, setPropType] = useState('house')
  const [budget, setBudget] = useState(50)
  const [vastu, setVastu] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const suggestions = useMemo(() => {
    const division = REVENUE_DIVISIONS.find((d) => d.name === city)
    if (division) {
      const mandalSuggestions = division.mandals.flatMap((m) =>
        m.villages.slice(0, 2).map((v) => ({ locality: v, city: m.name, division: division.name })),
      )
      if (!query.trim()) return mandalSuggestions.slice(0, 8)
      const q = query.toLowerCase()
      return mandalSuggestions
        .filter(
          (s) =>
            s.locality.toLowerCase().includes(q)
            || s.city.toLowerCase().includes(q)
            || s.division.toLowerCase().includes(q),
        )
        .slice(0, 8)
    }
    if (!query.trim()) return ALL_LOCALITIES.filter((l) => l.city === city).slice(0, 6)
    const q = query.toLowerCase()
    return ALL_LOCALITIES.filter(
      (l) => l.locality.toLowerCase().includes(q) || l.city.toLowerCase().includes(q),
    ).slice(0, 8)
  }, [query, city])

  const districtNames = SERVICE_DISTRICTS.map((d) => d.name).join(', ')

  const handleSearch = () => {
    navigate('/login', { state: { from: '/browse', search: { city, query, intent, propType, budget, vastu } } })
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/90 via-brand/75 to-brand/95" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium tracking-wide text-accent uppercase">Nizamabad district property platform</p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.15]">
            <RotatingTagline className="text-white" />
          </h1>
          <p className="mt-4 text-base text-white/75 sm:text-lg">
            Buy, rent, or sell houses, land & plots across {districtNames}
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-2xl bg-white p-4 shadow-2xl shadow-black/20 sm:mt-10 sm:rounded-3xl sm:p-5 lg:p-6">
          <div className="mb-4 flex gap-1 rounded-xl bg-surface p-1">
            {['buy', 'rent', 'pg'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onIntentChange?.(mode)}
                className={`min-h-11 flex-1 rounded-lg text-sm font-semibold capitalize transition ${
                  intent === mode ? 'bg-brand text-white shadow-sm' : 'text-muted hover:text-text'
                }`}
              >
                {mode === 'pg' ? 'PG' : mode}
              </button>
            ))}
          </div>

          <div className="relative mb-4">
            <Icon name="search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true) }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder={`Search in ${city} — locality or mandal…`}
              className="min-h-[52px] w-full rounded-xl border border-border bg-white pl-12 pr-4 text-base outline-none ring-brand/30 focus:border-brand focus:ring-2"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-xl border border-border bg-white py-1 shadow-lg">
                {suggestions.map((s) => (
                  <li key={`${s.city}-${s.locality}`}>
                    <button
                      type="button"
                      onMouseDown={() => { setQuery(`${s.locality}, ${s.city}`); setShowSuggestions(false) }}
                      className="flex min-h-11 w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-surface"
                    >
                      <Icon name="location_on" size={16} className="text-muted shrink-0" />
                      <span>{s.locality}</span>
                      <span className="text-muted text-xs">{s.city}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted">Property type</label>
              <select
                value={propType}
                onChange={(e) => setPropType(e.target.value)}
                className="min-h-11 w-full rounded-xl border border-border bg-white px-3 text-sm outline-none focus:border-brand"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted">
                <span>Budget (max)</span>
                <span className="text-brand font-semibold">{budgetLabel(budget)}</span>
              </label>
              <input
                type="range"
                min={5}
                max={200}
                step={5}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-brand"
              />
              <div className="mt-1 flex justify-between text-[10px] text-muted">
                <span>₹5 L</span>
                <span>₹2 Cr</span>
              </div>
            </div>
          </div>

          <label className="mt-4 flex min-h-11 cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={vastu}
              onChange={(e) => setVastu(e.target.checked)}
              className="h-5 w-5 rounded border-border accent-brand"
            />
            <span className="text-sm text-text">Vastu-compliant properties only</span>
          </label>

          <button
            type="button"
            onClick={handleSearch}
            className="mt-5 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-brand text-base font-semibold text-white transition hover:bg-brand-dark active:scale-[0.99]"
          >
            <Icon name="search" size={22} />
            Search Properties
          </button>
        </div>
      </div>
    </section>
  )
}
