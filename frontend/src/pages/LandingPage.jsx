import { useState } from 'react'
import LandingHeader from '../components/landing/LandingHeader'
import HeroSection from '../components/landing/HeroSection'
import TrustStatsBar from '../components/landing/TrustStatsBar'
import FeaturedCities from '../components/landing/FeaturedCities'
import FeaturedProperties from '../components/landing/FeaturedProperties'
import PropertyTypes from '../components/landing/PropertyTypes'
import WhyChooseUs from '../components/landing/WhyChooseUs'
import EmiCalculator from '../components/landing/EmiCalculator'
import NewProjects from '../components/landing/NewProjects'
import Testimonials from '../components/landing/Testimonials'
import AppDownloadBanner from '../components/landing/AppDownloadBanner'
import LandingFooter from '../components/landing/LandingFooter'
import MobileBottomNav from '../components/landing/MobileBottomNav'

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('buy')
  const [city, setCity] = useState('Nizamabad')
  const [intent, setIntent] = useState('buy')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'rent') setIntent('rent')
    else if (tab === 'buy') setIntent('buy')
    else if (tab === 'sell') setIntent('buy')
  }

  return (
    <div className="min-h-dvh bg-white pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <LandingHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        city={city}
        onCityChange={setCity}
      />

      <main>
        <div id="search">
          <HeroSection city={city} intent={intent} onIntentChange={setIntent} />
        </div>
        <TrustStatsBar />
        <FeaturedCities />
        <FeaturedProperties />
        <PropertyTypes />
        <WhyChooseUs />
        <EmiCalculator />
        <NewProjects />
        <Testimonials />
        <AppDownloadBanner />
      </main>

      <LandingFooter />
      <MobileBottomNav />
    </div>
  )
}
