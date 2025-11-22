import {gsap} from "gsap";

export function scrollToLabel(
    timeline: gsap.core.Timeline,
    label: string,
    duration: number = 1.5,
    smooth: boolean = true
) {
    if (!timeline || !label) {
        console.warn('scrollToLabel: timeline atau label tidak valid.');
        return;
    }

    const labelTime = timeline.labels[label];
    if (labelTime === undefined) {
        console.warn(`scrollToLabel: label "${label}" tidak ditemukan di timeline.`);
        return;
    }

    const st = timeline.scrollTrigger;

    if (st) {
        const progress = labelTime / timeline.duration();
        const scrollPosition = st.start + (progress * (st.end - st.start));

        if (smooth) {
            gsap.to(window, {
                scrollTo: scrollPosition,
                duration,
                ease: 'power2.inOut',
            });
        } else {
            gsap.to(window, {
                scrollTo: scrollPosition,
                duration,
                ease: 'none',
            });
        }
    } else {
        if (smooth) {
            gsap.to(timeline, {
                time: labelTime,
                duration,
                ease: 'power3.inOut',
            });
        } else {
            timeline.seek(labelTime, false);
        }
    }
}
