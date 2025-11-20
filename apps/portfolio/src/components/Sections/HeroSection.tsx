import React, {useState} from 'react';
import { toVw } from '@/utils/toVw';
import { fonts } from '@/utils/font';
import TextType from '@/components/Reactbits/TextType';

interface HeroSectionProps {
    jumboText: string[];
    isFrozen: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ jumboText, isFrozen }) => {
    const [textIndex, setTextIndex] = useState<number>(0);

    return (
        <section
            className="main-text"
            style={{
                padding: `0 ${toVw(150)}`,
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
        <div
            className="relative flex items-center justify-center"
            style={{
                width: 'fit-content',
                height: 'fit-content',
                padding: `${toVw(16)} ${toVw(40)}`,
                borderRadius: 12,
                border: '3px solid var(--foreground)',
                background: 'rgba(0, 0, 0, 0.7)',
                isolation: 'isolate',
                transform: 'translateZ(0)',
            }}
        >
            <TextType
              text={jumboText}
              typingSpeed={60}
              deletingSpeed={40}
              pauseDuration={2200}
              cursorBlinkDuration={0.4}
              showCursor={true}
              cursorCharacter="_"
              freezeAnimation={isFrozen}
              setCurrentIndex={setTextIndex}
              style={{
                fontFamily: fonts.dotGothic16,
                fontSize: toVw(40),
              }}
            />
          </div>
        </section>
    );
};

export default HeroSection;
