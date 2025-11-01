// src/components/Layout/Sidebar.tsx
'use client';

import { useState } from 'react';
import { toVw } from '@/utils/toVw';

interface SidebarProps {
    isDark?: boolean;
}

const NAV_ITEMS = ['home', 'cases', 'projects', 'about me', 'contact'];

export default function Sidebar({ isDark }: SidebarProps) {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const styles = {
        sidebar: {
            position: 'fixed' as const,
            left: toVw(60),
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: toVw(40),
            zIndex: 100,
        },
        navLink: {
            writingMode: 'sideways-lr' as const,
            textOrientation: 'mixed' as const,
            fontSize: toVw(14),
            color: 'inherit',
            textDecoration: 'none',
            transition: 'opacity 0.3s ease',
            letterSpacing: '0.1em',
            cursor: 'pointer',
        },
    };

    return (
        <nav style={styles.sidebar}>
            {NAV_ITEMS.map((item) => (
                <a
                    key={item}
                    href={`#${item.replace(' ', '-')}`}
                    style={{
                        ...styles.navLink,
                        opacity: hoveredLink === item ? 0.6 : 1,
                    }}
                    onMouseEnter={() => setHoveredLink(item)}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    {item}
                </a>
                ))}
        </nav>
);
}