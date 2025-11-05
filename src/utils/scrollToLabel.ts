import { gsap } from 'gsap';

/**
 *
 * @param {gsap.core.Timeline} timeline
 * @param {string} label
 * @param {number} [duration=1]
 * @param {boolean} [smooth=true]
 */
export function scrollToLabel(
    timeline: gsap.core.Timeline,
    label: string,
    duration: number = 1,
    smooth: boolean = true
) {
    if (!timeline || !label) {
        console.warn('scrollToLabel: timeline atau label tidak valid.');
        return;
    }

    // Ambil waktu label di timeline
    const labelTime = timeline.labels[label];
    if (labelTime === undefined) {
        console.warn(`scrollToLabel: label "${label}" tidak ditemukan di timeline.`);
        return;
    }

    // Jika smooth = false, langsung loncat ke label tanpa animasi
    if (!smooth) {
        timeline.seek(labelTime, false);
        return;
    }

    // Kalau smooth, tween posisi playhead ke waktu label
    gsap.to(timeline, {
        time: labelTime,
        duration,
        ease: 'power2.inOut',
    });
}
