import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('contact config', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  async function loadContact() {
    return import('../contact.js')
  }

  it('returns null when number is not configured', async () => {
    const { getWhatsAppContactUrl, WHATSAPP_NUMBER } = await loadContact()
    expect(WHATSAPP_NUMBER).toBe('')
    expect(getWhatsAppContactUrl('Hello')).toBeNull()
  })

  it('strips non-digits from international numbers', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '+16127188079')
    const { WHATSAPP_NUMBER, getWhatsAppContactUrl } = await loadContact()
    expect(WHATSAPP_NUMBER).toBe('16127188079')
    expect(getWhatsAppContactUrl()).toBe('https://wa.me/16127188079')
  })

  it('prefixes 91 for 10-digit Indian mobile numbers', async () => {
    vi.stubEnv('VITE_WHATSAPP_NUMBER', '9876543210')
    const { WHATSAPP_NUMBER, getWhatsAppContactUrl } = await loadContact()
    expect(WHATSAPP_NUMBER).toBe('919876543210')
    expect(getWhatsAppContactUrl('Hi')).toBe('https://wa.me/919876543210?text=Hi')
  })
})
