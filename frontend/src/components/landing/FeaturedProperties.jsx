import { Link } from 'react-router-dom'
import Icon from '../Icon'
import { FEATURED_PROPERTIES } from '../../data/landingData'
import { formatIndianPrice, formatSqft } from '../../utils/indianFormat'

function PropertyCard({ property }) {
  return (
    <Link
      to="/login"
      className="group block min-w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-lg sm:min-w-[300px]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {property.rera && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-white">
            <Icon name="verified" size={14} />
            RERA Verified
          </span>
        )}
        {property.vastu && (
          <span className="absolute right-3 top-3 rounded-full bg-accent/95 px-2 py-1 text-[10px] font-semibold text-brand">
            Vastu ✓
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xl font-bold text-brand">
          {formatIndianPrice(property.price, { rent: property.rent })}
        </p>
        <h3 className="mt-1 font-semibold line-clamp-1">{property.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted">
          <Icon name="location_on" size={14} />
          {property.locality}, {property.city}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
          {property.bhk > 0 && (
            <span className="rounded-lg bg-surface px-2.5 py-1 font-medium">{property.bhk} BHK</span>
          )}
          {property.sqft > 0 && (
            <span className="rounded-lg bg-surface px-2.5 py-1 font-medium">{formatSqft(property.sqft)}</span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function FeaturedProperties() {
  return (
    <section className="bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Properties</h2>
          <p className="mt-1 text-muted">Handpicked verified listings for you</p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {FEATURED_PROPERTIES.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
