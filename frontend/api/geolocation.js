const CACHE_SECONDS = 300

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.IPGEOLOCATION_API_KEY
  if (!apiKey || apiKey === 'mock-ipgeolocation-key-replace-me') {
    return res.status(503).json({ error: 'Geolocation service unavailable' })
  }

  try {
    const url = new URL('https://api.ipgeolocation.io/ipgeo')
    url.searchParams.set('apiKey', apiKey)

    const upstream = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    })

    const data = await upstream.json().catch(() => ({}))
    if (!upstream.ok) {
      return res.status(upstream.status >= 500 ? 502 : 400).json({ error: 'Geolocation lookup failed' })
    }

    res.setHeader('Cache-Control', `private, max-age=${CACHE_SECONDS}`)
    return res.status(200).json({
      city: data.city ?? '',
      state_prov: data.state_prov ?? '',
      latitude: data.latitude ?? '',
      longitude: data.longitude ?? '',
    })
  } catch {
    return res.status(502).json({ error: 'Geolocation lookup failed' })
  }
}
