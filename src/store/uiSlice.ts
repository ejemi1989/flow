import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isDarkMode: boolean;
  sidebarOpen: boolean;
  currentView: 'flow' | 'preview' | 'settings';
}

const initialState: UIState = {
  isDarkMode: false,
  sidebarOpen: true,
  currentView: 'flow',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setCurrentView: (state, action: PayloadAction<'flow' | 'preview' | 'settings'>) => {
      state.currentView = action.payload;
    },
  },
});

export const { toggleDarkMode, setSidebarOpen, setCurrentView } = uiSlice.actions;
export default uiSlice.reducer;