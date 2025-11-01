import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {setTheme, Theme, toggleTheme} from "@/store/slices/themeSlice";

export const useTheme = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.mode);

    const toggle = () => dispatch(toggleTheme())
    const change = (newTheme: Theme) => dispatch(setTheme(newTheme))

    return {
        theme,
        toggleTheme: toggle,
        setTheme: change,
        isDark: theme === 'dark',
        isLight: theme === 'light'
    };
};