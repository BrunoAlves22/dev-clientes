import { CollapsibleContent, CollapsibleTrigger } from '../collapsible'
import { CaretLeftIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { LinkContent } from '../link'

export function Sidebar() {
  const isMacOS = process.platform === 'darwin'

  return (
    <CollapsibleContent className="bg-gray-950 flex-shrink-0 border-r border-slate-600 h-screen relative group overflow-hidden data-[state=open]:animate-slide-in data-[state=closed]:animate-slide-out">
      <CollapsibleTrigger
        className={clsx(
          'absolute h-7 w-7 right-4 bg-gray-100 p-1 rounded-full z-[99] text-gray-800 hover:bg-gray-300 transition-colors duration-200 inline-flex items-center justify-center',
          {
            'top-[1.125rem]': isMacOS,
            'top-6': !isMacOS
          }
        )}
      >
        <CaretLeftIcon className="w-7 h-7" />
      </CollapsibleTrigger>

      <div
        className={clsx('region-drag h-14 z-0 mt-10', {
          block: isMacOS,
          hidden: !isMacOS
        })}
      ></div>

      <div
        className={clsx(
          'flex flex-1 flex-col h-full gap-8 w-[220px] transition-opacity group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0 duration-1000',
          {
            'pt-6': !isMacOS
          }
        )}
      >
        <nav className="flex flex-col mx-2 gap-8 text-slate-100">
          <div className="flex flex-col gap-2">
            <div className="text-white font-semibold uppercase mb-2 ml-2">Menu</div>
          </div>
          <section className="flex flex-col gap-2">
            <LinkContent to="/">Clientes</LinkContent>
            <LinkContent to="/create">Cadastrar Clientes</LinkContent>
            <LinkContent to="/about">Sobre</LinkContent>
          </section>
        </nav>
      </div>
    </CollapsibleContent>
  )
}
