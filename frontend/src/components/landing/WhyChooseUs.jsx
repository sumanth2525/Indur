import Icon from '../Icon'
import { WHY_CHOOSE } from '../../data/landingData'

export default function WhyChooseUs() {
  return (
    <section className="bg-brand py-12 text-white sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Why Choose Indur Real estate</h2>
          <p className="mt-2 text-white/70">Built for Indian buyers and sellers — transparent, verified, trustworthy</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:bg-white/10"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-brand">
                <Icon name={item.icon} size={24} />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
