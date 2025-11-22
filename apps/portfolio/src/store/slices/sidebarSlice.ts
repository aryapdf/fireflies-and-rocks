import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  isVisible: boolean;
  activeSection: string;
  isAutoHideEnabled: boolean;
}

const initialState: SidebarState = {
  isVisible: true,
  activeSection: 'home',
  isAutoHideEnabled: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    show: (state) => { state.isVisible = true },
    hide: (state) => { state.isVisible = false },
    toggle: (state) => { state.isVisible = !state.isVisible },
    enableAutoHide: (state) => { state.isAutoHideEnabled = true },
    disableAutoHide: (state) => { state.isAutoHideEnabled = false },
    setActiveSection: (state, action: PayloadAction<string>) => { state.activeSection = action.payload },
  }
});

export const { show, hide, toggle, enableAutoHide, disableAutoHide, setActiveSection } = sidebarSlice.actions;
export default sidebarSlice.reducer;
