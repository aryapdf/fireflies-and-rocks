// src/components/Layout/Header.tsx
'use client';

import { toVw } from '@/utils/toVw';

interface HeaderProps {
    isDark?: boolean;
}

export default function Header({ isDark }: HeaderProps) {
    const styles = {
        header: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: `${toVw(40)} ${toVw(60)}`,
            zIndex: 100,
        },
        logo: {
            fontSize: toVw(38),
            fontWeight: 'bold' as const,
            letterSpacing: '-0.05em',
        },
        headerRight: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'flex-end',
            gap: toVw(4),
        },
        service: {
            fontSize: toVw(18),
            textDecoration: 'underline',
            textUnderlineOffset: toVw(4),
        },
        discount: {
            fontSize: toVw(14),
            opacity: 0.7,
        },
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>badcable.</div>
            <div style={styles.headerRight}>
                <span style={styles.service}>self service</span>
                {/*<span style={styles.discount}>20% OFF</span>*/}
            </div>
        </header>
    );
}