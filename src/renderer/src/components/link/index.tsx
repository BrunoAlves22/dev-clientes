import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

interface LinkContentProps {
  to: string
  children: React.ReactNode
}

export function LinkContent({ to, children }: LinkContentProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return clsx('flex items-center text-base gap-4 py-2 px-3 rounded group', {
          'bg-gray-50 font-semibold text-black': isActive,
          'text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200':
            !isActive
        })
      }}
    >
      <span className="truncate flex-1">{children}</span>
    </NavLink>
  )
}
