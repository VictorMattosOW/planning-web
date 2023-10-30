// import { Cycle } from './reducer'

import { Task } from '../context/PlanningContext'

export enum ActionTypes {
  create = 'create',
  changeSelectedState = 'changeSelectedState',
  finished = 'finished',
  deleted = 'deleted',
}

export function changeSelectedState(index: number) {
  return {
    type: ActionTypes.changeSelectedState,
    payload: {
      index,
    },
  }
}

export function addNewTaskAction(newTask: Task) {
  return {
    type: ActionTypes.create,
    payload: {
      newTask,
    },
  }
}

export function deleteTaskAction(id: string, day: string) {
  return {
    type: ActionTypes.deleted,
    payload: {
      id,
      day,
    },
  }
}

export function finishedTaskAction(id: string, checked: boolean, day: string) {
  return {
    type: ActionTypes.finished,
    payload: {
      id,
      checked,
      day,
    },
  }
}
