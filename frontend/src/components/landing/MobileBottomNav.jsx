import { Link, useLocation } from 'react-router-dom'
import Icon from '../Icon'

const items = [
  { to: '/', icon: 'home', label: 'Home', end: true },
  { to: '/#search', icon: 'search', label: 'Search', hash: true },
  { to: '/login', icon: 'add_circle', label: 'Post' },
  { to: '/login', icon: 'bookmark', label: 'Saved' },
  { to: '/login', icon: 'person', label: 'Profile' },
]

export default function MobileBottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="flex items-center justify-around py-1">
        {items.map((item) => {
          const isActive = item.end ? pathname === item.to : pathname.startsWith(item.to.replace('/#search', ''))
          const className = `flex min-h-11 min-w-[56px] flex-col items-center justify-center gap-0.5 px-2 text-[10px] font-medium transition ${
            isActive && !item.hash ? 'text-brand' : 'text-muted'
          }`

          if (item.hash) {
            return (
              <a key={item.label} href="#search" className={className}>
                <Icon name={item.icon} size={22} />
                <span>{item.label}</span>
              </a>
            )
          }

          return (
            <Link key={item.label} to={item.to} className={className}>
              <Icon name={item.icon} size={22} filled={isActive} />
              <span className={isActive ? 'font-semibold' : ''}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
