import { Link } from 'react-router-dom'
import Icon from '../Icon'
import { PROPERTY_TYPES } from '../../data/landingData'

export default function PropertyTypes() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Explore by Property Type</h2>
        <p className="mt-1 mb-8 text-muted">Find exactly what you&apos;re looking for</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {PROPERTY_TYPES.map((type) => (
            <Link
              key={type.id}
              to="/login"
              className="group flex min-h-[120px] flex-col items-center justify-center rounded-2xl border border-border bg-white p-4 text-center transition hover:border-brand/30 hover:shadow-md active:scale-[0.98]"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                <Icon name={type.icon} size={26} />
              </div>
              <h3 className="text-sm font-semibold leading-tight">{type.label}</h3>
              <p className="mt-1 text-xs text-muted">{type.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
