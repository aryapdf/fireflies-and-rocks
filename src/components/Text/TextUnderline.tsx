'use client';

import { toVw } from '@/utils/toVw';
import {useTheme} from "@/hooks/useTheme";

interface Props {
    text?: string;
    size?: number;
}

export default function TextUnderline({ text, size = 10 }: Props) {
    // const { isDark } = useTheme()

    const styles = {
        text: {
            textDecoration: 'underline',
            textUnderlineOffset: toVw(size),
        },
    };

    return (
        <span style={styles.text}>{text}</span>
    );
}