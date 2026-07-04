import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function GuestBrowseLink({
  to = '/browse',
  state,
  className = '',
  children,
  onClick,
}) {
  const { continueAsGuest } = useAuth()
  const navigate = useNavigate()

  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    continueAsGuest()
    navigate(to, { state })
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
