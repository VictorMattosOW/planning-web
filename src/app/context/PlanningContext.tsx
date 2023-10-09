import { ReactNode, createContext } from 'react'

export interface DayPlanning {
  dayOfWeek: string
  selected: boolean
  tasks: string[]
}

const daysOfWeek: DayPlanning[] = [
  {
    dayOfWeek: 'Segunda',
    selected: false,
    tasks: [],
  },
  {
    dayOfWeek: 'Terça',
    selected: false,
    tasks: [],
  },
  {
    dayOfWeek: 'Quarta',
    selected: false,
    tasks: [],
  },
  {
    dayOfWeek: 'Quinta',
    selected: false,
    tasks: [],
  },
  {
    dayOfWeek: 'Sexta',
    selected: false,
    tasks: [],
  },
  {
    dayOfWeek: 'Sábado',
    selected: false,
    tasks: [],
  },
  {
    dayOfWeek: 'Domingo',
    selected: false,
    tasks: [],
  },
]

interface PlanningContextProvidersProps {
  children: ReactNode
}

interface PlanningContextType {
  daysOfWeek: DayPlanning[]
}

export const PlanningContext = createContext({} as PlanningContextType)

export function PlanningContextProvider({
  children,
}: PlanningContextProvidersProps) {
  return (
    <PlanningContext.Provider
      value={{
        daysOfWeek,
      }}
    >
      {children}
    </PlanningContext.Provider>
  )
}
