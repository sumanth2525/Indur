const raw = import.meta.env.VITE_WHATSAPP_NUMBER || ''

function normalizeWhatsAppNumber(value) {
  const digits = String(value || '').replace(/\D/g, '')
  if (!digits) return ''
  // Indian mobile without country code, e.g. 9876543210 → 919876543210
  if (digits.length === 10 && /^[6-9]/.test(digits)) return `91${digits}`
  return digits
}

export const WHATSAPP_NUMBER = normalizeWhatsAppNumber(raw)

export function getWhatsAppContactUrl(message) {
  if (!WHATSAPP_NUMBER) return null
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}