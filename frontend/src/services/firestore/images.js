import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { firebaseEnabled, firebaseStorage } from '../../lib/firebase'

const MAX_BYTES = 5 * 1024 * 1024

function safeName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_')
}

export async function uploadListingImages(listingId, files) {
  if (!firebaseEnabled || !firebaseStorage) {
    throw new Error('Firebase Storage is not configured')
  }
  const urls = []
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    if (file.size > MAX_BYTES) {
      throw new Error(`${file.name} is too large (max 5 MB)`)
    }
    const path = `listings/${listingId}/${Date.now()}_${safeName(file.name)}`
    const storageRef = ref(firebaseStorage, path)
    await uploadBytes(storageRef, file, { contentType: file.type })
    urls.push(await getDownloadURL(storageRef))
  }
  return urls
}

export async function uploadProfilePhoto(userId, file) {
  if (!firebaseEnabled || !firebaseStorage) {
    throw new Error('Firebase Storage is not configured')
  }
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files are allowed')
  }
  if (file.size > MAX_BYTES) {
    throw new Error('Image must be under 5 MB')
  }
  const ext = file.name.split('.').pop() || 'jpg'
  const path = `profiles/${userId}/avatar.${safeName(ext)}`
  const storageRef = ref(firebaseStorage, path)
  await uploadBytes(storageRef, file, { contentType: file.type })
  return getDownloadURL(storageRef)
}

export async function deleteStorageFile(path) {
  if (!firebaseEnabled || !firebaseStorage) return
  await deleteObject(ref(firebaseStorage, path))
}
