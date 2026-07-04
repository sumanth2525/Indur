/** Browse category chips shown on Home */
export const BROWSE_CATEGORIES = ['all', 'house', 'land', 'plot', 'apartment']

/** Map landing/hero property type → browse category */
export function heroTypeToCategory(propType) {
  if (propType === 'plot') return 'plot'
  if (propType === 'villa' || propType === 'commercial') return 'house'
  if (propType === 'apartment') return 'apartment'
  return 'all'
}

/** Does listing match selected browse category? */
export function propertyMatchesCategory(property, category) {
  if (category === 'all') return true
  if (category === 'plot') return property.type === 'land' || property.type === 'agriculture'
  return property.type === category
}
