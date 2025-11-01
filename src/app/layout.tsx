import type { Metadata } from "next";
import {DotGothic16, Geist, Geist_Mono, Manrope} from "next/font/google";
import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import ThemeSync from "@/components/Theme/ThemeSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"], // Optional: specify weights
});

const dotGothic16 = DotGothic16({
  variable: "--font-dot-gothic-16",
  subsets: ["latin"],
  weight: "400", // DotGothic16 only has 400 weight
});

export const metadata: Metadata = {
  title: "Fireflies and Rocks",
  description: "Portfolio",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${geistSans.variable} ${geistMono.variable} ${dotGothic16.variable}`}>
        <StoreProvider>
          <ThemeSync />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}