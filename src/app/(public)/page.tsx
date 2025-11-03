'use client';

import { useState } from 'react';
import { toVw } from '@/utils/toVw';
import {useTheme} from "@/hooks/useTheme";
import TextType from "@/components/Reactbits/TextType";
import {fonts} from "@/utils/font";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import DarkModeToggle from "@/components/Layout/DarkModeToggle";
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

export default function Page() {
    const { isDark } = useTheme();
    const [jumboText, setJumboText] = useState<any>(["Front end. web (developer)", "Back end. (developer)", ".Musician"])
    const [charCount, setCharCount] = useState<any>()
    const [textIndex, setTextIndex] = useState<any>(0)
    const [isFrozen, setIsFrozen] = useState<boolean>(false)

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
        section: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    };

    useGSAP(() => {
        const mainTimeline = gsap.timeline({
            scrollTrigger: {
                markers: true,
                start: "top top",
                end: '+=200%',
                scrub: true,
                pin: '#main-page',
                trigger: '#main-page'
            },
            defaults: {
                ease: "power2.out"
            }
        })
            .to('#main-page', {opacity: 1, scale: 1, duration: 1})
            .to('.main-text', {duration: .5, onComplete: () => setIsFrozen(true), onReverseComplete: () => setIsFrozen(false) })
            .to('.main-text', {opacity: 0, duration: 1})

        return () => {
            mainTimeline.kill();
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    })

    return (
        <div style={styles.container}>
            {/* Header */}
            <Header />

            {/* Sidebar Navigation */}
            <Sidebar />

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Main Content */}
            <main style={styles.main} id={"main-page"}>
                <div style={styles.section} className={"main-text"}>
                    <TextType
                        text={jumboText}
                        typingSpeed={60}
                        deletingSpeed={40}
                        pauseDuration={2200}
                        cursorBlinkDuration={0.4}
                        showCursor={true}
                        cursorCharacter="_"
                        freezeAnimation={isFrozen}
                        setCurrentIndex={setTextIndex}
                        style={{
                            fontFamily: fonts.dotGothic16,
                            fontSize: toVw(40),
                        }}
                    />
                </div>
            </main>
        </div>
    );
}