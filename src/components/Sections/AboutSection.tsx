import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { toVw } from "@/utils/toVw";
import TextUnderline from "@/components/Text/TextUnderline";
import {useTheme} from "@/hooks/useTheme";

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { isDark } = useTheme();

    const profileData = {
        name: "Marcos Oliveira",
        bio: "I'm more than one in love for Front-End. My experience with interface design turn me one extremely criterious with alignments, margins, colors and a lot other resources in CSS. Today I work with projects in a whole world. Codifiding in my home office, in a quiet interior of São Paulo, Brazil.",
        socials: [
            { name: "INSTAGRAM", link: "#" },
            { name: "GITHUB", link: "#" },
            { name: "EMAIL", link: "#" }
        ],
        skills: [
            {
                icon: "🎨",
                title: "Interface & Design",
                description: "Briefing, wireframe, UX, UI and branding"
            },
            {
                icon: "💻",
                title: "HTML & CSS",
                description: "Responsive websites with fast loading"
            },
            {
                icon: "⚛️",
                title: "React.js",
                description: "Build your system with node.js"
            },
            {
                icon: "📝",
                title: "WordPress",
                description: "Create your e-commerce or blog with PHP"
            }
        ],
        experiences: [
            {
                title: "I've had experiences with",
                items: [
                    "Firebase Database",
                    "MySQL Database",
                    "GIT: GitHub, Bitbucket",
                    "Coding PHP",
                    "Figma, Adobe XD, Sketch",
                    "CSS Preprocessors",
                    "Digital Marketing",
                    "Coding Python (Django)"
                ]
            },
            {
                title: "I have years of experience with",
                items: [
                    "Coding HTML5",
                    "Coding CSS3",
                    "Coding WordPress",
                    "Coding JavaScript",
                    "Using Elementor",
                    "Using Adobe Package",
                    "Creating Brand and Logo",
                    "Creating User Interface"
                ]
            },
            {
                title: "I work and study about",
                items: [
                    "Coding React.js",
                    "Coding CSS3",
                    "Coding JavaScript",
                    "Coding TypeScript",
                    "Studying Node.js basics",
                    "Studying API RESTful",
                    "Studying User Experience"
                ]
            }
        ]
    };

    return (
        <section
            ref={sectionRef}
            id="about-section"
            style={{
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                padding: `${toVw(150)}`,
                position: 'absolute',
                top: 0,
                opacity: 0,
                transform: 'translateY(50px)',
            }}
        >
            {/* Title */}
            <div
                className="about-title"
                style={{
                    textAlign: 'left',
                    marginBottom: toVw(60),
                    width: "100%",
                }}
            >
                <h2 style={{
                    fontSize: toVw(48),
                    fontWeight: '700',
                    margin: 0,
                    color: isDark ? '#ffffff' : '#000000',
                }}>
                    about <TextUnderline text="me" size={20} />
                </h2>
            </div>

            {/* Profile Card */}
            <div
                className="about-profile"
                style={{
                    display: 'flex',
                    gap: toVw(48),
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: toVw(80),
                }}
            >
                {/* Avatar */}
                <div style={{
                    width: toVw(200),
                    height: toVw(200),
                    borderRadius: '50%',
                    backgroundColor: isDark ? '#2a2a2a' : '#e8e8e8',
                    flexShrink: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        fontSize: toVw(80),
                    }}>
                        👤
                    </div>
                </div>

                {/* Profile Info */}
                <div style={{ flex: 1 }}>
                    <h3 style={{
                        fontSize: toVw(32),
                        fontWeight: '700',
                        margin: `0 0 ${toVw(16)} 0`,
                        color: isDark ? '#ffffff' : '#000000',
                    }}>
                        {profileData.name}
                    </h3>

                    <p style={{
                        fontSize: toVw(14),
                        lineHeight: 1.8,
                        color: isDark ? '#aaaaaa' : '#666666',
                        marginBottom: toVw(24),
                    }}>
                        {profileData.bio}
                    </p>

                    {/* Socials */}
                    <div style={{
                        display: 'flex',
                        gap: toVw(24),
                    }}>
                        {profileData.socials.map((social, i) => (
                            <a
                                key={i}
                                href={social.link}
                                style={{
                                    fontSize: toVw(12),
                                    fontWeight: '600',
                                    color: isDark ? '#ffffff' : '#000000',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget, {
                                        y: -2,
                                        duration: 0.2,
                                    });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, {
                                        y: 0,
                                        duration: 0.2,
                                    });
                                }}
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: "column",
                    position: 'relative',
                    width: '100%',
                }}
            >
                {/* Skills Grid */}
                <div
                    className="about-skills"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(4, 1fr)`,
                        gap: toVw(32),
                        width: '100%',
                        marginBottom: toVw(80),
                        position: 'absolute',
                        top: 0,
                    }}
                >
                    {profileData.skills.map((skill, index) => (
                        <div
                            key={index}
                            className="skill-card"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: toVw(12),
                                padding: toVw(24),
                                backgroundColor: isDark ? '#1a1a1a' : '#f8f8f8',
                                borderRadius: toVw(16),
                                border: `1px solid ${isDark ? '#333333' : '#e0e0e0'}`,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                gsap.to(e.currentTarget, {
                                    y: -8,
                                    scale: 1.02,
                                    duration: 0.3,
                                    ease: 'power2.out',
                                });
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.currentTarget, {
                                    y: 0,
                                    scale: 1,
                                    duration: 0.3,
                                    ease: 'power2.out',
                                });
                            }}
                        >
                            <div style={{
                                fontSize: toVw(40),
                                marginBottom: toVw(8),
                            }}>
                                {skill.icon}
                            </div>
                            <h4 style={{
                                fontSize: toVw(18),
                                fontWeight: '700',
                                margin: 0,
                                color: isDark ? '#ffffff' : '#000000',
                            }}>
                                {skill.title}
                            </h4>
                            <p style={{
                                fontSize: toVw(13),
                                lineHeight: 1.6,
                                margin: 0,
                                color: isDark ? '#888888' : '#666666',
                            }}>
                                {skill.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Experience Sections */}
                <div
                    className="about-experience"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(3, 1fr)`,
                        gap: toVw(48),
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                    }}
                >
                    {profileData.experiences.map((exp, expIndex) => (
                        <div
                            key={expIndex}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: toVw(16),
                            }}
                        >
                            <h4 style={{
                                fontSize: toVw(16),
                                fontWeight: '700',
                                margin: 0,
                                marginBottom: toVw(8),
                                color: isDark ? '#ffffff' : '#000000',
                            }}>
                                {exp.title}
                            </h4>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: toVw(8),
                            }}>
                                {exp.items.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        style={{
                                            fontSize: toVw(13),
                                            color: isDark ? '#aaaaaa' : '#666666',
                                            paddingLeft: toVw(16),
                                            position: 'relative',
                                        }}
                                    >
                  <span style={{
                      position: 'absolute',
                      left: 0,
                      color: isDark ? '#666666' : '#999999',
                  }}>•</span>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};