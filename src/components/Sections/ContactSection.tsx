import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { toVw } from "@/utils/toVw";
import TextUnderline from "@/components/Text/TextUnderline";
import { useTheme } from "@/hooks/useTheme";

export default function ContactSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { isDark } = useTheme();

    const contactData = {
        socials: [
            {
                name: "Figma",
                icon: "🎨",
                link: "#",
                color: "#F24E1E"
            },
            {
                name: "LinkedIn",
                icon: "💼",
                link: "#",
                color: "#0A66C2"
            },
            {
                name: "Instagram",
                icon: "📷",
                link: "#",
                color: "#E4405F"
            },
            {
                name: "GitHub",
                icon: "🐙",
                link: "#",
                color: "#181717"
            },
            {
                name: "Dribbble",
                icon: "🏀",
                link: "#",
                color: "#EA4C89"
            },
            {
                name: "YouTube",
                icon: "▶️",
                link: "#",
                color: "#FF0000"
            }
        ]
    };

    return (
        <section
            ref={sectionRef}
            id="contact-section"
            style={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: `${toVw(150)}`,
                position: 'absolute',
                top: 0,
                opacity: 0,
                transform: 'translateY(50px)',
            }}
        >
            {/* Main Content */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}>
                {/* Title */}
                <div
                    className="contact-title"
                    style={{
                        textAlign: 'center',
                        marginBottom: toVw(80),
                    }}
                >
                    <h2 style={{
                        fontSize: toVw(48),
                        fontWeight: '700',
                        margin: 0,
                        color: isDark ? '#ffffff' : '#000000',
                    }}>
                        contact <TextUnderline text="me" size={20} />
                    </h2>
                </div>

                {/* Social Icons Grid */}
                <div
                    className="contact-socials"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(6, 1fr)`,
                        gap: toVw(48),
                        width: '100%',
                        maxWidth: toVw(900),
                    }}
                >
                    {contactData.socials.map((social, index) => (
                        <a
                            key={index}
                            href={social.link}
                            className="social-icon"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                const icon = e.currentTarget.querySelector('.icon-circle');
                                gsap.to(icon, {
                                    y: -12,
                                    scale: 1.1,
                                    duration: 0.3,
                                    ease: 'back.out(2)',
                                });
                            }}
                            onMouseLeave={(e) => {
                                const icon = e.currentTarget.querySelector('.icon-circle');
                                gsap.to(icon, {
                                    y: 0,
                                    scale: 1,
                                    duration: 0.3,
                                    ease: 'power2.out',
                                });
                            }}
                        >
                            {/* Icon Circle */}
                            <div
                                className="icon-circle"
                                style={{
                                    width: toVw(80),
                                    height: toVw(80),
                                    borderRadius: '50%',
                                    backgroundColor: isDark ? '#1a1a1a' : '#f8f8f8',
                                    border: `2px solid ${isDark ? '#333333' : '#e0e0e0'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: toVw(32),
                                    marginBottom: toVw(12),
                                }}
                            >
                                {social.icon}
                            </div>

                            {/* Label */}
                            <span style={{
                                fontSize: toVw(12),
                                fontWeight: '500',
                                color: isDark ? '#888888' : '#666666',
                                textTransform: 'capitalize',
                            }}>
                                {social.name}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Order of Service */}
                <div
                    className="contact-order"
                    style={{
                        textAlign: 'center',
                        marginTop: toVw(120),
                    }}
                >
                    <h3 style={{
                        fontSize: toVw(24),
                        fontWeight: '700',
                        margin: 0,
                        color: isDark ? '#ffffff' : '#000000',
                        position: 'relative',
                        display: 'inline-block',
                    }}>
                        order of service
                        <div style={{
                            position: 'absolute',
                            bottom: toVw(-8),
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: toVw(60),
                            height: toVw(3),
                            backgroundColor: isDark ? '#ffffff' : '#000000',
                        }} />
                    </h3>
                </div>
            </div>

            {/* Footer */}
            <div
                className="contact-footer"
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: toVw(60),
                }}
            >
                {/* Logo */}
                <div style={{
                    fontSize: toVw(32),
                    fontWeight: '700',
                    color: isDark ? '#ffffff' : '#000000',
                }}>
                    badcable.
                </div>

                {/* Credit */}
                <div style={{
                    fontSize: toVw(12),
                    color: isDark ? '#888888' : '#666666',
                }}>
                    design & coding by <span style={{ fontWeight: '600', color: isDark ? '#ffffff' : '#000000' }}>me</span>
                </div>
            </div>
        </section>
    );
}