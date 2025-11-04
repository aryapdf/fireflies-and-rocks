'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
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
import Particles, { ParticlesRef } from "@/components/Reactbits/Particles";

gsap.registerPlugin(ScrollTrigger)

export default function Page() {
    const { isDark } = useTheme();
    const [jumboText, setJumboText] = useState<any>(["Front end. web (developer)", "Back end. (developer)", ".Musician"])
    const [charCount, setCharCount] = useState<any>()
    const [textIndex, setTextIndex] = useState<any>(0)
    const [isFrozen, setIsFrozen] = useState<boolean>(false)

    const particlesRef = useRef<ParticlesRef>(null);

    const styles:any = {
        container: {
            minHeight: '100vh',
            width: '100vw',
            backgroundColor: isDark ? '#000000' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
            fontFamily: "'Courier New', monospace",
            position: 'relative',
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
        },
        backgroundContainer: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: "100vh",
            maxHeight: '100vh',
            inset: -1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        particles: {
            position: 'absolute',
            width: '200vw',
            height: '200vh',
        }
    };

    const particleColor = useMemo(() => {
        return isDark
            ? ['#E7E7E7', '#E7E7E7']
            : ['#000000', '#000000'];
    }, [isDark]);

    useGSAP(() => {
        const particlesObj = { x: 0, y: 0, z: 0 };

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

            .to(particlesObj, {
                x: 3, // Reduced from 15 to 3
                duration: 0.3,
                ease: "sine.inOut",
                onUpdate: () => {
                    if (particlesRef.current) {
                        particlesRef.current.setPosition(particlesObj.x, particlesObj.y, particlesObj.z);
                    }
                }
            })

        return () => {
            mainTimeline.kill();
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    })

    return (
        <div style={styles.container}>
            {/* Background */}
            <div style={styles.backgroundContainer}>
                <div
                    style={styles.particles}
                >
                    <Particles
                        ref={particlesRef}
                        particleColors={particleColor}
                        particleCount={5000}
                        particleSpread={10}
                        speed={0.1}
                        particleBaseSize={100}
                        alphaParticles={false}
                        disableRotation={false}
                    />
                </div>
            </div>

            <div
                style={{
                    position: 'relative',
                    zIndex: 5
                }}
            >
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

        </div>
    );
}