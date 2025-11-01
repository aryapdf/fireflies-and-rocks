'use client';

import { useState } from 'react';
import { toVw } from '@/utils/toVw';
import {useTheme} from "@/hooks/useTheme";
import TextType from "@/components/Reactbits/TextType";
import {fonts} from "@/utils/font";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import DarkModeToggle from "@/components/Layout/DarkModeToggle";

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
        main: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: `0 ${toVw(120)}`,
        },
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <Header />

            {/* Sidebar Navigation */}
            <Sidebar />

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Main Content */}
            <main style={styles.main}>
                <TextType
                    text={["Front end. web (developer)", "Back end. (developer)", ".Musician"]}
                    typingSpeed={60}
                    deletingSpeed={40}
                    pauseDuration={2200}
                    cursorBlinkDuration={0.4}
                    showCursor={true}
                    cursorCharacter="_"
                    style={{
                        fontFamily: fonts.dotGothic16,
                        fontSize: toVw(40),
                    }}
                />
            </main>
        </div>
    );
}