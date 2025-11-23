import {configureStore} from "@reduxjs/toolkit";
import screenReducer from "@/store/slices/screenSlice";
import themeReducer from "@/store/slices/themeSlice";

const store = configureStore({
    reducer: {
        screen: screenReducer,
        theme: themeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;