import {createSlice} from "@reduxjs/toolkit";

const screenSlice = createSlice({
    name: "screen",
    initialState: {
        width: typeof window !== "undefined" ? window.innerWidth : 1920,
        isDekstop: typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
    },
    reducers: {
        setScreenSize: (state, action) => {
            const width = action.payload;
            state.width = width;
            state.isDekstop = width >= 1024;
        }
    }
});

export const { setScreenSize } = screenSlice.actions;
export default screenSlice.reducer;