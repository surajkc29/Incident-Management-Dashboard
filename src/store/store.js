import { configureStore } from '@reduxjs/toolkit';
import incidentsReducer from './incidentsSlice';

export const store = configureStore({
  reducer: {
    incidents: incidentsReducer,
  },
});