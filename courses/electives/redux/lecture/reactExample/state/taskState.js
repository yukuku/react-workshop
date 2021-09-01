import { createReducer, createAction } from '@reduxjs/toolkit'

export const actions = {
  load: createAction('LOAD_TASK'),
}

const initialState = { task: null }

export const taskReducer = createReducer(initialState, {
  [actions.load]: (state, action) => {
    return { ...state, task: action.payload.task }
  },
})
