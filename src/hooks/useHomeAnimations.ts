import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParticlesRef } from '@/components/Reactbits/Particles';
import { scrollToLabel } from '@/utils/scrollToLabel';

gsap.registerPlugin(ScrollTrigger);

export const useHomeAnimations = () => {
    const particlesRef = useRef<ParticlesRef>(null);
    const mainTlRef = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        const particlesObj = { x: 0, y: 0, z: 0 };
        const cards = gsap.utils.toArray('.contribution-card');
        const projects = gsap.utils.toArray('.project-card')

        const updateParticles = () => {
            particlesRef.current?.setPosition(particlesObj.x, particlesObj.y, particlesObj.z);
        };

        const autoScroll = (label: string, duration: number) => {
            if (!mainTlRef.current) return;
            document.body.style.overflow = 'hidden';
            scrollToLabel(mainTlRef.current, label, duration, false);
            setTimeout(() => { document.body.style.overflow = ''; }, duration * 1000);
        };

        const mainTL = gsap.timeline({
            scrollTrigger: {
                trigger: '#main-page',
                start: 'top top',
                end: '+=800%',
                scrub: 1,
                pin: true,
            },
            defaults: { ease: 'power3.inOut' }
        });

        // Intro: Text fade in/out + particles move
        mainTL
            .addLabel('beginning-animation-section-one')
            .to('.main-text', { opacity: 1, duration: 1 })
            .to('.main-text', { opacity: 0, y: 50, duration: 1 })
            .to(particlesObj, { x: 5, y: -3, duration: 5, ease: 'power2.inOut', onUpdate: updateParticles });

        // Section 1: Show cards
        mainTL
            .to('#contribution-section', {
                duration: 1,
                opacity: 1,
                y: 0,
            })
            .to('.contribution-title', { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' })
            .addLabel('contribution-cards-start')
            .to('#contribution-section', { opacity: 1, duration: 1, onComplete: () => autoScroll('contribution-cards-end', 1) })

        // Animate cards with stagger
        cards.forEach((card: any, i: number) => {
            mainTL.to(card, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
            }, i === 0 ? '>' : '>-0.8');
        });

        mainTL
            .to(cards, { duration: 1, onReverseComplete: () => autoScroll('contribution-cards-start', 1)})
            .addLabel('contribution-cards-end')
            .addLabel('end-animation-section-one');

        // Section 1 to 2 transition: Hide cards
        mainTL
            .addLabel('section-two-start')
            // .to('#contribution-section', { duration: 1, onComplete: () => autoScroll('section-two-end', 2) })

        cards.forEach((card: any, i: number) => {
            mainTL.to(card, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
            }, i === 0 ? '>' : '>-0.8');
        });

        mainTL
            .to('#contribution-section', { duration: 1, opacity: 0, y: 50 })
            .to(particlesObj, { y: 3, duration: 5, ease: 'power2.inOut', onUpdate: updateParticles })
            .to('#project-section, .project-title', {duration: 1, opacity: 1, y: 0})
        projects.forEach((card: any, i: number) => {
            mainTL.to(card, {
                opacity: 1,
                y: 0,
                duration: 0,
                ease: 'power3.out',
            }, i === 0 ? '>' : '>-0.8');
        })
            mainTL
                .to('see-project-btn', {duration: 0, opacity: 1, y: 0})
                // .to('#contribution-section', { duration: 1, onReverseComplete: () => autoScroll('section-two-start', 2) })
                .addLabel('section-two-end')

        mainTlRef.current = mainTL;

        return () => {
            mainTL.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return { particlesRef, mainTlRef };
};