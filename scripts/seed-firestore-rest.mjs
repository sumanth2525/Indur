/**
 * Seeds sample Firestore documents so collections appear in Firebase Console.
 * Uses gcloud user credentials (firebase/gcloud login required).
 *
 * Run: node seed-firestore-rest.mjs
 */
import { execSync } from 'node:child_process'

const projectId = 'nizamabad-698d9'
const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`

function getAccessToken() {
  try {
    return execSync('gcloud auth print-access-token', { encoding: 'utf8' }).trim()
  } catch {
    throw new Error('Run: gcloud auth login && gcloud config set project nizamabad-698d9')
  }
}

function str(v) {
  return { stringValue: String(v) }
}

function num(v) {
  return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v }
}

function bool(v) {
  return { booleanValue: v }
}

function ts(date = new Date()) {
  return { timestampValue: date.toISOString() }
}

function map(fields) {
  return { mapValue: { fields } }
}

function arr(values) {
  return { arrayValue: { values } }
}

async function createDoc(collection, documentId, fields) {
  const url = documentId
    ? `${baseUrl}/${collection}?documentId=${encodeURIComponent(documentId)}`
    : `${baseUrl}/${collection}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  })
  const body = await res.text()
  if (!res.ok) {
    throw new Error(`Failed ${collection}/${documentId || '(auto)'}: ${res.status} ${body}`)
  }
  return JSON.parse(body)
}

const token = getAccessToken()
const now = new Date()
const demoUserId = 'demo-indur-user'
const demoListingId = 'demo-listing-2bhk'
const demoConversationId = 'demo-conversation-1'
const demoTicketId = 'demo-ticket-1'

console.log(`Seeding Firestore project: ${projectId}\n`)

await createDoc('profiles', demoUserId, {
  name: str('Demo User'),
  email: str('demo@indur.site'),
  phone: str('+919876543210'),
  photoURL: str(''),
  location: str('Nizamabad'),
  saved: arr([str(demoListingId)]),
  views: num(0),
  authProvider: str('google'),
  lang: str('en'),
  createdAt: ts(now),
  updatedAt: ts(now),
})

await createDoc('publicProfiles', demoUserId, {
  name: str('Demo User'),
  photoURL: str(''),
  updatedAt: ts(now),
})

await createDoc('listings', demoListingId, {
  type: str('house'),
  purpose: str('sell'),
  title: str('2BHK House in Nizamabad Town'),
  description: str('Sample listing for Indur Real estate. Ready to move, east facing, near main road.'),
  price: num(4500000),
  location: map({
    area: str('Kanteshwar'),
    mandal: str('Nizamabad Urban'),
    city: str('Nizamabad'),
    lat: num(18.6725),
    lng: num(78.0941),
  }),
  images: arr([
    str('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ]),
  sellerId: str(demoUserId),
  status: str('active'),
  sqft: num(1200),
  bedrooms: num(2),
  facing: str('East'),
  readyToMove: bool(true),
  views: num(12),
  saveCount: num(1),
  createdAt: ts(now),
  updatedAt: ts(now),
})

await createDoc('listings', 'demo-listing-rent', {
  type: str('apartment'),
  purpose: str('rent'),
  title: str('2BHK Apartment for Rent — Armoor Road'),
  description: str('Sample rental listing. Furnished flat with parking.'),
  price: num(18000),
  location: map({
    area: str('Armoor Road'),
    city: str('Nizamabad'),
    lat: num(18.79),
    lng: num(78.29),
  }),
  images: arr([
    str('https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ]),
  sellerId: str(demoUserId),
  status: str('active'),
  sqft: num(1100),
  bedrooms: num(2),
  facing: str('North'),
  readyToMove: bool(true),
  views: num(5),
  saveCount: num(0),
  createdAt: ts(now),
  updatedAt: ts(now),
})

await createDoc('conversations', demoConversationId, {
  propertyId: str(demoListingId),
  buyerId: str('demo-buyer-user'),
  sellerId: str(demoUserId),
  messages: arr([
    map({
      id: str('msg-1'),
      senderId: str('demo-buyer-user'),
      text: str('Is this property still available?'),
      timestamp: ts(now),
    }),
  ]),
  createdAt: ts(now),
  updatedAt: ts(now),
})

await createDoc('tickets', demoTicketId, {
  userId: str(demoUserId),
  subject: str('Help posting my first ad'),
  message: str('Sample support ticket so the tickets collection is visible in Console.'),
  status: str('open'),
  createdAt: ts(now),
})

console.log('Created collections and documents:')
console.log('  profiles/' + demoUserId)
console.log('  publicProfiles/' + demoUserId)
console.log('  listings/' + demoListingId)
console.log('  listings/demo-listing-rent')
console.log('  conversations/' + demoConversationId)
console.log('  tickets/' + demoTicketId)
console.log('')
console.log('Open Firebase Console:')
console.log(`  https://console.firebase.google.com/project/${projectId}/firestore/databases/-default-/data`)
