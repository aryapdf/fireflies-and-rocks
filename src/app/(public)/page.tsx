'use client';

import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useHomeAnimations } from '@/hooks/useHomeAnimations';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';
import DarkModeToggle from '@/components/Layout/DarkModeToggle';
import ParticlesBackground from '@/components/Layout/ParticlesBackground';
import HeroSection from '@/components/Sections/HeroSection';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { gsap } from 'gsap';
import Contributions from "@/components/Sections/Contributions";
import ProjectSection from "@/components/Sections/ProjectSection";

gsap.registerPlugin(ScrollToPlugin);

export default function Page() {
    const { isDark } = useTheme();
    const { particlesRef, mainTlRef } = useHomeAnimations();

    const [jumboText] = useState<string[]>([
        'Front end. web (developer)',
        'Back end. (developer)',
        '.Musician'
    ]);
    const [isFrozen] = useState<boolean>(false);

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            backgroundColor: isDark ? '#000000' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
            fontFamily: "'Courier New', monospace",
            position: 'relative',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
        }}>
            <ParticlesBackground particlesRef={particlesRef} isDark={isDark} />

            <div style={{ position: 'relative', zIndex: 5 }}>
                <Header />
                <Sidebar />
                <DarkModeToggle />

                <main
                    id="main-page"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <HeroSection
                        jumboText={jumboText}
                        isFrozen={isFrozen}
                    />

                    <Contributions />

                    <ProjectSection />
                </main>
            </div>
        </div>
    );
}