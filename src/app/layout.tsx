import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./mobile-hero-v9.css";
import { MotionProvider } from "@/components/motion-provider";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Keshav Sharma | Full-Stack Developer · React, Python & AI/ML",
  description: "Projects and work by Keshav Sharma, a full-stack developer working with React.js, Python, modern web technologies and applied machine learning.",
  applicationName: "Keshav Sharma Portfolio",
  openGraph: {
    title: "Keshav Sharma | Full-Stack Developer · React, Python & AI/ML",
    description: "Selected live websites, full-stack projects and machine-learning experiments by Keshav Sharma.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
