/** Format ₹ in Indian Lakhs / Crores style */
export function formatIndianPrice(amount, { rent = false } = {}) {
  if (rent) {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L/mo`
    return `₹${amount.toLocaleString('en-IN')}/mo`
  }
  if (amount >= 10000000) {
    const cr = amount / 10000000
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`
  }
  if (amount >= 100000) {
    const lakh = amount / 100000
    return `₹${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(2)} L`
  }
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatSqft(sqft) {
  if (!sqft) return ''
  const sqm = Math.round(sqft * 0.092903)
  return `${sqft.toLocaleString('en-IN')} sq.ft. (${sqm} sq.m.)`
}

/** Monthly EMI — standard reducing balance formula */
export function calculateEmi(principal, annualRate, tenureYears) {
  const p = Number(principal) || 0
  const r = (Number(annualRate) || 0) / 12 / 100
  const n = (Number(tenureYears) || 0) * 12
  if (!p || !r || !n) return 0
  return Math.round((p * r * (1 + r) ** n) / ((1 + r) ** n - 1))
}

export function budgetLabel(lakhs) {
  if (lakhs >= 100) return `₹${(lakhs / 100).toFixed(1)} Cr`
  return `₹${lakhs} L`
}
