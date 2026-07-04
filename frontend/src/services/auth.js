const API_BASE = import.meta.env.VITE_API_URL || ''

async function parseJson(res) {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Request failed')
  }
  return data
}

export async function getOtpStatus() {
  const res = await fetch(`${API_BASE}/api/auth/otp/status`)
  return parseJson(res)
}

export async function sendOtp(phone) {
  const res = await fetch(`${API_BASE}/api/auth/otp/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  })
  return parseJson(res)
}

export async function verifyOtp(phone, code) {
  const res = await fetch(`${API_BASE}/api/auth/otp/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, code }),
  })
  return parseJson(res)
}
