import {
  SquareMinus,
  SquareArrowOutDownLeft,
  SquareArrowOutUpRight,
  X,
  SquareX
} from 'lucide-react'
import icon from '../../../../../resources/icon.png'
import { useState } from 'react'

export function CustomMenuBar() {
  const [swapIcon, setSwapIcon] = useState<boolean>(false)

  function minimize() {
    window.api.manualMinimize()
  }

  function maximize() {
    window.api.manualMaximize()
    setSwapIcon(!swapIcon)
  }

  function close() {
    window.api.manualClose()
  }

  return (
    <nav
      id="custom-menubar"
      className="region-drag h-9 flex items-center text-white px-2 py-[1px] bg-zinc-900"
    >
      <div className="flex flex-row items-center gap-2">
        <img src={icon} alt="Dev Clientes" className="h-6 w-6" />
        <p className="select-none text-base font-medium">Dev Clientes</p>
      </div>

      <div className="ml-auto flex items-center gap-2 h-full">
        <button
          onClick={minimize}
          className="bg-zinc-700 p-[2px] rounded hover:scale-90 transition-all duration-300"
        >
          <SquareMinus size={19} />
        </button>
        <button
          onClick={maximize}
          className="bg-zinc-700 p-[2px] rounded hover:scale-90 transition-all duration-300"
        >
          {swapIcon ? <SquareArrowOutDownLeft size={19} /> : <SquareArrowOutUpRight size={19} />}
        </button>
        <button
          onClick={close}
          className="bg-zinc-700 p-[2px] rounded hover:scale-90 transition-all duration-300"
        >
          <SquareX size={19} />
        </button>
      </div>
    </nav>
  )
}
