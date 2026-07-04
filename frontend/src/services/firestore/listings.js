import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db, firebaseEnabled } from '../../lib/firebase'
import { COLLECTIONS, docToListing, listingToFirestore } from './schema'

const listingsRef = () => collection(db, COLLECTIONS.listings)

export async function getListing(id) {
  if (!firebaseEnabled || !db) return null
  const snap = await getDoc(doc(db, COLLECTIONS.listings, id))
  if (!snap.exists()) return null
  return docToListing(snap.id, snap.data())
}

export async function getActiveListings() {
  if (!firebaseEnabled || !db) return []
  const q = query(
    listingsRef(),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => docToListing(d.id, d.data()))
}

export async function getListingsBySeller(sellerId) {
  if (!firebaseEnabled || !db) return []
  const q = query(
    listingsRef(),
    where('sellerId', '==', sellerId),
    orderBy('createdAt', 'desc'),
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => docToListing(d.id, d.data()))
}

export function subscribeActiveListings(onListings, onError) {
  if (!firebaseEnabled || !db) return () => {}
  const q = query(
    listingsRef(),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
  )
  return onSnapshot(
    q,
    (snap) => onListings(snap.docs.map((d) => docToListing(d.id, d.data()))),
    onError,
  )
}

export async function createListing(data, sellerId) {
  if (!firebaseEnabled || !db) return null
  const payload = {
    ...listingToFirestore({ ...data, sellerId, views: 0, saveCount: 0, status: 'active' }),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  const ref = await addDoc(listingsRef(), payload)
  return getListing(ref.id)
}

export async function updateListing(id, updates) {
  if (!firebaseEnabled || !db) return null
  const ref = doc(db, COLLECTIONS.listings, id)
  const allowed = {}
  const fields = [
    'type', 'purpose', 'title', 'description', 'price', 'location', 'images',
    'status', 'sqft', 'acres', 'bedrooms', 'facing', 'readyToMove', 'views',
  ]
  for (const key of fields) {
    if (updates[key] !== undefined) allowed[key] = updates[key]
  }
  await updateDoc(ref, { ...allowed, updatedAt: serverTimestamp() })
  return getListing(id)
}

export async function deleteListing(id) {
  if (!firebaseEnabled || !db) return
  await deleteDoc(doc(db, COLLECTIONS.listings, id))
}

export async function incrementListingViews(id) {
  if (!firebaseEnabled || !db) return
  await updateDoc(doc(db, COLLECTIONS.listings, id), {
    views: increment(1),
    updatedAt: serverTimestamp(),
  })
}

export async function adjustSaveCount(id, delta) {
  if (!firebaseEnabled || !db) return
  await updateDoc(doc(db, COLLECTIONS.listings, id), {
    saveCount: increment(delta),
    updatedAt: serverTimestamp(),
  })
}

export async function setListingImages(id, images) {
  return updateListing(id, { images })
}
