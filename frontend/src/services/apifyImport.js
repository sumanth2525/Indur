import { createListing } from './dataApi'

const API_BASE = import.meta.env.VITE_API_URL || ''
const ADMIN_KEY = import.meta.env.VITE_ADMIN_API_KEY || ''

function adminHeaders() {
  const headers = { 'Content-Type': 'application/json' }
  if (ADMIN_KEY) headers['X-Admin-Key'] = ADMIN_KEY
  return headers
}

export async function getImportStatus() {
  const res = await fetch(`${API_BASE}/api/import/99acres/status`)
  if (!res.ok) throw new Error('Import service unavailable')
  return res.json()
}

export async function importFrom99Acres({ location = 'Nizamabad', purpose = 'sell', limit = 30, sellerId } = {}) {
  const res = await fetch(`${API_BASE}/api/import/99acres`, {
    method: 'POST',
    headers: adminHeaders(),
    body: JSON.stringify({ location, purpose, limit }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || data.hint || 'Import failed')

  if (data.properties?.length && sellerId) {
    await mergeImportedProperties(data.properties, sellerId)
  }

  return data
}

export async function mergeImportedProperties(imported, sellerId) {
  for (const p of imported) {
    await createListing(
      {
        ...p,
        location: p.location || { area: 'Nizamabad', city: 'Nizamabad' },
        images: p.images?.length ? p.images : [],
      },
      sellerId,
    )
  }
}
