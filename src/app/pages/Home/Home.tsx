'use client'

import { PlanningContext } from '@/app/context/PlanningContext'
import { Column } from './components/Column'
import { Header } from './components/Header'
import { useContext } from 'react'

export function Home() {
  const { tasks } = useContext(PlanningContext)
  return (
    <div className="p-5">
      <Header />
      <div className="grid grid-cols-7 place-items-center max-md:grid-cols-5 max-sm:grid-cols-1 gap-4 px-32">
        {tasks.map((d) => {
          return <Column key={d.dayOfWeek} day={d.dayOfWeek} task={d.tasks} />
        })}
      </div>
    </div>
  )
}
