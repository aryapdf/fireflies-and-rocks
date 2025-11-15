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
                end: '+=2000%',
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
                duration: 10,
                ease: 'power3.in',
            })
            .to(particlesObj, {
                z: 7,
                duration: 10,
                ease: 'power4.inOut',
                onUpdate: updateParticles
            }, '<=')
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
                duration: 10,
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

        mainTL
            .to({}, { duration: 5 }, '+=5')
            .addLabel('cards-exit')
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
                z: 7,
                duration: 10,
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
        mainTL.to({}, { duration: 5 }, '+=5')
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
                x: 5,
                y: 2,
                z: 7,
                duration: 10,
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
                '>'
            )
            // 1. Title About Me muncul dengan glitch effect
            .fromTo('.about-title',
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
                },
                '<+0.5'
            )
            // 2. Profile card muncul
            .fromTo('.about-profile',
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.9,
                    filter: 'blur(15px)'
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 2.5,
                    ease: 'power2.out'
                },
                '>'
            )
            // Hold title dan profile
            .to({}, { duration: 2 });

        // 3. Skills grid muncul saat scroll
        const skillCards = gsap.utils.toArray('.skill-card');
        mainTL.fromTo('.about-skills',
            {
                opacity: 0,
                scale: 0.9,
                filter: 'blur(20px)'
            },
            {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: 2,
                ease: 'power3.out'
            }
        );

        skillCards.forEach((card: any, i: number) => {
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


        // 4. Skills grid keluar, Experience section muncul
        mainTL
            .to({}, { duration: 5 }, '+=5')
            .addLabel('skills-to-experience')
            .to({}, { duration: 5 });
        skillCards.forEach((card: any, i: number) => {
            const randomX = gsap.utils.random(-200, 200);
            const randomY = gsap.utils.random(-150, -80);
            const randomRotate = gsap.utils.random(-120, 120);

            mainTL.to(card, {
                opacity: 0,
                x: randomX,
                y: randomY,
                rotateZ: randomRotate,
                rotateY: 60,
                scale: 0.4,
                filter: 'blur(20px)',
                duration: 2,
                ease: 'power4.in',
            }, i === 0 ? '<' : '<+0.15');
        });

        mainTL.to('.about-skills', {
            opacity: 0,
            duration: 0
        });

        // Experience section muncul
        mainTL
            .addLabel('experience-start')
            .fromTo('.about-experience',
                {
                    opacity: 0,
                    scale: 0.9,
                    filter: 'blur(20px)'
                },
                {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 2,
                    ease: 'power3.out'
                }
            );

        // Experience items muncul satu per satu
        const experienceSections = gsap.utils.toArray('.about-experience > div');
        experienceSections.forEach((section: any, i: number) => {
            mainTL.fromTo(section,
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

        // Hold experience section
        mainTL.to('.about-experience', { duration: 4 });

        // 5. Semua elemen about section keluar (menuju project end)
        mainTL
            .addLabel('about-exit')
            // Title keluar
            .to('.about-title', {
                opacity: 0,
                y: -80,
                scale: 0.6,
                rotateX: -45,
                filter: 'blur(20px)',
                duration: 2.5,
                ease: 'power3.in'
            })
            // Profile card keluar
            .to('.about-profile', {
                opacity: 0,
                y: -100,
                scale: 0.7,
                filter: 'blur(20px)',
                duration: 2.5,
                ease: 'power3.in'
            }, '<');

        // Experience sections keluar dengan random explosion
        experienceSections.forEach((section: any, i: number) => {
            const randomX = gsap.utils.random(-300, 300);
            const randomY = gsap.utils.random(-200, -100);
            const randomRotate = gsap.utils.random(-180, 180);

            mainTL.to(section, {
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

        mainTL
            .to('#about-section', {
                opacity: 0,
                duration: 0
            })
            // Particles slowly stabilize at end
            .to(particlesObj, {
                x: 0,
                y: 0,
                z: 7,
                rotation: 0,
                duration: 6,
                ease: 'sine.inOut',
                onUpdate: updateParticles
            })
            .addLabel('about-end')
            .to('#about-section', {
                duration: 5
            })
        // ========================================
        // 📧 SECTION 4: Contact Section
        // ========================================
        mainTL
            .addLabel('contact-start')
            .to(particlesObj, {
                x: 0,
                y: 0,
                z: 0,
                duration: 10,
                ease: 'sine.inOut',
                onUpdate: updateParticles
            }, 'contact-start')
            .to(particlesObj, {}, 'contact-end')
            // Contact section fade in
            .fromTo('#contact-section',
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.95,
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
                'contact-start'
            )
            // Title appears
            .fromTo('.contact-title',
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.8,
                    filter: 'blur(15px)'
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 2.5,
                    ease: 'back.out(1.4)'
                },
                '<+0.5'
            );

        // Social icons appear with stagger
        const socialIcons = gsap.utils.toArray('.social-icon');
        socialIcons.forEach((icon: any, i: number) => {
            mainTL.fromTo(icon,
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.6,
                    rotateY: -45,
                    filter: 'blur(10px)'
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateY: 0,
                    filter: 'blur(0px)',
                    duration: 2,
                    ease: 'back.out(1.7)'
                },
                i === 0 ? '>-0.5' : '>-1.5'
            );
        });

        mainTL
            // Order of service appears
            .fromTo('.contact-order',
                {
                    opacity: 0,
                    y: 40,
                    filter: 'blur(10px)'
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 2,
                    ease: 'power2.out'
                },
                '>-0.5'
            )
            // Footer appears
            .fromTo('.contact-footer',
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 2,
                    ease: 'power2.out'
                },
                '>-1'
            )
            .addLabel('contact-end')
            .addLabel('projects-end');

        mainTlRef.current = mainTL;

        return () => {
            mainTL.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return { particlesRef, mainTlRef };
};