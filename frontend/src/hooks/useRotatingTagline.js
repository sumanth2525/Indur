import { useEffect, useState } from 'react'
import { REVENUE_DIVISIONS } from '../data/nizamabadLocations'

const TYPE_KEYS = ['houses', 'land', 'plots', 'rentHomes']

function buildSlides() {
  const areas = REVENUE_DIVISIONS.map((d) => d.name)
  const slides = []
  for (let i = 0; i < areas.length; i++) {
    slides.push({ typeKey: TYPE_KEYS[i % TYPE_KEYS.length], area: areas[i] })
  }
  for (let i = 0; i < areas.length; i++) {
    slides.push({ typeKey: TYPE_KEYS[(i + 2) % TYPE_KEYS.length], area: areas[(i + 1) % areas.length] })
  }
  return slides
}

const SLIDES = buildSlides()

export default function useRotatingTagline(intervalMs = 3200) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return SLIDES[index]
}

export { SLIDES }
