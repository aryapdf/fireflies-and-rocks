// src/utils/fonts.ts
import { Geist, Geist_Mono, Manrope, DotGothic16 } from "next/font/google";

export const geistSans = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
});

export const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

export const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const dotGothic16 = DotGothic16({
    subsets: ["latin"],
    variable: "--font-dot-gothic-16",
    weight: "400",
});

// Export sebagai object untuk import fleksibel
export const fonts = {
    geistSans: geistSans.style.fontFamily,
    geistMono: geistMono.style.fontFamily,
    manrope: manrope.style.fontFamily,
    dotGothic16: dotGothic16.style.fontFamily,
};
