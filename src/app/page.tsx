'use client'

import { PlanningContextProvider } from './context/PlanningContext'
import { Home } from './pages/Home/Home'

export default function App() {
  return (
    <PlanningContextProvider>
      <Home />
    </PlanningContextProvider>
  )
}
