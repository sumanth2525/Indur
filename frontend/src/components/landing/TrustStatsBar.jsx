import Icon from '../Icon'
import { TRUST_STATS } from '../../data/landingData'

export default function TrustStatsBar() {
  return (
    <section className="border-b border-border bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 overflow-x-auto pb-1 scrollbar-none sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible">
          {TRUST_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex min-w-[140px] shrink-0 items-center gap-3 sm:min-w-0 sm:flex-col sm:text-center sm:gap-2"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon name={stat.icon} size={22} />
              </div>
              <div>
                <p className="text-lg font-bold tabular-nums text-brand sm:text-xl">{stat.value}</p>
                <p className="text-xs text-muted sm:text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
