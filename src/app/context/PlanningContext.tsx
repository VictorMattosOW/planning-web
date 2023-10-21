import { ReactNode, createContext, useState } from 'react'

export interface Task {
  title: string
  finished: boolean
  id: string
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
  dailyTasks: DayPlanning[]
  handleCheckbox: (index: number) => void
  handleAddTask: (task: Task) => void
  handleDeleteTask: (id: string, day: string) => void
  handleFinishedTask: (id: string, checked: boolean, day: string) => void
}

export const PlanningContext = createContext({} as PlanningContextType)

export function PlanningContextProvider({
  children,
}: PlanningContextProvidersProps) {
  const [dailyTasks, setDailyTasks] = useState<DayPlanning[]>(daysOfWeek)

  function handleCheckbox(index: number) {
    const updatedTasks = dailyTasks.map((item, i) =>
      i === index ? { ...item, selected: !item.selected } : item,
    )

    setDailyTasks(updatedTasks)
  }

  function handleAddTask({ title, finished, id }: Task) {
    const taskWeekUpdated: DayPlanning[] = dailyTasks.map((item) => {
      if (item.selected) {
        return {
          ...item,
          selected: false,
          tasks: [
            ...item.tasks,
            {
              title,
              finished,
              id: crypto.randomUUID(),
            },
          ],
        }
      }
      return item
    })

    setDailyTasks(taskWeekUpdated)
  }

  function handleDeleteTask(id: string, day: string) {
    const deletedTask = dailyTasks.map((item) => {
      if (item.dayOfWeek === day) {
        const deleted = item.tasks.filter((t) => t.id !== id)
        return {
          ...item,
          tasks: [...deleted],
        }
      }
      return item
    })
    setDailyTasks(deletedTask)
  }

  function handleFinishedTask(id: string, checked: boolean, day: string) {
    const finishedTask = dailyTasks.map((item) => {
      if (item.dayOfWeek === day) {
        const finishedTask = item.tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              finished: checked,
            }
          }
          return task
        })
        return {
          ...item,
          tasks: [...finishedTask],
        }
      }
      return item
    })
    setDailyTasks(finishedTask)
  }
  return (
    <PlanningContext.Provider
      value={{
        dailyTasks,
        handleCheckbox,
        handleAddTask,
        handleDeleteTask,
        handleFinishedTask,
      }}
    >
      {children}
    </PlanningContext.Provider>
  )
}
