export const GUEST_SESSION_KEY = 'indur_guest'

export const GUEST_USER = {
  id: null,
  isGuest: true,
  name: 'Guest',
  email: '',
  phone: '',
  photoURL: '',
  authProvider: 'guest',
  lang: 'en',
  location: 'Nizamabad',
  saved: [],
  views: 0,
}

export function isGuestSessionActive() {
  try {
    return sessionStorage.getItem(GUEST_SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function setGuestSession(active) {
  try {
    if (active) sessionStorage.setItem(GUEST_SESSION_KEY, '1')
    else sessionStorage.removeItem(GUEST_SESSION_KEY)
  } catch {
    /* ignore storage errors */
  }
}
