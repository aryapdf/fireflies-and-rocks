import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { toVw } from "@/utils/toVw";
import TextUnderline from "@/components/Text/TextUnderline";
import {useTheme} from "@/hooks/useTheme";

export default function ProjectSection () {
    const { isDark } = useTheme();

    const projectSectionRef = useRef<HTMLDivElement>(null);
    const projectsData = require('@/lib/data/contribution.json');

    return (
        <section
            ref={projectSectionRef}
            id="project-section"
            style={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                opacity: 0,
                padding: `0 ${toVw(150)}`,
                transform: 'translateY(50px)'
            }}
        >
            {/* Title Section - Right Aligned */}
            <div
                className="project-title"
                style={{
                    textAlign: 'right',
                    marginBottom: toVw(60),
                    width: "100%",
                    transform: 'translateY(50px)',
                    opacity: 0,
                }}
            >
                <h2 style={{
                    fontSize: toVw(56),
                    fontWeight: '700',
                    margin: 0,
                    color: isDark ? '#ffffff' : '#000000',
                    lineHeight: 1.2,
                }}>
                    personal <TextUnderline text="projects" size={20} />
                </h2>
            </div>

            {/* Cards Grid - 2 Columns */}
            <div
                className="project-cards-container"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(2, 1fr)`,
                    gap: `${toVw(48)} ${toVw(80)}`,
                    width: '100%',
                }}
            >
                {projectsData.map((item: any, index: any) => (
                    <div
                        key={item.id}
                        className="project-card"
                        data-index={index}
                        style={{
                            display: 'flex',
                            gap: toVw(32),
                            alignItems: 'flex-start',
                            opacity: 0,
                            transform: 'translateY(50px)',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            const card = e.currentTarget.querySelector('.card-image') as HTMLElement;
                            const button = e.currentTarget.querySelector('.see-project-btn') as HTMLElement;
                            if (card) {
                                gsap.to(card, {
                                    y: -8,
                                    scale: 1.02,
                                    duration: 0.3,
                                    ease: 'power2.out',
                                });
                            }
                            if (button) {
                                gsap.to(button, {
                                    x: 5,
                                    duration: 0.3,
                                    ease: 'power2.out',
                                });
                            }
                        }}
                        onMouseLeave={(e) => {
                            const card = e.currentTarget.querySelector('.card-image') as HTMLElement;
                            const button = e.currentTarget.querySelector('.see-project-btn') as HTMLElement;
                            if (card) {
                                gsap.to(card, {
                                    y: 0,
                                    scale: 1,
                                    duration: 0.3,
                                    ease: 'power2.out',
                                });
                            }
                            if (button) {
                                gsap.to(button, {
                                    x: 0,
                                    duration: 0.3,
                                    ease: 'power2.out',
                                });
                            }
                        }}
                    >
                        {/* Left Side - Image Card */}
                        <div
                            className="card-image"
                            style={{
                                flex: '0 0 auto',
                                width: toVw(300),
                                backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                                borderRadius: toVw(16),
                                overflow: 'hidden',
                                boxShadow: isDark
                                    ? '0 4px 20px rgba(0,0,0,0.3)'
                                    : '0 4px 20px rgba(0,0,0,0.08)',
                            }}
                        >
                            {/* Image Container */}
                            <div style={{
                                width: '100%',
                                height: toVw(200),
                                backgroundColor: item.color || '#2d7a6e',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    fontSize: toVw(80),
                                    opacity: 0.15,
                                    fontWeight: 'bold',
                                    color: '#ffffff',
                                }}>
                                    {item.id}
                                </div>
                            </div>

                            {/* Tech Tags */}
                            <div style={{
                                padding: toVw(16),
                                display: 'flex',
                                gap: toVw(12),
                                flexWrap: 'wrap',
                                backgroundColor: isDark ? '#0f0f0f' : '#ffffff',
                            }}>
                                {item.tech.slice(0, 3).map((tech: any, i: any) => (
                                    <span
                                        key={i}
                                        style={{
                                            padding: `${toVw(6)} ${toVw(14)}`,
                                            backgroundColor: isDark ? '#2a2a2a' : '#f0f0f0',
                                            borderRadius: toVw(6),
                                            fontSize: toVw(11),
                                            color: isDark ? '#cccccc' : '#333333',
                                            fontWeight: '600',
                                            textTransform: 'lowercase',
                                        }}
                                    >
                    {tech}
                  </span>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: toVw(16),
                        }}>
                            {/* Title & Subtitle */}
                            <div>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: toVw(28),
                                    fontWeight: '700',
                                    color: isDark ? '#ffffff' : '#000000',
                                    marginBottom: toVw(4),
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    margin: 0,
                                    fontSize: toVw(13),
                                    color: isDark ? '#888888' : '#666666',
                                    fontWeight: '400',
                                }}>
                                    {item.category}
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <p style={{
                                    margin: `0 0 ${toVw(8)} 0`,
                                    fontSize: toVw(14),
                                    lineHeight: 1.7,
                                    color: isDark ? '#aaaaaa' : '#666666',
                                }}>
                                    {item.description}
                                </p>
                                <p style={{
                                    margin: 0,
                                    fontSize: toVw(14),
                                    lineHeight: 1.7,
                                    color: isDark ? '#aaaaaa' : '#666666',
                                }}>
                                    {item.description}
                                </p>
                            </div>

                            {/* See Project Button */}
                            <div
                                className="see-project-btn"
                                style={{
                                    display: '',
                                    alignItems: 'center',
                                    marginTop: toVw(8),
                                    fontSize: toVw(14),
                                    fontWeight: '600',
                                    color: isDark ? '#ffffff' : '#000000',
                                }}
                            >
                                <TextUnderline text={'see'} size={12} />{' '}&nbsp;project
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};