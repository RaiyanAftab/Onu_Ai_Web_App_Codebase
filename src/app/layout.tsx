import type { Metadata } from "next";
import { Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Onu AI | Intelligence Engine",
  description: "AI powered ad copy testing & Data-Driven Campaign Validation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${playfair.variable} h-full antialiased selection:bg-black selection:text-white`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#EBEBEB] text-[#0A0A0A]">{children}</body>
    </html>
  );
}
