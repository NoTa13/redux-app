import { configureStore } from '@reduxjs/toolkit'
import uiReducer from '../features/ui/uiSlice'
import operatorsReducer from '../features/operators/operatorsSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    operators: operatorsReducer, // Это связывает твой код с экраном
  },
})