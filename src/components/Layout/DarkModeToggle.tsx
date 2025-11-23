// src/components/Layout/DarkModeToggle.tsx
'use client';

import { useState } from 'react';
import { toVw } from '@/utils/toVw';
import { useTheme } from '@/hooks/useTheme';
import TextType from "@/components/Reactbits/TextType";

export default function DarkModeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    const styles = {
        darkModeToggle: {
            position: 'fixed' as const,
            bottom: toVw(40),
            right: toVw(60),
            background: 'transparent',
            border: 'none',
            color: 'inherit',
            fontSize: toVw(14),
            cursor: 'pointer',
            fontFamily: "'Courier New', monospace",
            transition: 'opacity 0.3s ease',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: toVw(8),
            writingMode: 'sideways-lr' as const,
            textOrientation: 'mixed' as const,
            opacity: isHovered ? 0.6 : 1,
        },
    };

    return (
        <button
            className="font-bold"
            style={styles.darkModeToggle}
            onClick={toggleTheme}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Toggle dark mode"
        >
            <TextType
                loop={false}
                showCursor={false}
                text={`${theme}mode.`}
            />
        </button>
    );
}