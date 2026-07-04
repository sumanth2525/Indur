import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { COLLECTIONS, docToTicket } from './schema'

export async function createTicket(userId, subject, message) {
  const ref = await addDoc(collection(db, COLLECTIONS.tickets), {
    userId,
    subject,
    message,
    status: 'open',
    createdAt: serverTimestamp(),
  })
  const snap = await getDoc(doc(db, COLLECTIONS.tickets, ref.id))
  return docToTicket(snap.id, snap.data())
}
