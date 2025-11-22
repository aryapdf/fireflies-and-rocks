// src/components/Layout/Sidebar.tsx
'use client';

import {
    ForwardedRef,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { toVw } from '@/utils/toVw';
import { ChevronRightIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveSection } from '@/store/slices/sidebarSlice';
import { scrollToLabel } from '@/utils/scrollToLabel';

const NAV_ITEMS = ['home', 'cases', 'projects', 'about me', 'contact'];
const AUTO_HIDE_DELAY = 1000;

export interface SidebarHandle {
    enableAutoHide: () => void;
    disableAutoHide: () => void;
    showSidebar: () => void;
    hideSidebar: () => void;
    toggleSidebar: () => void;
    activeCurrentSection: (val:string) => void;
}

function Sidebar(props: object, ref: ForwardedRef<SidebarHandle>) {
    const dispatch = useAppDispatch();
    const activeSection = useAppSelector(state => state.sidebar);
    const mainTimeline = useAppSelector(state => state.animation.mainTimeline);

    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [isAutoHideEnabled, setIsAutoHideEnabled] = useState<boolean>(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimer = useCallback(() => {
        if (!isAutoHideEnabled || !isVisible) return;

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setIsVisible(false);
        }, AUTO_HIDE_DELAY);
    }, [isAutoHideEnabled, isVisible]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    useEffect(() => {
        console.log('Current Section:', activeSection)
    }, [activeSection]);

    const handleClick = (val: string) => {
        dispatch(setActiveSection(val))
        if (!mainTimeline) return;

        const labelMap: Record<string, string> = {
              'home': 'intro-start',
              'cases': 'contributions-start',
              'projects': 'projects-start',
              'about me': 'about-start',
              'contact': 'contact-start',
        };

        const label = labelMap[val] || val;

        scrollToLabel(mainTimeline, label, 1)
        resetTimer();
    };

    const enableAutoHide = () => {
        setIsAutoHideEnabled(true);
        resetTimer();
    };

    const disableAutoHide = () => {
        setIsAutoHideEnabled(false);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const showSidebar = () => setIsVisible(true);
    const hideSidebar = () => setIsVisible(false);
    const toggleSidebar = () => setIsVisible((prev) => !prev);
    const activeCurrentSection = (val:string) => dispatch(setActiveSection(val));

    useImperativeHandle(ref, () => ({
        enableAutoHide,
        disableAutoHide,
        showSidebar,
        hideSidebar,
        toggleSidebar,
        activeCurrentSection
    }));

    const styles = {
        container: {
            position: 'fixed' as const,
            left: toVw(40),
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
        },
        sidebar: {
            display: 'flex',
            flexDirection: 'column' as const,
            gap: toVw(40),
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : `translateX(${toVw(-20)})`,
            pointerEvents: isVisible ? ('auto' as const) : ('none' as const),
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            zIndex: 10
        },
        trigger: {
            width: toVw(24),
            height: toVw(24),
            opacity: isVisible ? 0 : 1,
            transform: isVisible ? `translateX(${toVw(-20)})` : 'translateX(0)',
            pointerEvents: isVisible ? ('none' as const) : ('auto' as const),
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            cursor: 'pointer',
            position: 'absolute' as const
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
            userSelect: 'none' as const,
        },
    };

    return (
        <div style={styles.container}>
            {/* Tombol trigger (hanya muncul saat hidden) */}
            <div
                style={styles.trigger}
                onMouseEnter={showSidebar}
                onClick={showSidebar}
            >
                <ChevronRightIcon size={toVw(24)} />
            </div>

            {/* Sidebar utama */}
            <nav
                className="sidebar"
                style={styles.sidebar}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={resetTimer}
            >
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item}
                        className="relative"
                        onClick={() => handleClick(item)}
                        onMouseEnter={() => setHoveredLink(item)}
                        onMouseLeave={() => setHoveredLink(null)}
                        style={{
                            ...styles.navLink,
                            opacity: hoveredLink === item ? 0.6 : 1,
                        }}
                    >
                        <span style={{ position: 'relative', display: 'inline-block' }}>
                          {item}
                        <span
                            style={{
                                position: 'absolute',
                                bottom: toVw(10),
                                left: toVw(16),
                                width: activeSection === item ? '100%' : '0%',
                                height: toVw(2),
                                backgroundColor: 'currentColor',
                                transition: 'width 0.2s ease-in-out',
                                rotate: '90deg',
                            }}
                        />
                        </span>
                    </button>
                ))}
            </nav>
        </div>
    );
}

Sidebar.displayName = 'Sidebar';
export default forwardRef(Sidebar);
