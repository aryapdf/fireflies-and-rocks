'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { toVw } from '@/utils/toVw';
import { useTheme } from "@/hooks/useTheme";
import TextType from "@/components/Reactbits/TextType";
import { fonts } from "@/utils/font";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import DarkModeToggle from "@/components/Layout/DarkModeToggle";
import { useGSAP } from "@gsap/react";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Particles, { ParticlesRef } from "@/components/Reactbits/Particles";
import { scrollToLabel } from "@/utils/scrollToLabel";
import ContributionCards from "@/components/Card/ContributionCards";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Page() {
    const { isDark } = useTheme();
    const [jumboText] = useState<string[]>([
        "Front end. web (developer)",
        "Back end. (developer)",
        ".Musician"
    ]);
    const [textIndex, setTextIndex] = useState<number>(0);
    const [isFrozen, setIsFrozen] = useState<boolean>(false);

    const particlesRef = useRef<ParticlesRef>(null);
    const mainTlRef = useRef<gsap.core.Timeline | null>(null);
    const hasTriggeredRef = useRef<boolean>(false);

    const styles = {
        container: {
            minHeight: '100vh',
            width: '100vw',
            backgroundColor: isDark ? '#000000' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
            fontFamily: "'Courier New', monospace",
            position: 'relative' as const,
            transition: 'all 0.3s ease',
            overflow: 'hidden' as const,
        },
        main: {
            display: 'flex',
            flexDirection: 'column' as const,
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
            position: 'fixed' as const,
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
            position: 'absolute' as const,
            width: '200vw',
            height: '200vh',
        },
        nextSection: {
            position: 'absolute' as const,
            top: 0,
            opacity: 0,
            transform: 'translateY(50px)',
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };

    const particleColor = useMemo(() => {
        return isDark ? ['#E7E7E7', '#E7E7E7'] : ['#000000', '#000000'];
    }, [isDark]);

    useGSAP(() => {
        const particlesObj = { x: 0, y: 0, z: 0 };
        const cards = gsap.utils.toArray('.contribution-card');

        const mainTL = gsap.timeline({
            scrollTrigger: {
                trigger: '#main-page',
                start: 'top top',
                end: '+=800%',
                scrub: 1.2,
                pin: true,
            },
            defaults: { ease: 'power3.inOut' }
        })
            .addLabel('beginning-animation-section-one')
            .to('.main-text', { opacity: 1, duration: 2 })
            .to('.main-text', { opacity: 0, y: '50px', duration: 2 })
            .to(particlesObj, {
                x: 5,
                duration: 5,
                ease: 'power2.inOut',
                onUpdate: () => {
                    if (particlesRef.current) {
                        particlesRef.current.setPosition(particlesObj.x, particlesObj.y, particlesObj.z);
                    }
                }
            })
            .to('#next-section', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
            .addLabel('cards-start')
            .to('.contribution-title', { opacity: 1, y: 0, scale: 1, duration: 2, ease: 'power3.out',
                onComplete: () => {
                    if (mainTlRef.current) {
                        document.body.style.overflow = 'hidden';
                        scrollToLabel(mainTlRef.current, 'cards-end', .8, false);
                        setTimeout(() => {
                            document.body.style.overflow = '';
                        }, 800);
                    }
                } })
            cards.forEach((card:any, i) => {
                mainTL.to(
                    card,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        ease: 'power3.out',
                    },
                    i === 0 ? '>' : '>-0.8'
                );
            });
        mainTL
            .to(cards, {duration: 1, onReverseComplete: () => {
                    if (mainTlRef.current) {
                        document.body.style.overflow = 'hidden';
                        scrollToLabel(mainTlRef.current, 'cards-start', .8, false);
                        setTimeout(() => {
                            document.body.style.overflow = '';
                        }, 800);
                    }
                }})
            .addLabel('cards-end')
            .addLabel('end-animation-section-one');

        mainTlRef.current = mainTL;

        return () => {
            mainTL.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.backgroundContainer}>
                <div style={styles.particles}>
                    <Particles
                        ref={particlesRef}
                        particleColors={particleColor}
                        particleCount={5000}
                        particleSpread={15}
                        speed={0.1}
                        particleBaseSize={100}
                        alphaParticles={false}
                        disableRotation={false}
                    />
                </div>
            </div>

            <div style={{ position: 'relative', zIndex: 5 }}>
                <Header />
                <Sidebar />
                <DarkModeToggle />

                <main style={styles.main} id="main-page">
                    <section style={styles.section} className="main-text">
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
                    </section>

                    <section id="next-section" style={styles.nextSection}>
                        <ContributionCards isDark={isDark} />
                    </section>
                </main>
            </div>
        </div>
    );
}