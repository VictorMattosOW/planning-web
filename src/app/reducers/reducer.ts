import { DayPlanning } from '../context/PlanningContext'
import { ActionTypes } from './actions'
import { produce } from 'immer'

interface PlanningState {
  daysOfWeek: DayPlanning[]
}

export function planningReducer(state: PlanningState, action: any) {
  switch (action.type) {
    case ActionTypes.changeSelectedState: {
      return produce(state, (draft) => {
        const selected = draft.daysOfWeek[action.payload.index].selected
        draft.daysOfWeek[action.payload.index].selected = !selected
      })
    }

    case ActionTypes.create: {
      return produce(state, (draft) => {
        draft.daysOfWeek.forEach((day) => {
          if (day.selected) {
            day.tasks.push({
              ...action.payload.newTask,
              id: crypto.randomUUID(),
            })
            day.selected = false
          }
        })
      })
    }

    case ActionTypes.deleted: {
      let deletedIndex = 0
      state.daysOfWeek.forEach((d) => {
        if (d.dayOfWeek === action.payload.day) {
          deletedIndex = d.tasks.findIndex((d) => d.id === action.payload.id)
        }
      })

      return produce(state, (draft) => {
        return draft.daysOfWeek.forEach((d) => {
          if (d.dayOfWeek === action.payload.day) {
            d.tasks.splice(deletedIndex, 1)
          }
        })
      })
    }

    case ActionTypes.finished: {
      let finishedTask = 0
      state.daysOfWeek.forEach((d) => {
        if (d.dayOfWeek === action.payload.day) {
          finishedTask = d.tasks.findIndex((t) => t.id === action.payload.id)
        }
      })

      return produce(state, (draft) => {
        draft.daysOfWeek.forEach((d) => {
          if (d.dayOfWeek === action.payload.day) {
            d.tasks[finishedTask].finished = action.payload.checked
          }
        })
      })
    }

    default:
      return state
  }
}
