import { TESTIMONIALS } from '../../data/landingData'

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">What Our Users Say</h2>
        <p className="mt-2 text-center text-muted">Real stories from buyers and sellers across India</p>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="min-w-[280px] shrink-0 snap-start rounded-2xl border border-border bg-white p-6 shadow-sm sm:min-w-0"
            >
              <p className="text-sm leading-relaxed text-text">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">{t.city}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
