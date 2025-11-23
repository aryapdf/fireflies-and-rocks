import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import {toVw} from "@/utils/toVw";
import TextUnderline from "@/components/Text/TextUnderline";

interface ContributionCardsProps {
  isDark?: boolean;
}

const ContributionCards: React.FC<ContributionCardsProps> = ({ isDark = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const contributionsData = require('@/lib/data/contribution.json')


  return (
      <div
          ref={sectionRef}
          id="contribution-section"
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
      >
        {/* Title Section */}
        <div
            className="contribution-title"
            style={{
              textAlign: 'left',
              marginBottom: toVw(40),
              width: "100%",
              opacity: 0,
              transform: "translateY(50px)"
            }}
        >
          <h2 style={{
            fontSize: toVw(48),
            fontWeight: '700',
            marginBottom: toVw(24),
            color: isDark ? '#ffffff' : '#000000',
          }}>
            notable <TextUnderline text="contributions" size={20} />
          </h2>
        </div>

        {/* Cards Container */}
        <div
            className="contribution-cards-container"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fit, minmax(${toVw(280)}, 1fr))`,
              gap: toVw(32),
              width: '100%',
            }}
        >
          {contributionsData.map((item:any, index:any) => (
              <div
                  key={item.id}
                  className="contribution-card"
                  data-index={index}
                  style={{
                    backgroundColor: isDark ? '#1a1a1a' : '#f8f8f8',
                    borderRadius: toVw(20),
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: `1px solid ${isDark ? '#333333' : '#e0e0e0'}`,
                    position: 'relative',
                    opacity: 0,
                    transform: 'translateY(50px)',
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      y: -10,
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
                {/* Image */}
                <div style={{
                  width: '100%',
                  height: toVw(220),
                  backgroundColor: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    fontSize: toVw(64),
                    opacity: 0.2,
                    fontWeight: 'bold',
                    color: '#ffffff',
                  }}>
                    {item.id}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: toVw(16),
                    right: toVw(16),
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: `${toVw(6)} ${toVw(12)}`,
                    borderRadius: toVw(20),
                    fontSize: toVw(12),
                    fontWeight: '600',
                    color: item.color,
                  }}>
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div style={{
                  padding: toVw(24),
                }}>
                  <h3 style={{
                    margin: `0 0 ${toVw(12)} 0`,
                    fontSize: toVw(22),
                    fontWeight: '700',
                    color: isDark ? '#ffffff' : '#000000',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    margin: `0 0 ${toVw(16)} 0`,
                    fontSize: toVw(14),
                    lineHeight: '1.6',
                    color: isDark ? '#aaaaaa' : '#666666',
                  }}>
                    {item.description}
                  </p>

                  {/* Tech Stack */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: toVw(8),
                  }}>
                    {item.tech.map((tech:any, i:any) => (
                        <span
                            key={i}
                            style={{
                              padding: `${toVw(4)} ${toVw(12)}`,
                              backgroundColor: isDark ? '#2a2a2a' : '#e8e8e8',
                              borderRadius: toVw(12),
                              fontSize: toVw(12),
                              color: isDark ? '#cccccc' : '#555555',
                              fontWeight: '500',
                            }}
                        >
                    {tech}
                  </span>
                    ))}
                  </div>
                </div>
              </div>
          ))}
        </div>

      </div>
  );
};

export default ContributionCards;