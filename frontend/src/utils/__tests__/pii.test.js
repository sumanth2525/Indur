import { describe, it, expect } from 'vitest'
import {
  maskPersonName,
  maskPhoneNumber,
  formatListingLocation,
  maskListingText,
} from '../pii'

describe('pii masking', () => {
  it('masks person names', () => {
    expect(maskPersonName('Ravi Kumar')).toBe('R*** K****')
    expect(maskPersonName('')).toBe('Private seller')
  })

  it('masks phone numbers', () => {
    expect(maskPhoneNumber('9876543210')).toBe('******10')
    expect(maskPhoneNumber(null)).toBeNull()
  })

  it('hides listing area for guests', () => {
    const location = { area: 'Kanteshwar', city: 'Nizamabad', village: 'X' }
    expect(formatListingLocation(location, true)).toBe('Nizamabad')
    expect(formatListingLocation(location, false)).toBe('Kanteshwar, Nizamabad')
  })

  it('strips phone numbers from listing text', () => {
    expect(maskListingText('Call 9876543210 for details')).toContain('******')
    expect(maskListingText('Call 9876543210 for details')).not.toContain('9876543210')
  })
})
