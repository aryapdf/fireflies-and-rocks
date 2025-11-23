'use client';

import {useRef, useState} from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useHomeAnimations } from '@/hooks/useHomeAnimations';
import Header from '@/components/Layout/Header';
import DarkModeToggle from '@/components/Layout/DarkModeToggle';
import ParticlesBackground from '@/components/Layout/ParticlesBackground';
import HeroSection from '@/components/Sections/HeroSection';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { gsap } from 'gsap';
import Contributions from "@/components/Sections/Contributions";
import ProjectSection from "@/components/Sections/ProjectSection";
import AboutSection from "@/components/Sections/AboutSection";
import ContactSection from "@/components/Sections/ContactSection";
import Sidebar from "@/components/Layout/Sidebar"

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
    const { isDark } = useTheme();
    const { particlesRef, sidebarRef, scrollToSection } = useHomeAnimations();

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
                <Sidebar ref={sidebarRef} onSectionClick={scrollToSection} />
                {/*<DarkModeToggle />*/}
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

                    <AboutSection />

                    <ContactSection />
                </main>
            </div>
        </div>
    );
}
