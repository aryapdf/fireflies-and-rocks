import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParticlesRef } from '@/components/Reactbits/Particles';

gsap.registerPlugin(ScrollTrigger);

export const useHomeAnimations = () => {
    const particlesRef = useRef<ParticlesRef>(null);
    const mainTlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        const particlesObj = { x: 0, y: 0, z: 0, rotation: 0 };
        const cards = gsap.utils.toArray('.contribution-card');
        const projects = gsap.utils.toArray('.project-card');

        const updateParticles = () => {
            particlesRef.current?.setPosition(particlesObj.x, particlesObj.y, particlesObj.z);
        };

        const mainTL = gsap.timeline({
            scrollTrigger: {
                trigger: '#main-page',
                start: 'top top',
                end: '+=1000%',
                scrub: 1.8,
                pin: true,
            },
            defaults: { ease: 'power2.inOut' }
        });

        // ========================================
        // 🌌 INTRO: Warp Speed Effect
        // ========================================
        mainTL
            .addLabel('intro-start')
            .to('.main-text', {
                opacity: 0,
                scale: 0.8,
                rotateX: -15,
                y: -100,
                duration: 3,
                ease: 'power3.in',
            })
            .to(particlesObj, {
                z: 8,
                duration: 4,
                ease: 'power4.inOut',
                onUpdate: updateParticles
            }, '<')
            .addLabel('intro-end');

        // ========================================
        // 🎴 SECTION 1: Hologram Card Reveal
        // ========================================
        mainTL
            .addLabel('cards-start')
            .to('#contribution-section', {
                opacity: 1,
                scale: 1,
                duration: 0,
            })
            // Particles drift sideways
            .to(particlesObj, {
                x: 5,
                y: -2,
                rotation: 360,
                duration: 6,
                ease: 'sine.inOut',
                onUpdate: updateParticles
            }, '<')
            // Title appears with glitch effect
            .fromTo('.contribution-title',
                    {
                        opacity: 0,
                        y: 100,
                        scale: 0.5,
                        rotateX: 90,
                        filter: 'blur(20px)'
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotateX: 0,
                        filter: 'blur(0px)',
                        duration: 3,
                        ease: 'back.out(1.7)',
                    }
                )

        // Cards appear with stagger + 3D rotation
        cards.forEach((card: any, i: number) => {
            mainTL.fromTo(card,
                {
                    opacity: 0,
                    y: 150,
                    rotateY: -45,
                    rotateX: 25,
                    scale: 0.7,
                    filter: 'blur(15px) brightness(0.5)'
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    filter: 'blur(0px) brightness(1)',
                    duration: 2.5,
                    ease: 'expo.out',
                },
                i === 0 ? '>-0.3' : '>-1.8'
            );
        });

        // Hold cards on screen
        mainTL.to('#contribution-section', { duration: 4 });

        // ========================================
        // 🌠 TRANSITION: Particle Explosion
        // ========================================
        mainTL
            .addLabel('cards-exit')
            // Particles explode outward
            .to(particlesObj, {
                x: 0,
                y: 0,
                z: 0,
                duration: 3,
                ease: 'power4.in',
                onUpdate: updateParticles
            })
            // Cards fly away with rotation
            .to('.contribution-title', {
                opacity: 0,
                y: -80,
                scale: 0.6,
                rotateX: -45,
                filter: 'blur(20px)',
                duration: 2.5,
                ease: 'power3.in'
            }, '<');

        cards.forEach((card: any, i: number) => {
            const randomX = gsap.utils.random(-300, 300);
            const randomY = gsap.utils.random(-200, -100);
            const randomRotate = gsap.utils.random(-180, 180);

            mainTL.to(card, {
                opacity: 0,
                x: randomX,
                y: randomY,
                rotateZ: randomRotate,
                rotateY: 90,
                scale: 0.3,
                filter: 'blur(25px)',
                duration: 2,
                ease: 'power4.in',
            }, i === 0 ? '<' : '<+0.15');
        });

        mainTL.to('#contribution-section', {
            opacity: 0,
            duration: 0
        });

        // ========================================
        // 🚀 SECTION 2: Project Launch
        // ========================================
        mainTL
            .addLabel('projects-start')
            // Particles reset and drift
            .to(particlesObj, {
                x: -5,
                y: 2,
                z: 3,
                duration: 3,
                ease: 'power2.out',
                onUpdate: updateParticles
            })
            // Project section materializes
            .fromTo('#project-section',
                {
                    opacity: 0,
                    scale: 0.8,
                    filter: 'blur(30px)'
                },
                {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 3,
                    ease: 'power3.out'
                }
            )
            // Title appears with scan effect
            .fromTo('.project-title',
                {
                    opacity: 0,
                    y: 80,
                    scaleX: 0.5,
                    filter: 'blur(15px)'
                },
                {
                    opacity: 1,
                    y: 0,
                    scaleX: 1,
                    filter: 'blur(0px)',
                    duration: 2.5,
                    ease: 'back.out(1.4)'
                },
                '<+0.5'
            )

        // Projects appear like holograms
        projects.forEach((project: any, i: number) => {
            mainTL.fromTo(project,
                {
                    opacity: 0,
                    y: 100,
                    rotateX: 45,
                    scale: 0.85,
                    filter: 'blur(10px) brightness(0.3)'
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    filter: 'blur(0px) brightness(1)',
                    duration: 2.5,
                    ease: 'expo.out',
                },
                i === 0 ? '>-0.5' : '>-1.5'
            );
        });

        // Hold scroll
        mainTL.to('#project-section', {duration: 4})

            .to('.project-title',
                {
                    opacity: 0,
                    y: 80,
                    scaleX: 0.5,
                    duration: 2.5,
                    filter: 'blur(15px)'
                },
                '<'
            )
        projects.forEach((project: any, i: number) => {
            mainTL.to(project,
                {
                    opacity: 0,
                    y: 100,
                    rotateX: 45,
                    duration: 2.5,
                    scale: 0.85,
                    filter: 'blur(10px) brightness(0.3)'
                },
                i === 0 ? '<' : '<+0.15'
            );
        });


        // ========================================
        // 🧠 SECTION 3: About Me Reveal
        // ========================================
        mainTL
            .addLabel('about-start')
            // Smooth particle drift while entering "About"
            .to(particlesObj, {
                x: 3,
                y: 1,
                z: 1,
                duration: 3,
                ease: 'sine.inOut',
                onUpdate: updateParticles
            })
            // Fade in About section
            .fromTo('#about-section',
                {
                    opacity: 0,
                    y: 100,
                    scale: 0.9,
                    filter: 'blur(20px)'
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 3,
                    ease: 'power3.out'
                },
                '<'
            )
            // Title animation
            .fromTo('.about-title h2',
                {
                    opacity: 0,
                    y: 50,
                    letterSpacing: '0.1em',
                    filter: 'blur(10px)'
                },
                {
                    opacity: 1,
                    y: 0,
                    letterSpacing: 'normal',
                    filter: 'blur(0px)',
                    duration: 2.5,
                    ease: 'power2.out'
                },
                '<+0.5'
            );

        const skillCards = gsap.utils.toArray('.skill-card');
        skillCards.forEach((card:any, i) => {
            mainTL.fromTo(card,
                {
                    opacity: 0,
                    y: 80,
                    rotateX: 45,
                    scale: 0.85,
                    filter: 'blur(15px)'
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 2,
                    ease: 'expo.out'
                },
                i === 0 ? '>-0.5' : '>-1.2'
            );
        });

        mainTL
            // Experience sections fade in one by one
            .fromTo('.about-experience > div',
                {
                    opacity: 0,
                    y: 80,
                    filter: 'blur(10px)'
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 2,
                    ease: 'power2.out',
                    stagger: 0.3
                },
                '>-0.8'
            )
            // Particles slowly stabilize at end
            .to(particlesObj, {
                x: 0,
                y: 0,
                z: 0,
                rotation: 0,
                duration: 6,
                ease: 'sine.inOut',
                onUpdate: updateParticles
            })
            .addLabel('about-end');

        // Final particle drift
        mainTL
            .to(particlesObj, {
                x: 0,
                y: 0,
                z: 2,
                duration: 6,
                ease: 'sine.inOut',
                onUpdate: updateParticles
            })
            .to('.see-project-btn', {
                opacity: 1,
                y: 0,
                duration: 0
            })
            .addLabel('projects-end');

        mainTlRef.current = mainTL;

        return () => {
            mainTL.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return { particlesRef, mainTlRef };
};