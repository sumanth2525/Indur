import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { fetchProfileById } from '../services/dataApi'
import {
  firebaseSignOut,
  signInWithGoogle as firebaseGoogleSignIn,
  completePhoneSignIn,
  subscribeToAuthChanges,
} from '../services/firebaseAuth'
import { sendPhoneOtp, verifyPhoneOtp, resetPhoneAuth } from '../services/phoneAuth'
import { GUEST_USER, isGuestSessionActive, setGuestSession } from './guestUser'

const AuthContext = createContext(null)

export { AuthContext }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((nextUser) => {
      if (nextUser) {
        setGuestSession(false)
        setUser(nextUser)
      } else if (isGuestSessionActive()) {
        setUser(GUEST_USER)
      } else {
        setUser(null)
      }
      setAuthReady(true)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const loginWithGoogle = useCallback(async () => {
    setLoading(true)
    try {
      setGuestSession(false)
      const signedIn = await firebaseGoogleSignIn()
      setUser(signedIn)
      return signedIn
    } finally {
      setLoading(false)
    }
  }, [])

  const loginWithPhone = useCallback(async (phone, otp) => {
    setLoading(true)
    try {
      setGuestSession(false)
      const fbUser = await verifyPhoneOtp(otp)
      const signedIn = await completePhoneSignIn(fbUser, phone)
      setUser(signedIn)
      return signedIn
    } finally {
      setLoading(false)
    }
  }, [])

  const requestPhoneOtp = useCallback(async (phone) => {
    await sendPhoneOtp(phone)
  }, [])

  const continueAsGuest = useCallback(() => {
    setGuestSession(true)
    setUser(GUEST_USER)
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      if (user?.isGuest) {
        setGuestSession(false)
        setUser(null)
        return
      }
      resetPhoneAuth()
      await firebaseSignOut()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [user?.isGuest])

  const refreshUser = useCallback(async () => {
    if (!user?.id) return
    const fresh = await fetchProfileById(user.id)
    if (fresh) setUser(fresh)
  }, [user?.id])

  const isGuest = Boolean(user?.isGuest)
  const isAuthenticated = Boolean(user && !user.isGuest)

  const value = useMemo(
    () => ({
      user,
      loading: loading || !authReady,
      isGuest,
      isAuthenticated,
      loginWithGoogle,
      loginWithPhone,
      requestPhoneOtp,
      continueAsGuest,
      logout,
      refreshUser,
      setUser,
    }),
    [
      user,
      loading,
      authReady,
      isGuest,
      isAuthenticated,
      loginWithGoogle,
      loginWithPhone,
      requestPhoneOtp,
      continueAsGuest,
      logout,
      refreshUser,
    ],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
