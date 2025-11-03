// src/components/Layout/Sidebar.tsx
'use client';

import {useState} from 'react';
import { toVw } from '@/utils/toVw';

const NAV_ITEMS = ['home', 'cases', 'projects', 'about me', 'contact'];

export default function Sidebar() {
    const [active, setActive] = useState<string>('home')
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

    function handleClick(val:string) {
        setActive(val)
        return
    }

    return (
        <nav style={styles.sidebar}>
            {NAV_ITEMS.map((item) => (
                <button
                    key={item}
                    className="relative"
                    onClick={() => setActive(item)}
                    onMouseEnter={() => setHoveredLink(item)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                        ...styles.navLink,
                        opacity: hoveredLink === item ? 0.6 : 1,
                    }}
                >
                  <span
                      style={{
                          position: 'relative',
                          display: 'inline-block',
                      }}
                  >
                    {item}
                      <span
                          style={{
                              position: 'absolute',
                              bottom: toVw(10),
                              left: toVw(16),
                              width: active === item ? '100%' : '0%',
                              height: toVw(2),
                              backgroundColor: 'currentColor',
                              transition: 'width 0.2s ease-in-out',
                              rotate: "90deg"
                          }}
                      />
                  </span>
                </button>

            ))}
        </nav>
    );
}