const PHONE_RE = /^(\+91[\s-]?)?[6-9]\d{9}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function sanitizeText(value, maxLength = 5000) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

export function isValidPhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '')
  if (digits.length === 10) return PHONE_RE.test(digits)
  if (digits.length === 12 && digits.startsWith('91')) return PHONE_RE.test(`+${digits}`)
  return false
}

export function isValidEmail(email) {
  return EMAIL_RE.test(String(email || '').trim())
}

export function isValidPrice(price) {
  const n = Number(price)
  return Number.isFinite(n) && n >= 0 && n <= 1_000_000_000_000
}

export function isValidListingTitle(title) {
  const text = sanitizeText(title, 200)
  return text.length >= 4 && text.length <= 200
}

export function isValidListingDescription(description) {
  const text = sanitizeText(description, 5000)
  return text.length <= 5000
}
