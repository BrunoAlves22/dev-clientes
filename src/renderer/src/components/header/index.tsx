import clsx from 'clsx'
import { CollapsibleTrigger } from '../collapsible'
import { CaretRightIcon } from '@radix-ui/react-icons'

interface HeaderProps {
  isSidebarOpen: boolean
}

export function Header({ isSidebarOpen }: HeaderProps) {
  const isMacOS = process.platform === 'darwin'

  return (
    <div
      id="header"
      className={clsx(
        'flex items-center gap-4 leading-tight border-b border-slate-600 transition-all duration-200 py-[1.125rem] px-6 region-drag',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-220px)]': isSidebarOpen
        }
      )}
    >
      <CollapsibleTrigger
        className={clsx(
          'h-7 w-7 text-gray-800 bg-gray-100 hover:bg-gray-300 transition-colors duration-200 p-1 rounded-full z-[99]',
          {
            hidden: isSidebarOpen,
            block: !isSidebarOpen
          }
        )}
      >
        <CaretRightIcon className="w-5 h-5" />
      </CollapsibleTrigger>

      <>
        <h1 className="text-white font-bold text-xl">Dev Clientes</h1>
      </>
    </div>
  )
}
