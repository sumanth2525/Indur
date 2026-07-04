import { logEvent, setUserId } from 'firebase/analytics'
import { getAnalyticsInstance } from '../lib/firebase'

async function withAnalytics(fn) {
  const analytics = await getAnalyticsInstance()
  if (!analytics) return
  fn(analytics)
}

export async function trackPageView(pagePath, pageTitle) {
  await withAnalytics((analytics) => {
    logEvent(analytics, 'page_view', {
      page_path: pagePath,
      page_title: pageTitle || pagePath,
    })
  })
}

export async function trackEvent(name, params = {}) {
  await withAnalytics((analytics) => {
    logEvent(analytics, name, params)
  })
}

export async function identifyUser(userId) {
  await withAnalytics((analytics) => {
    setUserId(analytics, userId)
  })
}

export async function clearUser() {
  await withAnalytics((analytics) => {
    setUserId(analytics, null)
  })
}

export function trackPropertyClick(property, source = 'browse') {
  trackEvent('property_click', {
    property_id: property.id,
    property_type: property.type,
    city: property.location?.city,
    price: property.price,
    source,
  })
}

export function trackPropertyView(property) {
  trackEvent('property_view', {
    property_id: property.id,
    property_type: property.type,
    city: property.location?.city,
    price: property.price,
  })
}

export function trackContactSeller(propertyId) {
  trackEvent('contact_seller', { property_id: propertyId })
}

export function trackSaveProperty(propertyId, saved) {
  trackEvent('save_property', { property_id: propertyId, saved })
}

export function trackLogin(method) {
  trackEvent('login', { method })
}
