// src/hooks/useHomeAnimations.ts
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParticlesRef } from '@/components/Reactbits/Particles';
import sidebar, { SidebarHandle } from "@/components/Layout/Sidebar";
import { scrollToLabel } from '@/utils/scrollToLabel';

gsap.registerPlugin(ScrollTrigger);

export const useHomeAnimations = () => {
    const particlesRef = useRef<ParticlesRef>(null);
    const mainTlRef = useRef<gsap.core.Timeline | null>(null);
    const sidebarRef = useRef<SidebarHandle>(null);
    const scrollToSection = (section: string) => {
      if (!mainTlRef.current) return;

      const labels:any = {
        'home': 'intro-start',
        'cases': 'contributions-start',
        'projects': 'projects-start',
        'about me': 'about-start',
        'contact': 'contact-start',
      }

      const targetLabel = labels[section];
      scrollToLabel(mainTlRef.current, targetLabel, 1, true);
    }

    useGSAP(() => {
        const particlesObj = { x: 0, y: 0, z: 0, rotation: 0 };
        const updateParticles = () => particlesRef.current?.setPosition(particlesObj.x, particlesObj.y, particlesObj.z);

        // Gather all elements
        const cards = gsap.utils.toArray('.contribution-card');
        const projects = gsap.utils.toArray('.project-card');
        const skillCards = gsap.utils.toArray('.skill-card');
        const experienceSections = gsap.utils.toArray('.about-experience > div');
        const socialIcons = gsap.utils.toArray('.social-icon');

        // Reusable animation configs
        const fadeInUp = { opacity: 0, y: 100, scale: 0.9, filter: 'blur(20px)' };
        const fadeInUpTo = { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 3, ease: 'power3.out' };
        const glitchIn = { opacity: 0, y: 100, scale: 0.5, rotateX: 90, filter: 'blur(20px)' };
        const glitchInTo = { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)', duration: 3, ease: 'back.out(1.7)' };
        const hologramIn = { opacity: 0, y: 150, rotateY: -45, rotateX: 25, scale: 0.7, filter: 'blur(15px) brightness(0.5)' };
        const hologramInTo = { opacity: 1, y: 0, rotateY: 0, rotateX: 0, scale: 1, filter: 'blur(0px) brightness(1)', duration: 2.5, ease: 'expo.out' };

        // Helper: Stagger reveal elements
        const staggerReveal = (tl: gsap.core.Timeline, elements: any[], fromConfig: any, toConfig: any, delay = -1.8) => {
            elements.forEach((el, i) => {
                tl.fromTo(el, fromConfig, { ...toConfig }, i === 0 ? '>-0.3' : `>${delay}`);
            });
        };

        // Helper: Stagger exit with random explosion
        const staggerExplosion = (tl: gsap.core.Timeline, elements: any[]) => {
            elements.forEach((el, i) => {
                tl.to(el, {
                    opacity: 0,
                    x: gsap.utils.random(-300, 300),
                    y: gsap.utils.random(-200, -100),
                    rotateZ: gsap.utils.random(-180, 180),
                    rotateY: 90,
                    scale: 0.3,
                    filter: 'blur(25px)',
                    duration: 2,
                    ease: 'power4.in',
                }, i === 0 ? '<' : '<+0.15');
            });
        };


        const mainTL = gsap.timeline({
            scrollTrigger: {
                trigger: '#main-page',
                start: 'top top',
                end: '+=4000%',
                scrub: 3,
                pin: true,
            },
            defaults: { ease: 'power2.inOut' }
        });

        // ========================================
        // INTRO
        // ========================================
        mainTL
            .addLabel('intro-start')
            .to({}, { duration: 4 })
            .to('.main-text', { opacity: 0, scale: 0.8, rotateX: -15, y: -100, duration: 4, ease: 'power3.in' }, '>')
            .to(particlesObj, { z: 7, duration: 10, ease: 'power4.inOut', onUpdate: updateParticles }, '<')
            .to('.header-logo, .header-right', { opacity: 0, scale: 0.8, y: -20, duration: 4, ease: 'power3.in' }, '<')
            .to({}, {
                duration: 0, onComplete: () => {
                    sidebarRef.current?.enableAutoHide();
                    sidebarRef.current?.hideSidebar();
                },
                onReverseComplete: () => {
                    sidebarRef.current?.disableAutoHide();
                    sidebarRef.current?.showSidebar();
                }
                }, '>')
            .addLabel('intro-end');

        // ========================================
        // CONTRIBUTIONS
        // ========================================
        mainTL
            .addLabel('contributions-start')
            .to('#contribution-section', { opacity: 1, scale: 1, duration: 0 })
            .to({}, {
                duration: 0,
                onReverseComplete: () => sidebarRef.current?.activeCurrentSection('home'),
            }, '>')
            .to(particlesObj, { x: 5, y: -2, rotation: 360, duration: 10, ease: 'sine.inOut', onUpdate: updateParticles }, '<')
            .to({}, {
                duration: 0,
                onComplete: () => sidebarRef.current?.activeCurrentSection('cases'),
            }, '>')
            .fromTo('.contribution-title', glitchIn, glitchInTo);

        staggerReveal(mainTL, cards, hologramIn, hologramInTo);

        mainTL
            .to({}, { duration: 5 }, '+=5')
            .to('.contribution-title', { opacity: 0, y: -80, scale: 0.6, rotateX: -45, filter: 'blur(20px)', duration: 2.5, ease: 'power3.in' }, '<');

        staggerExplosion(mainTL, cards);
        mainTL
            .to('#contribution-section', { opacity: 0, duration: 0 })
            .addLabel('contributions-end')

        // ========================================
        // PROJECTS
        // ========================================
        mainTL
            .addLabel('projects-start')
            .to({}, {
                duration: 0,
                onReverseComplete: () => sidebarRef.current?.activeCurrentSection('cases'),
            }, '>')
            .to(particlesObj, { x: -5, y: 2, z: 7, duration: 10, ease: 'sine.inOut', onUpdate: updateParticles })
            .to({}, {
                duration: 0,
                onComplete: () => sidebarRef.current?.activeCurrentSection('projects'),
            }, '>')
            .fromTo('#project-section', fadeInUp, fadeInUpTo)
            .fromTo('.project-title',
                { opacity: 0, y: 80, scaleX: 0.5, filter: 'blur(15px)' },
                { opacity: 1, y: 0, scaleX: 1, filter: 'blur(0px)', duration: 2.5, ease: 'back.out(1.4)' },
                '<+0.5'
            );

        staggerReveal(mainTL, projects, hologramIn, hologramInTo, -1.5);

        mainTL
            .to({}, { duration: 5 }, '+=5')
            .to('.project-title', { opacity: 0, y: 80, scaleX: 0.5, duration: 2.5, filter: 'blur(15px)' }, '<');

        projects.forEach((project: any, i) => {
            mainTL.to(project, {
                opacity: 0,
                y: 100,
                rotateX: 45,
                duration: 2.5,
                scale: 0.85,
                filter: 'blur(10px) brightness(0.3)'
            }, i === 0 ? '<' : '<+0.15');
        });

        // ========================================
        // ABOUT ME
        // ========================================
        mainTL
            .addLabel('about-start')
            .to({}, {
                duration: 0,
                onReverseComplete: () => sidebarRef.current?.activeCurrentSection('projects'),
            }, '>')
            .to(particlesObj, { x: 5, y: 2, z: 7, duration: 10, ease: 'sine.inOut', onUpdate: updateParticles })
            .to({}, {
                duration: 0,
                onComplete: () => sidebarRef.current?.activeCurrentSection('about me'),
            }, '>')
            .fromTo('#about-section', fadeInUp, fadeInUpTo, '>')
            .fromTo('.about-title', glitchIn, glitchInTo, '<+0.5')
            .fromTo('.about-profile',
                { opacity: 0, y: 80, scale: 0.9, filter: 'blur(15px)' },
                { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 2.5, ease: 'power2.out' },
                '>'
            )
            .to({}, { duration: 2 })
            .fromTo('.about-skills',
                { opacity: 0, scale: 0.9, filter: 'blur(20px)' },
                { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.out' }
            );

        staggerReveal(mainTL, skillCards, hologramIn, hologramInTo);

        mainTL
            .to({}, { duration: 5 }, '+=5')
            .addLabel('skills-to-experience')
            .to({}, { duration: 5 });

        staggerExplosion(mainTL, skillCards);

        mainTL
            .to('.about-skills', { opacity: 0, duration: 0 })
            .addLabel('experience-start')
            .fromTo('.about-experience',
                { opacity: 0, scale: 0.9, filter: 'blur(20px)' },
                { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power3.out' }
            );

        staggerReveal(mainTL, experienceSections,
            { opacity: 0, y: 100, rotateX: 45, scale: 0.85, filter: 'blur(10px) brightness(0.3)' },
            { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px) brightness(1)', duration: 2.5, ease: 'expo.out' },
            -1.5
        );

        mainTL
            .to('.about-experience', { duration: 4 })
            .addLabel('about-exit')
            .to('.about-title', { opacity: 0, y: -80, scale: 0.6, rotateX: -45, filter: 'blur(20px)', duration: 2.5, ease: 'power3.in' }, '<')
            .to('.about-profile', { opacity: 0, y: -100, scale: 0.7, filter: 'blur(20px)', duration: 2.5, ease: 'power3.in' }, '<');

        staggerExplosion(mainTL, experienceSections);

        mainTL
            .to('#about-section', { opacity: 0, duration: 0 })
            .to({}, {
                duration: 0,
                onReverseComplete: () => sidebarRef.current?.activeCurrentSection('about me'),
            }, '>')
            .to(particlesObj, { x: 0, y: 0, z: 7, rotation: 0, duration: 6, ease: 'sine.inOut', onUpdate: updateParticles })
            .addLabel('about-end')
            .to('#about-section', { duration: 5 });

        // ========================================
        // CONTACT
        // ========================================
        mainTL
            .addLabel('contact-start')
            .to({}, {
                duration: 0,
                onComplete: () => sidebarRef.current?.activeCurrentSection('cases'),
            }, '>')
            .to(particlesObj, { x: 0, y: 0, z: 0, duration: 10, ease: 'sine.inOut', onUpdate: updateParticles }, 'contact-start')
            .to(particlesObj, {}, 'contact-end')
            .fromTo('#contact-section', fadeInUp, fadeInUpTo, 'contact-start')
            .fromTo('.contact-title',
                { opacity: 0, y: 60, scale: 0.8, filter: 'blur(15px)' },
                { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 2.5, ease: 'back.out(1.4)' },
                '<+0.5'
            );

        socialIcons.forEach((icon: any, i) => {
            mainTL.fromTo(icon,
                { opacity: 0, y: 80, scale: 0.6, rotateY: -45, filter: 'blur(10px)' },
                { opacity: 1, y: 0, scale: 1, rotateY: 0, filter: 'blur(0px)', duration: 2, ease: 'back.out(1.7)' },
                i === 0 ? '>-0.5' : '>-1.5'
            );
        });

        mainTL
            .fromTo('.contact-order',
                { opacity: 0, y: 40, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 2, ease: 'power2.out' },
                '>-0.5'
            )
            .fromTo('.contact-footer',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 2, ease: 'power2.out' },
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

    return { particlesRef, mainTlRef, sidebarRef, scrollToSection };
};
