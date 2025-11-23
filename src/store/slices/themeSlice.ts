import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Theme = 'light' | 'dark';

interface ThemeState {
    mode: Theme;
}

const initialState: ThemeState = {
    mode: 'light'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            if (typeof window !== "undefined") {
                localStorage.setItem('theme', state.mode)
            }
        },
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.mode = action.payload
            if (typeof window !== "undefined") {
                localStorage.setItem('theme', action.payload)
            }
        }
    }
})

export const {toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;