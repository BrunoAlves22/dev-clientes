import { Outlet } from 'react-router-dom'
import { Header } from '../header'
import { CustomMenuBar } from '../custom-menubar'
import { Collapsible } from '../collapsible'
import { Sidebar } from '../sidebar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    function handleNavigate() {
      navigate('/create')
    }

    const unsub = window.api.onNewClient(handleNavigate)

    return () => {
      unsub()
    }
  }, [])

  return (
    <>
      <CustomMenuBar />
      <Collapsible
        defaultOpen
        onOpenChange={setIsSidebarOpen}
        className="h-screen w-screen bg-gray-950 text-slate-100 flex"
      >
        <Sidebar />
        <div className="flex flex-1 flex-col max-h-screen">
          <Header isSidebarOpen={isSidebarOpen} />
          <Outlet />
        </div>
      </Collapsible>
    </>
  )
}
