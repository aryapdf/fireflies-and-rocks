'use client';

import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from '@/store';
import { setTheme } from '@/store/slices/themeSlice';

export default function StoreProvider({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
            if (savedTheme) {
                store.dispatch(setTheme(savedTheme));
            } else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                store.dispatch(setTheme(prefersDark ? 'dark' : 'light'));
            }
            initialized.current = true;
        }
    }, []);

    return <Provider store={store}>{children}</Provider>;
}