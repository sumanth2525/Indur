import Icon from '../Icon'

export default function AppDownloadBanner() {
  return (
    <section className="mx-4 mb-12 sm:mx-6 lg:mx-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-brand px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Get the Indur Real estate App</h2>
            <p className="mt-2 max-w-md text-white/70">
              Search on the go, save favourites, and get instant alerts for new listings in your area.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href="#"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-brand transition hover:bg-white/90"
              >
                <Icon name="phone_iphone" size={20} />
                App Store
              </a>
              <a
                href="#"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Icon name="android" size={20} />
                Google Play
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-white p-4 shadow-xl">
            <div className="flex h-36 w-36 items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface">
              <Icon name="qr_code_2" size={80} className="text-brand" />
            </div>
            <p className="mt-3 text-xs font-medium text-muted">Scan to download</p>
          </div>
        </div>
      </div>
    </section>
  )
}
