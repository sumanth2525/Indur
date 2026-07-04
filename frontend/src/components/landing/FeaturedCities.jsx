import { Link } from 'react-router-dom'
import { SERVICE_DISTRICTS } from '../../data/landingData'

export default function FeaturedCities() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Explore Nizamabad District</h2>
            <p className="mt-1 text-muted">Houses, land, plots & rent across revenue divisions</p>
          </div>
          <Link to="/login" className="hidden text-sm font-semibold text-brand hover:underline sm:block">
            View all listings →
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:overflow-visible">
          {SERVICE_DISTRICTS.map((area) => (
            <Link
              key={area.id}
              to="/login"
              state={{ from: '/browse', search: { city: area.name, intent: 'buy' } }}
              className="group relative min-w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl sm:min-w-0"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={area.image}
                  alt={area.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-bold">{area.name}</h3>
                <p className="text-sm text-white/80">
                  {area.mandals} mandals · houses, land & plots
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
