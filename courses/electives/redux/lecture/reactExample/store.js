import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './state/counterState'
import { taskReducer } from './state/taskState'

const store = configureStore({
  reducer: {
    counterState: counterReducer,
    taskState: taskReducer,
  },
})

export default store
