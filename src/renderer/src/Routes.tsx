import { Router, Route } from 'electron-router-dom'

import { Home } from './pages/home'
import { About } from './pages/about'
import { Create } from './pages/create'
import { Details } from './pages/details'
import { Layout } from './components/layout'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/about" element={<About />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>
      }
    />
  )
}
