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
            flexDirection: 'column',
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
            width: '300vw',
            height: '150vh',
        }
    };

    const particleColor = useMemo(() => {
        return isDark
            ? ['#E7E7E7', '#E7E7E7']
            : ['#000000', '#000000'];
    }, [isDark]);

    useGSAP(() => {
        const particlesObj = { x: 0, y: 0, z: 0 };

        // === TIMELINE UTAMA ===
        const mainTL = gsap.timeline({
            scrollTrigger: {
                trigger: '#main-page',
                start: 'top top',
                end: '+=400%',
                scrub: true,
                pin: true,
                markers: true
            },
            defaults: { ease: 'power3.inOut' }
        });

        // === TIMELINE ANAK #1 === (animasi teks)
        const textTL = gsap.timeline()
            .addLabel('beginning-animation-section-one')
            .to('.main-text', {
                opacity: 1,
                duration: 5,
            })
            .to('.main-text', {
                opacity: 0,
                y: '50px',
                duration: 2,
            });

        // === TIMELINE ANAK #2 === (animasi partikel)
        const particleTL = gsap.timeline()
            .to(particlesObj, {
                x: 10,
                duration: 5,
                ease: 'power2.inOut',
                onUpdate: () => {
                    if (particlesRef.current) {
                        particlesRef.current.setPosition(particlesObj.x, particlesObj.y, particlesObj.z);
                    }
                }
            })

        // === TIMELINE ANAK #3 === (reveal section berikutnya)
        const nextSectionTL = gsap.timeline()
            .to('#next-section', {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out'
            })
            .addLabel('end-animation-section-one')

        // === COMPOSE: Masukkan sub-timeline ke dalam master timeline ===
        mainTL
            .add(textTL, 'text')         // label opsional
            .add(particleTL, 'particles') // bisa juga offset: '>-0.5' atau '<+0.2'
            .add(nextSectionTL, '+=0.5'); // jeda 0.5 detik setelah animasi sebelumnya

        // === Cleanup ===
        return () => {
            mainTL.kill();
            textTL.kill();
            particleTL.kill();
            nextSectionTL.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    });



    return (
        <div style={styles.container}>
            {/* Background */}
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
                {/* Header */}
                <Header />

                {/* Sidebar Navigation */}
                <Sidebar />

                {/* Dark Mode Toggle */}
                <DarkModeToggle />

                {/* Main Content */}
                <main style={styles.main} id={"main-page"}>
                    <section style={styles.section} className={"main-text"}>
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

                    {/* New Section - fades in after particles */}
                    <section
                        id="next-section"
                        style={{
                            position: 'absolute',
                            top: 0,
                            opacity: 0,
                            transform: 'translateY(50px)',
                            minHeight: '100vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'opacity 1s ease, transform 1s ease',
                        }}
                    >
                        <h2 style={{
                            fontFamily: fonts.dotGothic16,
                            fontSize: toVw(30),
                            textAlign: 'center',
                        }}>
                            Welcome to the next section 🚀
                        </h2>
                    </section>
                </main>


            </div>
        </div>
    );
}
