const PHONE_RE = /(\+91[\s-]?)?[6-9]\d{9}/g
const EMAIL_RE = /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g

export function isGuestUser(user) {
  return Boolean(user?.isGuest)
}

export function isAuthenticatedUser(user) {
  return Boolean(user && !user.isGuest)
}

export function maskPersonName(name) {
  if (!name || typeof name !== 'string') return 'Private seller'
  const trimmed = name.trim()
  if (!trimmed) return 'Private seller'
  return trimmed
    .split(/\s+/)
    .map((part) => `${part.charAt(0)}${'*'.repeat(Math.max(2, Math.min(part.length - 1, 4)))}`)
    .join(' ')
}

export function maskPhoneNumber(phone) {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 4) return '******'
  return `******${digits.slice(-2)}`
}

export function maskListingLocation(location) {
  if (!location) return 'Nizamabad'
  return location.city || location.division || 'Nizamabad'
}

export function formatListingLocation(location, guest) {
  if (!location) return ''
  if (guest) return maskListingLocation(location)
  const area = location.area || location.village || location.mandal
  return [area, location.city].filter(Boolean).join(', ')
}

export function maskListingText(text) {
  if (!text || typeof text !== 'string') return text || ''
  return text.replace(PHONE_RE, '******').replace(EMAIL_RE, '***@***')
}
