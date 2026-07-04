import { nearestMandal, matchLocationByName, normalizeLocation } from '../data/nizamabadLocations'

async function fetchIpGeo() {
  const res = await fetch('/api/geolocation', {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) throw new Error('IP lookup failed')

  const data = await res.json()
  return {
    city: data.city,
    region: data.state_prov,
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
  }
}

function gpsPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 },
    )
  })
}

export async function detectUserLocation() {
  try {
    const { lat, lng } = await gpsPosition()
    return { ...nearestMandal(lat, lng), source: 'gps' }
  } catch {
    /* fall through to IP */
  }

  try {
    const data = await fetchIpGeo()
    const byName = matchLocationByName(data.city, data.region)
    if (byName && byName.scope !== 'district') {
      return { ...byName, source: 'ip-name' }
    }
    if (data.latitude && data.longitude) {
      return { ...nearestMandal(data.latitude, data.longitude), source: 'ip-geo' }
    }
    return { ...normalizeLocation('Nizamabad'), source: 'ip-default' }
  } catch {
    return { ...normalizeLocation('Nizamabad'), source: 'fallback' }
  }
}
