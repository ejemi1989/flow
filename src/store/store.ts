import { configureStore } from '@reduxjs/toolkit';
import workflowReducer from './workflowSlice';
import uiReducer from './uiSlice';
import apiReducer from './apiSlice';

export const store = configureStore({
  reducer: {
    workflow: workflowReducer,
    ui: uiReducer,
    api: apiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;