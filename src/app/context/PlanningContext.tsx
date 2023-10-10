import { ReactNode, createContext, useState } from 'react'

export interface Task {
  title: string
  finished: boolean
}

export interface DayPlanning {
  dayOfWeek: string
  selected: boolean
  tasks: Task[]
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
  tasks: DayPlanning[]
  handleCheckbox: (index: number) => void
  handleAddTask: (task: Task) => void
}

export const PlanningContext = createContext({} as PlanningContextType)

export function PlanningContextProvider({
  children,
}: PlanningContextProvidersProps) {
  const [tasks, setTasks] = useState<DayPlanning[]>(daysOfWeek)

  function handleCheckbox(index: number) {
    const updatedTasks = tasks.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item,
    )

    setTasks(updatedTasks)
  }

  function handleAddTask({ title, finished }: Task) {
    const taskWeekUpdated: DayPlanning[] = tasks.map((item) => {
      if (item.selected) {
        return {
          ...item,
          selected: false,
          tasks: [
            ...item.tasks,
            {
              title,
              finished,
            },
          ],
        }
      }
      return item
    })

    setTasks(taskWeekUpdated)
  }

  return (
    <PlanningContext.Provider
      value={{
        handleCheckbox,
        handleAddTask,
        tasks,
      }}
    >
      {children}
    </PlanningContext.Provider>
  )
}
