'use client';

import { useState } from 'react';
import { toVw } from '@/utils/toVw';
import {useTheme} from "@/hooks/useTheme";
import TextType from "@/components/Reactbits/TextType";
import {fonts} from "@/utils/font";

export default function Page() {
    const { theme, toggleTheme, isDark } = useTheme();

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: isDark ? '#000000' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
            fontFamily: "'Courier New', monospace",
            position: 'relative' as const,
            transition: 'all 0.3s ease',
            overflow: 'hidden',
        },
        header: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: `${toVw(40)} ${toVw(60)}`,
            zIndex: 100,
        },
        logo: {
            fontSize: toVw(38),
            fontWeight: 'bold' as const,
            letterSpacing: '-0.05em',
        },
        headerRight: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'flex-end',
            gap: toVw(4),
        },
        service: {
            fontSize: toVw(18),
            textDecoration: 'underline',
            textUnderlineOffset: toVw(4),
        },
        discount: {
            fontSize: toVw(14),
            opacity: 0.7,
        },
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
        main: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: `0 ${toVw(120)}`,
        },
        title: {
            fontSize: toVw(72),
            fontWeight: 'normal' as const,
            lineHeight: 1.4,
            letterSpacing: '-0.02em',
            margin: 0,
        },
        cursor: {
            animation: 'blink 1s infinite',
            display: 'inline-block',
        },
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
        },
    };

    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    return (
        <div style={styles.container}>
            {/* Keyframe animation */}
            <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

            {/* Header */}
            <header style={styles.header}>
                <div style={styles.logo}>badcable.</div>
                <div style={styles.headerRight}>
                    {/*<span style={styles.service}>self service</span>*/}
                    {/*<span style={styles.discount}>20% OFF</span>*/}
                </div>
            </header>

            {/* Sidebar Navigation */}
            <nav style={styles.sidebar}>
                {['home', 'cases', 'projects', 'about me', 'contact'].map((item) => (
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

            {/* Main Content */}
            <main style={styles.main}>
                <TextType
                    text={["Front end. web (developer)", "Back end. (developer)", ".Musician"]}
                    typingSpeed={75}
                    pauseDuration={2200}
                    showCursor={true}
                    cursorCharacter="_"
                    style={{
                        fontFamily: fonts.dotGothic16,
                        fontSize: toVw(40),
                    }}
                />
            </main>

            {/* Dark Mode Toggle */}
            <button
                className={"font-bold"}
                style={{
                    ...styles.darkModeToggle,
                    opacity: hoveredLink === 'darkmode' ? 0.6 : 1,
                }}
                onClick={toggleTheme}
                onMouseEnter={() => setHoveredLink('darkmode')}
                onMouseLeave={() => setHoveredLink(null)}
                aria-label="Toggle dark mode"
            >
                <span>{theme}mode.</span>
            </button>
        </div>
    );
}