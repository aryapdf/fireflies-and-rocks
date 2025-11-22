import {configureStore} from "@reduxjs/toolkit";
import screenReducer from "@/store/slices/screenSlice";
import themeReducer from "@/store/slices/themeSlice";
import sidebarReducer from "@/store/slices/sidebarSlice";
import animationReducer from "@/store/slices/animationSlice";

const store = configureStore({
    reducer: {
        screen: screenReducer,
        theme: themeReducer,
        sidebar: sidebarReducer,
        animation: animationReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
