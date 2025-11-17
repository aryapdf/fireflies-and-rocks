// src/components/Layout/Sidebar.tsx
'use client';

import {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import { toVw } from '@/utils/toVw';

const NAV_ITEMS = ['home', 'cases', 'projects', 'about me', 'contact'];
const AUTO_HIDE_DELAY = 3000;

export interface SidebarHandle {
    enableAutoHide: () => void;
    disableAutoHide: () => void;
    showSidebar: () => void;
    hideSidebar: () => void;
    toggleSidebar: () => void;
}

const Sidebar = forwardRef<SidebarHandle, object>((props, ref) => {
    const [active, setActive] = useState<string>('home')
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isAutoHideEnabled, setIsAutoHideEnabled] = useState<boolean>(false)

    const timerRef = useRef<any>(null);

    const resetTimer = useCallback(() => {
        if (!isAutoHideEnabled || !isVisible) return;

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => setIsVisible(false), AUTO_HIDE_DELAY);
    }, [isAutoHideEnabled, isVisible])

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleMouseEnterSidebar = () => {
        setIsVisible(true);
        resetTimer();
    }

    const handleClick = (val:any) => {
        setActive(val);
        resetTimer();
    }

    const enableAutoHide = () => {
        setIsAutoHideEnabled(true);
        resetTimer();
    }

    const disableAutoHide = () => {
        setIsAutoHideEnabled(true);
        if (timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null;
        }
    }

    const showSidebar = () => setIsVisible(true);
    const hideSidebar = () => setIsVisible(false);
    const toggleSidebar = () => setIsVisible(prev => !prev);

    // Expose func using useImperativeHandle
    useImperativeHandle(ref, () => ({
        enableAutoHide,
        disableAutoHide,
        showSidebar,
        hideSidebar,
        toggleSidebar,
    }));

    const styles = {
        sidebar: {
            position: 'fixed' as const,
            left: toVw(60),
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column' as const,
            gap: toVw(40),
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? ('auto' as const) : ('none' as const),
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
        <nav style={styles.sidebar} onMouseEnter={handleMouseEnterSidebar} onMouseLeave={resetTimer}>
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
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;