import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  incidents: JSON.parse(localStorage.getItem('incidents') || '[]'),
  filters: {},
  loading: false,
  error: null,
};

const incidentsSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    addIncident: (state, action) => {
      state.incidents.push(action.payload);
      localStorage.setItem('incidents', JSON.stringify(state.incidents));
    },
    updateIncident: (state, action) => {
      const index = state.incidents.findIndex(inc => inc.id === action.payload.id);
      if (index !== -1) {
        state.incidents[index] = action.payload;
        localStorage.setItem('incidents', JSON.stringify(state.incidents));
      }
    },
    deleteIncident: (state, action) => {
      state.incidents = state.incidents.filter(inc => inc.id !== action.payload);
      localStorage.setItem('incidents', JSON.stringify(state.incidents));
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { addIncident, updateIncident, deleteIncident, setFilters } = incidentsSlice.actions;
export default incidentsSlice.reducer;