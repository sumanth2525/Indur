import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../i18n/LanguageContext'
import { AuthContext } from '../context/AuthContext'

const defaultAuth = {
  user: { id: 'user-1', name: 'Test User', saved: [] },
  loading: false,
  isGuest: false,
  isAuthenticated: true,
  loginWithGoogle: vi.fn(),
  loginWithPhone: vi.fn(),
  requestPhoneOtp: vi.fn(),
  continueAsGuest: vi.fn(),
  logout: vi.fn(),
  refreshUser: vi.fn(),
  setUser: vi.fn(),
}

export function renderWithProviders(ui, { route = '/', routeState, auth = {} } = {}) {
  const authValue = { ...defaultAuth, ...auth }
  const initialEntry = routeState ? { pathname: route, state: routeState } : route

  return {
    auth: authValue,
    ...render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <AuthContext.Provider value={authValue}>
          <LanguageProvider>{ui}</LanguageProvider>
        </AuthContext.Provider>
      </MemoryRouter>,
    ),
  }
}
