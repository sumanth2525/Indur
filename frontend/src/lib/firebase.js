import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getAuth, initializeAuth, indexedDBLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

export const firebaseEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)
export const analyticsEnabled = firebaseEnabled && Boolean(firebaseConfig.measurementId)

const app = firebaseEnabled ? initializeApp(firebaseConfig) : null

function createAuth(firebaseApp) {
  try {
    return initializeAuth(firebaseApp, { persistence: indexedDBLocalPersistence })
  } catch (err) {
    if (err.code === 'auth/already-initialized') return getAuth(firebaseApp)
    throw err
  }
}

export const auth = app ? createAuth(app) : null
export const db = app ? getFirestore(app) : null
export const firebaseStorage = app ? getStorage(app) : null

let analyticsInstance = null
let analyticsInitPromise = null

export function getAnalyticsInstance() {
  if (!analyticsEnabled || !app) return Promise.resolve(null)
  if (analyticsInstance) return Promise.resolve(analyticsInstance)
  if (!analyticsInitPromise) {
    analyticsInitPromise = isSupported().then((supported) => {
      if (!supported) return null
      analyticsInstance = getAnalytics(app)
      return analyticsInstance
    })
  }
  return analyticsInitPromise
}

export { app }
