import React from 'react';
import Particles from '@/components/Reactbits/Particles';

interface ParticlesBackgroundProps {
    particlesRef: any;
    isDark: boolean;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ particlesRef, isDark }) => {
    const particleColor = isDark ? ['#E7E7E7', '#E7E7E7'] : ['#000000', '#000000'];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            maxHeight: '100vh',
            inset: -1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'black'
        }}>
            <div style={{
                position: 'absolute',
                width: '100vw',
                height: '100vh',
            }}>
                <Particles
                    ref={particlesRef}
                    particleColors={particleColor}
                    particleCount={2000}
                    particleSpread={15}
                    speed={.05}
                    particleBaseSize={100}
                    alphaParticles={false}
                    disableRotation={false}
                    cameraDistance={25}
                />
            </div>
        </div>
    );
};

export default ParticlesBackground;