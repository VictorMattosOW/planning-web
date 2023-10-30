import { ReactNode, createContext, useReducer, useState } from 'react'
import { planningReducer } from '../reducers/reducer'
import {
  addNewTaskAction,
  changeSelectedState,
  deleteTaskAction,
  finishedTaskAction,
} from '../reducers/actions'

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
  // TODO: guardar as tasks no localStorage e fazer a verificação do dia.
  const [planningState, dispatch] = useReducer(planningReducer, { daysOfWeek })
  const { daysOfWeek: dailyTasks } = planningState

  function handleCheckbox(index: number) {
    dispatch(changeSelectedState(index))
  }

  function handleAddTask(newTask: Task) {
    dispatch(addNewTaskAction(newTask))
  }

  function handleDeleteTask(id: string, day: string) {
    dispatch(deleteTaskAction(id, day))
  }

  function handleFinishedTask(id: string, checked: boolean, day: string) {
    dispatch(finishedTaskAction(id, checked, day))
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
