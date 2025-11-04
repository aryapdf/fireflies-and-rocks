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
            fontWeight: 700,
            gap: toVw(4),
            fontSize: toVw(18),
        },
        service: {
            textDecoration: 'underline',
            textUnderlineOffset: toVw(10),
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
                <div><span style={styles.service}>se</span>lf service</div>
                {/*<span style={styles.discount}>20% OFF</span>*/}
            </div>
        </header>
    );
}