/**
 * Seeds mock Firestore data (listings + sample profile fields).
 *
 * Run from repo root:
 *   1. Firebase Console → Project settings → Service accounts → Generate new private key
 *   2. Save the JSON file outside the repo (e.g. ~/nizamabad-service-account.json)
 *   3. Set env var and run:
 *        $env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\service-account.json"
 *        cd scripts
 *        npm install
 *        node seed-mock-listing.mjs
 */
import { readFileSync, existsSync } from 'node:fs'
import { initializeApp, cert, applicationDefault } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'

const projectId = 'nizamabad-698d9'
const mockSellerId = 'mock-seller-demo'

function initAdmin() {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
  if (credPath && existsSync(credPath)) {
    const serviceAccount = JSON.parse(readFileSync(credPath, 'utf8'))
    return initializeApp({ credential: cert(serviceAccount), projectId })
  }
  return initializeApp({ credential: applicationDefault(), projectId })
}

initAdmin()

const db = getFirestore()
const now = Timestamp.now()

const mockListing = {
  type: 'house',
  purpose: 'sell',
  title: '2BHK House in Nizamabad Town',
  description: 'Mock listing for testing. Spacious 2BHK near main road, ready to move.',
  price: 4500000,
  location: {
    area: 'Nizamabad Town',
    mandal: 'Nizamabad Urban',
    city: 'Nizamabad',
    lat: 18.6725,
    lng: 78.0941,
  },
  images: [
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
  ],
  sellerId: mockSellerId,
  status: 'active',
  sqft: 1200,
  bedrooms: 2,
  facing: 'East',
  readyToMove: true,
  views: 0,
  saveCount: 0,
  createdAt: now,
  updatedAt: now,
}

const mockProfile = {
  name: 'Demo Seller',
  email: 'demo@nizamabad.app',
  phone: '+919999999999',
  photoURL: '',
  location: 'Nizamabad',
  saved: [],
  views: 0,
  authProvider: 'firebase',
  lang: 'en',
  createdAt: now,
  updatedAt: now,
}

const mockPublicProfile = {
  name: 'Demo Seller',
  photoURL: '',
  updatedAt: now,
}

async function main() {
  const listingRef = await db.collection('listings').add(mockListing)
  await db.collection('profiles').doc(mockSellerId).set(mockProfile, { merge: true })
  await db.collection('publicProfiles').doc(mockSellerId).set(mockPublicProfile, { merge: true })

  console.log('Seeded Firestore collections:')
  console.log(`  listings/${listingRef.id}`)
  console.log(`  profiles/${mockSellerId}`)
  console.log(`  publicProfiles/${mockSellerId}`)
  console.log('')
  console.log('Open Firestore:')
  console.log(`  https://console.firebase.google.com/project/${projectId}/firestore/databases/-default-/data`)
}

main().catch((err) => {
  console.error('Seed failed:', err.message)
  console.error('')
  console.error('If auth failed:')
  console.error('  1. Firebase Console → Project settings → Service accounts → Generate new private key')
  console.error('  2. $env:GOOGLE_APPLICATION_CREDENTIALS="C:\\path\\to\\key.json"')
  console.error('  3. cd scripts && node seed-mock-listing.mjs')
  console.error('Or add a document manually in Firebase Console (see README).')
  process.exit(1)
})
