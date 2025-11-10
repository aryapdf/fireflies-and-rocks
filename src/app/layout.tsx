'use client'

import "./globals.css";
import StoreProvider from "@/providers/StoreProvider";
import ThemeSync from "@/components/Theme/ThemeSync";
import {fonts} from "@/utils/font";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily:fonts.manrope }}>
        <StoreProvider>
          <ThemeSync />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}