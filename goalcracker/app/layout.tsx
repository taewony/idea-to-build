import type { Metadata } from "next";
import { Inter, Gowun_Dodum } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const gowunDodum = Gowun_Dodum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-handwriting",
});

export const metadata: Metadata = {
  title: "GoalCracker - 목표를 깨부수는 즐거움",
  description: "AI 잔소리와 함께하는 목표 관리 앱",
};

import Header from '@/components/layout/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`${inter.variable} ${gowunDodum.variable} antialiased`}>
        <div className="flex flex-col min-h-screen bg-background-light/90 dark:bg-background-dark/90">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
