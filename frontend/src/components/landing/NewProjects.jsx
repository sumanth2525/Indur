import { Link } from 'react-router-dom'
import Icon from '../Icon'
import { NEW_PROJECTS } from '../../data/landingData'
import { formatIndianPrice } from '../../utils/indianFormat'

export default function NewProjects() {
  return (
    <section className="bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">New Projects</h2>
            <p className="mt-1 text-muted">Upcoming & under-construction from trusted builders</p>
          </div>
          <Link to="/login" className="hidden text-sm font-semibold text-brand hover:underline sm:block">
            View all →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {NEW_PROJECTS.map((project) => (
            <Link
              key={project.name}
              to="/login"
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-brand">
                  New Launch
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">{project.name}</h3>
                <p className="text-sm text-muted">{project.builder} · {project.city}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1 text-muted">
                    <Icon name="calendar_today" size={16} />
                    Possession {project.possession}
                  </span>
                </div>
                <p className="mt-3 font-bold text-brand">
                  From {formatIndianPrice(project.priceFrom)}
                </p>
                <p className="mt-2 line-clamp-1 text-[10px] text-muted">RERA: {project.rera}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
