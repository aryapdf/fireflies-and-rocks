// path: src/components/Theme/ThemeSync.tsx
'use client'

import {useTheme} from "@/hooks/useTheme";
import {useEffect} from "react";

export default function ThemeSync() {
    const { theme } = useTheme();

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return null;
}