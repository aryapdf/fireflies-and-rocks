import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import {toVw} from "@/utils/toVw";

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
              marginBottom: '60px',
              width: "100%",
              opacity: 0,
            }}
        >
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            margin: '0 0 16px 0',
            color: isDark ? '#ffffff' : '#000000',
          }}>
            Notable Contributions
          </h2>
          <p style={{
            fontSize: '18px',
            color: isDark ? '#aaaaaa' : '#666666',
            margin: 0,
          }}>
            Crafting digital experiences that drive results
          </p>
        </div>

        {/* Cards Container */}
        <div
            className="contribution-cards-container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
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
                    borderRadius: '20px',
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
                  height: '220px',
                  backgroundColor: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    fontSize: '64px',
                    opacity: 0.2,
                    fontWeight: 'bold',
                    color: '#ffffff',
                  }}>
                    {item.id}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: item.color,
                  }}>
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div style={{
                  padding: '24px',
                }}>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '22px',
                    fontWeight: '700',
                    color: isDark ? '#ffffff' : '#000000',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    margin: '0 0 16px 0',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: isDark ? '#aaaaaa' : '#666666',
                  }}>
                    {item.description}
                  </p>

                  {/* Tech Stack */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}>
                    {item.tech.map((tech:any, i:any) => (
                        <span
                            key={i}
                            style={{
                              padding: '4px 12px',
                              backgroundColor: isDark ? '#2a2a2a' : '#e8e8e8',
                              borderRadius: '12px',
                              fontSize: '12px',
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