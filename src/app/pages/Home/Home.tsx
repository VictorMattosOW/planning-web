'use client'

import { PlanningContext } from '@/app/context/PlanningContext'
import { Column } from './components/Column'
import { Header } from './components/Header'
import { useContext } from 'react'

export function Home() {
  const { daysOfWeek } = useContext(PlanningContext)
  console.log(daysOfWeek)
  return (
    <div className="p-5">
      <Header daysOfWeek={daysOfWeek} />
      <div className="grid grid-cols-7 place-items-center max-md:grid-cols-5 max-sm:grid-cols-1 gap-4 px-32">
        {daysOfWeek.map((d) => {
          return <Column key={d.dayOfWeek} day={d.dayOfWeek} />
        })}
      </div>
    </div>
  )
}
